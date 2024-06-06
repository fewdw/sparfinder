from flask import Blueprint, request, jsonify
from src.boxer.BoxerService import BoxerService

boxer_bp = Blueprint('boxer', __name__)
boxer_service = BoxerService()

@boxer_bp.route('/profile/info', methods=['POST'])
def get_boxer_profile_by_id():
    return jsonify(boxer_service.get_boxer_profile_by_id(request.get_json()))

@boxer_bp.route('/profile', methods=['POST'])
def post_boxer_profile_by_id():
    return jsonify(boxer_service.post_boxer_profile_by_id(request.get_json()))

@boxer_bp.route('/gym', methods=['POST'])
def handle_boxer_gym():
        return jsonify(boxer_service.boxer_choose_gym(request.get_json()))

