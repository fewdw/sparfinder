from flask import Blueprint, request, jsonify
from src.gym.GymService import GymService

gym_bp = Blueprint('gym', __name__)
gym_service = GymService()

@gym_bp.route('/coach', methods=['POST'])
def get_gym_coach_by_id():
    return jsonify(gym_service.get_gym_coach_by_id(request.get_json()))

@gym_bp.route('/', methods=['POST', 'DELETE'])
def handle_gym():
    if request.method == 'POST':
        return jsonify(gym_service.post_new_gym(request.get_json()))
    elif request.method == 'DELETE':
        return jsonify(gym_service.delete_gym(request.get_json()))


@gym_bp.route('/gyms', methods=['GET'])
def get_gyms_names():
    return jsonify(gym_service.get_gyms_names())

@gym_bp.route('/<gym_id>', methods=['GET'])
def get_gym_by_id(gym_id):
    return jsonify(gym_service.get_gym_by_id(gym_id))

@gym_bp.route('/<gym_id>/boxers', methods=['GET'])
def get_gym_boxers(gym_id):
    return jsonify(gym_service.get_gym_boxers(gym_id))

@gym_bp.route('/<gym_id>/coaches', methods=['GET'])
def get_gym_coaches(gym_id):
    return jsonify(gym_service.get_gym_coaches(gym_id))

@gym_bp.route('/', methods=['GET'])
def get_all_gyms_for_find_gyms():
    return jsonify(gym_service.get_all_gyms_for_find_gyms())