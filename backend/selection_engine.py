def generate_merit_list(applications):
    valid_apps = []
    for app in applications:
        # We only rank APPROVED applications
        if app.status.lower() == 'approved' and app.extracted_data:
            # Extract metrics or use mock defaults if parsing didn't catch them
            income_str = app.extracted_data.get('annual_income') or app.extracted_data.get('income', '999999')
            try:
                # Basic cleanup of income string
                income = float(str(income_str).replace('Rs.', '').replace(',', '').strip())
            except:
                income = 999999
                
            # Assume we have an academic score. If not, randomize based on ID for demo purposes
            score = float(app.extracted_data.get('academic_score', 65.0 + (app.id % 30)))
            
            # MoTA specifics: PVTG (Particularly Vulnerable Tribal Groups) and Divyangjan (Disabled) get extra weight
            is_pvtg = app.extracted_data.get('is_pvtg', False)
            is_pwd = app.extracted_data.get('is_pwd', False)
            
            # Formula: 60% Academics, 30% Financial Need, 5% PVTG, 5% PWD
            financial_score = (((1000000 - min(income, 1000000)) / 1000000) * 30)
            bonus = 0
            if is_pvtg: bonus += 5
            if is_pwd: bonus += 5
            
            merit_score = (score * 0.6) + financial_score + bonus
            
            valid_apps.append({
                "application_id": app.id,
                "user_id": app.user_id,
                "scheme_id": app.scheme_id,
                "income": income,
                "academic_score": round(score, 2),
                "merit_score": round(merit_score, 2)
            })
    
    # Sort descending by merit_score
    valid_apps.sort(key=lambda x: x['merit_score'], reverse=True)
    
    # Add rank
    for i, app in enumerate(valid_apps):
        app['rank'] = i + 1
        
    return valid_apps
