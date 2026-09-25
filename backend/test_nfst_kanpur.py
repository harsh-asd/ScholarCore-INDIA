import ai_pipeline
from rule_engine import RuleEngine

print("==============================================")
print("  Simulated NFST Document Submission Test  ")
print("==============================================\n")

# Mock OCR text extraction for a domestic application in Kanpur
mock_ocr_text = """
Indian Institute of Historical Research, Kanpur.
Letter of Acceptance for PhD program in Cultural Anthropology.
The student, Rahul Sharma, is officially enrolled for the Academic Year 2026.
"""

print(f"[*] Simulating OCR Extraction on Document Text:\n{mock_ocr_text}")
extracted_data = ai_pipeline.extract_entities(mock_ocr_text, confidence=98.5)

print("[*] AI Pipeline Output:")
print(f"Documents Identified: {extracted_data['documents_found']}")

print("\n[*] Initializing NFST Scheme Rules...")
nfst_rules = {
    "required_documents": ["Domestic Acceptance Letter", "NET/GATE Scorecard"]
}
engine = RuleEngine(nfst_rules)

print("[*] Evaluating Application against NFST Rules...")
result = engine.evaluate(extracted_data)

print("\n--- FINAL DECISION ---")
print(f"Status: {result['status']}")
print(f"Discrepancies: {result['discrepancies']}")

print("\n==============================================")
if "Missing Required Document: NET/GATE Scorecard" in result['discrepancies']:
    print("SUCCESS: Rule engine correctly flagged missing NET score for domestic track!")
else:
    print("FAILED: Rule engine missed the discrepancy.")
print("==============================================")
