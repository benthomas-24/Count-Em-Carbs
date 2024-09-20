from flask import Blueprint, jsonify, request, render_template
from models.models_food_item import FoodItem
from utils.insulin_calculator import calculate_total_insulin
import os
from dotenv import load_dotenv

load_dotenv()  # Load environment variables from .env file

main = Blueprint('main', __name__)

NUTRITIONIX_APP_ID = os.getenv('NUTRITIONIX_APP_ID')
NUTRITIONIX_API_KEY = os.getenv('NUTRITIONIX_API_KEY')


@main.route('/')
def index():
    return render_template('index.html')

@main.route('/food-database')
def fooddatabase():
    return render_template('food-database.html')


@main.route('/api/food', methods=['GET'])
def get_food_data():
    food_name = request.args.get('name')
    if not food_name:
        return jsonify({"error": "No food name provided"}), 400

    carbs = FoodItem.get_carbs(food_name)

    if carbs is not None:
        return jsonify({"name": food_name, "carbs": carbs})
    else:
        return jsonify({"error": "Food not found"}), 404


@main.route('/api/search_food', methods=['POST'])
def search_food():
    food_name = request.json.get('food_name')
    if not food_name:
        return jsonify({"error": "No food name provided"}), 400

    carbs = FoodItem.get_carbs(food_name)

    if carbs is not None:
        return jsonify({'name': food_name, 'carbs': carbs})
    else:
        return jsonify({'error': 'Food not found'}), 404


@main.route('/calculate', methods=['POST'])
def calculate():
    try:
        food_input = request.form['food']
        current_blood_sugar = float(request.form['current_blood_sugar'])
        target_blood_sugar = float(request.form['target_blood_sugar'])
        correction_factor = float(request.form['correction_factor'])
        insulin_to_carb_ratio = float(request.form['insulin_to_carb_ratio'])
    except KeyError:
        return jsonify({'error': 'Missing required form data'}), 400
    except ValueError:
        return jsonify({'error': 'Invalid numeric input'}), 400

    carbs = FoodItem.get_carbs(food_input)
    if carbs is None:
        return jsonify({'error': 'Unable to find carbohydrate information for that item.'}), 404

    base_insulin_dosage, correction_dose, total_insulin_dosage = calculate_total_insulin(
        carbs, insulin_to_carb_ratio, current_blood_sugar, target_blood_sugar, correction_factor
    )

    return jsonify({
        'carbs': carbs,
        'base_insulin_dosage': base_insulin_dosage,
        'correction_dose': correction_dose,
        'total_insulin_dosage': total_insulin_dosage
    })


@main.route('/foods')
def get_all_foods():
    foods = FoodItem.get_all_local()
    return jsonify([{'name': food.name, 'carbs': food.carbs} for food in foods])
