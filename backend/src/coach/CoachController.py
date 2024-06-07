from flask import Blueprint, request, jsonify
from src.coach.CoachService import CoachService

coach_bp = Blueprint('coach', __name__)
coach_service = CoachService()

@coach_bp.route('/profile/info', methods=['POST'])
def get_coach_profile_by_id():
    return jsonify(coach_service.get_coach_profile_by_id(request.get_json()))

@coach_bp.route('/profile', methods=['POST'])
def post_coach_profile_by_id():
    return jsonify(coach_service.post_coach_profile_by_id(request.get_json()))

@coach_bp.route('/', methods=['GET'])
def get_all_coaches():
    return jsonify(coach_service.get_all_coaches())