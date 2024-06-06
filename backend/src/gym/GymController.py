from flask import Blueprint, request, jsonify
from src.gym.GymService import GymService

gym_bp = Blueprint('gym', __name__)
gym_service = GymService()

@gym_bp.route('/coach/<id>', methods=['POST'])
def get_gym_coach_by_id(id):
    return jsonify(gym_service.get_gym_coach_by_id(id))