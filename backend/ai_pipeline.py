import pytesseract
from PIL import Image
import io
import re
import os

# Ensure Tesseract path for Windows
tesseract_path = r"C:\Program Files\Tesseract-OCR\tesseract.exe"
if os.path.exists(tesseract_path):
    pytesseract.pytesseract.tesseract_cmd = tesseract_path

# Attempt to load spaCy model, but gracefully handle AppLocker / policy errors
nlp = None
try:
    import spacy
    try:
        nlp = spacy.load("en_core_web_sm")
    except OSError:
        import spacy.cli
        spacy.cli.download("en_core_web_sm")
        nlp = spacy.load("en_core_web_sm")
except (ImportError, Exception) as e:
    print(f"Warning: Could not load spaCy. Falling back to regex. Error: {e}")

from pytesseract import Output

def extract_text_from_image(image_bytes: bytes) -> tuple[str, float]:
    try:
        image = Image.open(io.BytesIO(image_bytes))
        data = pytesseract.image_to_data(image, output_type=Output.DICT)
        
        text_parts = []
        confidences = []
        for i in range(len(data['text'])):
            word = data['text'][i].strip()
            conf = int(data['conf'][i])
            if word and conf >= 0:
                text_parts.append(word)
                confidences.append(conf)
                
        text = " ".join(text_parts)
        if not text.strip():
            return "", 0.0
            
        avg_confidence = sum(confidences) / len(confidences) if confidences else 0.0
        return text, avg_confidence
    except Exception as e:
        print(f"OCR Error: {e}")
        return "", 0.0

def extract_entities(text: str, confidence: float = 100.0) -> dict:
    extracted = {
        "applicant_name": None,
        "annual_income": None,
        "score": None,
        "raw_text": text,
        "ocr_confidence": confidence,
        "documents_found": []
    }
    
    # NLP processing if available
    if nlp:
        doc = nlp(text)
        for ent in doc.ents:
            if ent.label_ == "PERSON" and not extracted["applicant_name"]:
                extracted["applicant_name"] = ent.text
                
    # Basic RegEx extractions
    income_match = re.search(r'(?:Income|salary)[\s:]*[\$]?([\d,]+)', text, re.IGNORECASE)
    if income_match:
        extracted["annual_income"] = income_match.group(1).replace(',', '')
        
    name_match = re.search(r'(?:Name)[\s:]+([A-Za-z\s]+)', text, re.IGNORECASE)
    if name_match and not extracted["applicant_name"]:
        extracted["applicant_name"] = name_match.group(1).strip()
        
    score_match = re.search(r'(?:Score|Marks|Percentage)[\s:]*([\d\.]+)%?', text, re.IGNORECASE)
    if score_match:
        extracted["score"] = float(score_match.group(1))

    # Identify Document Types based on Keywords
    text_upper = text.upper()
    docs = []
    
    if "PASSPORT" in text_upper or "REPUBLIC OF INDIA" in text_upper:
        docs.append("Passport")
        
    if "GRE" in text_upper or "GRADUATE RECORD EXAMINATIONS" in text_upper or "TOEFL" in text_upper:
        docs.append("GRE/TOEFL Scorecard")
        
    if "NET" in text_upper or "GATE" in text_upper or "NATIONAL ELIGIBILITY TEST" in text_upper:
        docs.append("NET/GATE Scorecard")
        
    if "ADMISSION" in text_upper or "ACCEPTANCE" in text_upper or "ENROLLED" in text_upper:
        if "USA" in text_upper or "UK" in text_upper or "FOREIGN" in text_upper or "ABROAD" in text_upper:
            docs.append("Foreign Admission Letter")
        else:
            docs.append("Domestic Acceptance Letter")
            
    extracted["documents_found"] = docs
    
    return extracted
