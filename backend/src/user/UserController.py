from flask import Blueprint, request
from src.user.UserService import UserService

user_bp = Blueprint('user', __name__)

user_service = UserService()


@user_bp.route('/register')
def create_account_controller():
    return user_service.create_account(request.get_json())
