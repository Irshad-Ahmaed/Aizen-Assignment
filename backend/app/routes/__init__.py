from flask import Blueprint

auth_bp = Blueprint("auth", __name__)
image_bp = Blueprint("images", __name__)

from . import auth, image