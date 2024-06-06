from flask import Blueprint, request, jsonify
from src.gym.GymService import GymService

gym_bp = Blueprint('gym', __name__)
gym_service = GymService()

@gym_bp.route('/coach/', methods=['POST'])
def get_gym_coach_by_id():
    return jsonify(gym_service.get_gym_coach_by_id(request.get_json()))

@gym_bp.route('/', methods=['POST', 'DELETE'])
def handle_gym():
    if request.method == 'POST':
        return jsonify(gym_service.post_new_gym(request.get_json()))
    elif request.method == 'DELETE':
        return jsonify(gym_service.delete_gym(request.get_json()))