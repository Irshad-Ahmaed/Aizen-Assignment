from flask import request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token
from ..models.models import User
from ..extensions import db
from . import auth_bp

@auth_bp.route("/register", methods=["POST"])
def register():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"message": "Invalid or missing JSON payload"}), 400

        username = data.get("username")
        email = data.get("email")
        password = data.get("password")

        # Validate required fields
        if not username or not email or not password:
            return jsonify({"message": "All fields (username, email, password) are required"}), 400

        print('checking...')

        # Check if email already exists
        if User.query.filter_by(email=email).first():
            return jsonify({"message": "Email already exists"}), 400

        print('checked!')
        # Hash password and create new user
        hashed_password = generate_password_hash(password)
        print('hashed password!')
        new_user = User(username=username, email=email, password=hashed_password)
        print('New User!')

        db.session.add(new_user)
        db.session.commit()

        return jsonify({"message": "User registered successfully"}), 201

    except Exception as e:
        # Log the error (this can be written to a log file for debugging)
        print(f"Error in register route: {e}")
        return jsonify({"message": "An internal error occurred"}), 500


@auth_bp.route("/login", methods=["POST"])
def login():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"message": "Invalid or missing JSON payload"}), 400

        email = data.get("email")
        password = data.get("password")

        # Validate required fields
        if not email or not password:
            return jsonify({"message": "Both email and password are required"}), 400

        # Check if user exists
        user = User.query.filter_by(email=email).first()

        if user and check_password_hash(user.password, password):
            # Generate JWT access token
            access_token = create_access_token(identity=str(user.id))
            return jsonify({"access_token": access_token}), 200

        return jsonify({"message": "Invalid email or password"}), 401

    except Exception as e:
        # Log the error (this can be written to a log file for debugging)
        print(f"Error in login route: {e}")
        return jsonify({"message": "An internal error occurred"}), 500