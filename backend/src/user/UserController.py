from flask import Blueprint, request, jsonify
from src.user.UserService import UserService

user_bp = Blueprint('user', __name__)

user_service = UserService()


@user_bp.route('/register', methods=['POST'])
def create_account_controller():
    return jsonify(user_service.create_account(request.get_json()))

@user_bp.route('/login', methods=['POST'])
def login_controller():
    return jsonify(user_service.login(request.get_json()))
