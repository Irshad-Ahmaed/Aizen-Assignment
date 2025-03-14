from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate
from .config import Config
from .extensions import db, jwt
from .routes import auth_bp, image_bp
from flask_cors import CORS


def create_app():
    app = Flask(__name__)
    CORS(app, resources={r"/api/v2/*": {"origins": ["http://localhost:5173", "https://aizen-assignment.vercel.app"]}})  # Allow only specific origin
    app.config.from_object(Config)

    # Initialize extensions
    db.init_app(app)
    jwt.init_app(app)
    Migrate(app, db)

    # Register Blueprints
    app.register_blueprint(auth_bp, url_prefix="/api/v2/auth")
    app.register_blueprint(image_bp, url_prefix="/api/v2/images")

    return app
