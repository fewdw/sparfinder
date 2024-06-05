from flask import Blueprint, request, jsonify
from src.coach.CoachService import CoachService

coach_bp = Blueprint('coach', __name__)
coach_service = CoachService()

@coach_bp.route('/profile/<id>', methods=['GET'])
def get_coach_profile_by_id(id):
    return jsonify(coach_service.get_coach_profile_by_id(id, request.get_json()))

@coach_bp.route('/profile/<id>', methods=['POST'])
def post_coach_profile_by_id(id):
    return jsonify(coach_service.post_coach_profile_by_id(id, request.get_json()))