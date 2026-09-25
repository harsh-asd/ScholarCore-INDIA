from sqlalchemy.orm import Session
from sqlalchemy import func
import models

def get_analytics_summary(db: Session) -> dict:
    """
    Aggregates application statistics using efficient SQL queries.
    """
    # 1. Total applications
    total_applications = db.query(func.count(models.Application.id)).scalar() or 0
    
    # 2. Breakdown by status
    status_counts = db.query(
        models.Application.status, 
        func.count(models.Application.id)
    ).group_by(models.Application.status).all()
    
    by_status = {status: count for status, count in status_counts}
    
    # 3. Breakdown by scheme
    scheme_counts = db.query(
        models.Scheme.name, 
        func.count(models.Application.id)
    ).join(
        models.Application, models.Scheme.id == models.Application.scheme_id
    ).group_by(models.Scheme.name).all()
        
    by_scheme = [{"scheme_name": name, "count": count} for name, count in scheme_counts]
    
    return {
        "total_applications": total_applications,
        "by_status": by_status,
        "by_scheme": by_scheme
    }
