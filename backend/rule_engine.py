class RuleEngine:
    def __init__(self, scheme_criteria: dict):
        self.criteria = scheme_criteria or {}

    def evaluate(self, extracted_data: dict) -> dict:
        discrepancies = []
        status = "APPROVED"
        
        # Evaluate income
        max_income = self.criteria.get("max_income")
        if max_income is not None:
            income_val = extracted_data.get("extracted_income") or extracted_data.get("annual_income")
            if income_val is not None:
                try:
                    income = float(income_val)
                    if income > max_income:
                        discrepancies.append(f"Income {income} exceeds max allowed {max_income}.")
                        status = "REJECTED"
                except:
                    pass

        # Evaluate Scheme-Specific Required Documents (NFST vs NOS)
        required_docs = self.criteria.get("required_documents", [])
        if required_docs:
            found_docs = extracted_data.get("documents_found", [])
            for doc in required_docs:
                if doc not in found_docs:
                    discrepancies.append(f"Missing Required Document: {doc}")
                    if status != "REJECTED":
                        status = "MANUAL_REVIEW"
                        
        # Check OCR Confidence
        ocr_confidence = extracted_data.get("ocr_confidence")
        if ocr_confidence is not None and ocr_confidence < 75.0:
            discrepancies.append(f"Low AI confidence ({ocr_confidence}%) - Human verification required")
            status = "MANUAL_REVIEW"
            
        return {
            "status": status,
            "discrepancies": discrepancies
        }
