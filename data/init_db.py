from flask import Flask
from models.models_food_item import db, FoodItem
from config import Config
from data.local_food_list import local_food_list


def init_db():
    app = Flask(__name__)
    app.config.from_object(Config)
    db.init_app(app)

    with app.app_context():
        # Create the database tables
        db.create_all()

        # Check if the table is empty
        if FoodItem.query.count() == 0:
            # Add data from local_food_list
            for food_name, carbs in local_food_list.items():
                new_food = FoodItem(name=food_name, carbs=float(carbs))
                db.session.add(new_food)

            db.session.commit()
            print(f"Added {len(local_food_list)} items from local_food_list to the database.")
        else:
            print("Database already contains data. Skipping initialization.")

        print("Database initialized successfully.")


if __name__ == '__main__':
    init_db()
