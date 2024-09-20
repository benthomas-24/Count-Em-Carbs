import requests
import os
from dotenv import load_dotenv

load_dotenv()  # Load environment variables from .env file


def get_nutritionix_data(query):
    endpoint = "https://trackapi.nutritionix.com/v2/natural/nutrients"
    app_id = os.getenv('NUTRITIONIX_APP_ID')
    api_key = os.getenv('NUTRITIONIX_API_KEY')

    if not app_id or not api_key:
        raise ValueError("NUTRITIONIX_APP_ID or NUTRITIONIX_API_KEY environment variables are not set")

    headers = {
        "x-app-id": app_id,
        "x-app-key": api_key,
        "Content-Type": "application/json"
    }
    data = {
        "query": query
    }
    try:
        response = requests.post(endpoint, json=data, headers=headers)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error fetching data from Nutritionix: {e}")
        return None


def get_carbs_for_food(food_name):
    nutritionix_data = get_nutritionix_data(food_name)
    if nutritionix_data and 'foods' in nutritionix_data:
        for food in nutritionix_data['foods']:
            carbs = food.get('nf_total_carbohydrate', None)
            if carbs is not None:
                return round(carbs, 1)
    return None
