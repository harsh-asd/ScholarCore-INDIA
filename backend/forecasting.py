import pandas as pd
import numpy as np
from statsmodels.tsa.arima.model import ARIMA
import warnings
warnings.filterwarnings("ignore")

def generate_forecast():
    # Generate Mock 36 months of historical application volume data for MoTA
    np.random.seed(42)
    base = 1200
    trend = np.linspace(0, 800, 36)
    seasonality = np.sin(np.linspace(0, 6 * np.pi, 36)) * 300
    noise = np.random.normal(0, 80, 36)
    
    historical_data = base + trend + seasonality + noise
    historical_data = [int(max(0, x)) for x in historical_data]
    
    # Fit ARIMA model (Auto-Regressive Integrated Moving Average)
    model = ARIMA(historical_data, order=(2, 1, 1))
    model_fit = model.fit()
    
    # Forecast next 6 months
    forecast = model_fit.forecast(steps=6)
    forecast_data = [int(max(0, x)) for x in forecast]
    
    result = []
    
    # Append last 12 months of historical data for the chart (to not clutter the UI)
    for i in range(24, 36):
        result.append({
            "month": f"Month {-36+i}", 
            "historical": historical_data[i], 
            "forecast": None
        })
    
    # The point connecting historical to forecast
    result[-1]["forecast"] = result[-1]["historical"]
    
    # Append forecast data
    for i, val in enumerate(forecast_data):
        result.append({
            "month": f"Projected M{+1+i}", 
            "historical": None, 
            "forecast": val
        })
        
    return {
        "time_series": result,
        "total_forecast_volume": sum(forecast_data),
        "estimated_budget_required": sum(forecast_data) * 50000  # Assume avg 50k per scholarship
    }
