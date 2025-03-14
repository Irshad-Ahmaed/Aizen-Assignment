import boto3
import os
from flask import request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..ai_analysis import analyze_image
from ..models.models import Image
from ..extensions import db
from . import image_bp

# Initialize S3 client
s3 = boto3.client(
    "s3",
    region_name=os.getenv("S3_REGION"),
)

# Bucket Name
bucket_name = os.getenv("S3_BUCKET_NAME")

# Uploading image to AWS S3 Bucket
def upload_to_s3(file, bucket_name, file_name):
    """Uploads a file to S3 and returns the file URL."""
    try:
        s3.upload_fileobj(file, bucket_name, file_name)
        return f"https://{bucket_name}.s3.amazonaws.com/{file_name}"
    except Exception as e:
        # Log the error for debugging (replace with logging module in production)
        print(f"Error uploading to S3: {e}")
        raise

# Image Upload Route
@image_bp.route("/upload", methods=["POST"])
@jwt_required()
def upload_image():
    try:
        # Check if file is in the request
        print('started')
        print('image:', request.files)
        if "image" not in request.files:
            return jsonify({"message": "No file uploaded"}), 400

        file = request.files["image"]
        user_id = get_jwt_identity()
        file_name = f"{user_id}_{file.filename}"

        # Upload file to S3
        file_url = upload_to_s3(file, bucket_name, file_name)

        # Analyze image with Gemini API
        ai_description = analyze_image(file_url)
        print('Ai description', ai_description)

        # Save file info to the database
        new_image = Image(user_id=user_id, file_name=file.filename, file_url=file_url, ai_description=ai_description)
        db.session.add(new_image)
        db.session.commit()

        return jsonify({"message": "File uploaded successfully", "file_url": file_url}), 201

    except Exception as e:
        # Log the error for debugging (replace with logging module in production)
        print(f"Error in upload_image: {e}")
        return jsonify({"message": "An internal error occurred"}), 500


# Get All Image Route
@image_bp.route("/list", methods=["GET"])
@jwt_required()
def list_images():
    try:
        user_id = get_jwt_identity()
        images = Image.query.filter_by(user_id=user_id).all()
        if not images:
            return jsonify({"message": "No Image Found"}), 200

        # Format the image data for response
        image_data = [{"id": img.id, "file_name": img.file_name, "file_url": img.file_url, "ai_description": img.ai_description} for img in images]

        return jsonify(image_data), 200

    except Exception as e:
        # Log the error for debugging (replace with logging module in production)
        print(f"Error in list_images: {e}")
        return jsonify({"message": "An internal error occurred"}), 500