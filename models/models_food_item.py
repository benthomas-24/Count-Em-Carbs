from flask_sqlalchemy import SQLAlchemy
from api.nutritionix import get_carbs_for_food

db = SQLAlchemy()


class FoodItem(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)
    carbs = db.Column(db.Float, nullable=False)

    def __repr__(self):
        return f'<FoodItem {self.name}>'

    @classmethod
    def get_carbs(cls, food_name):
        #Here, we're first trying to get the carbs from the Nutritionix API
        api_carbs = get_carbs_for_food(food_name)
        if api_carbs is not None:
            return api_carbs

        # If not found in API, check local database
        food_item = cls.query.filter(cls.name.ilike(f'%{food_name}%')).first()
        return food_item.carbs if food_item else None

    @classmethod
    def get_all_local(cls):
        return cls.query.all()
