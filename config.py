import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

class Config:
    # Flask configurations
    SECRET_KEY = os.getenv('SECRET_KEY', 'your-secret-key')
    DEBUG = os.getenv('FLASK_DEBUG', 'False') == 'True'

    # SQLAlchemy configurations
    SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(os.path.abspath(os.path.dirname(__file__)), 'data', 'food_database.sqlite')
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # Nutritionix API configurations
    NUTRITIONIX_APP_ID = os.getenv('NUTRITIONIX_APP_ID')
    NUTRITIONIX_API_KEY = os.getenv('NUTRITIONIX_API_KEY')

    # Add any other configuration variables your app needs
    # For example:
    # MAIL_SERVER = os.getenv('MAIL_SERVER')
    # MAIL_PORT = int(os.getenv('MAIL_PORT', 587))

    @staticmethod
    def init_app(app):
        # You can perform any additional initialization here
        pass