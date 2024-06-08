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

@boxer_bp.route('/gym/name', methods=['POST'])
def get_gym_info():
    return jsonify(boxer_service.get_boxer_gym_info(request.get_json()))


@boxer_bp.route('/boxers', methods=['GET'])
def get_all_boxers():
    req_filters = request.args.to_dict()
    return jsonify(boxer_service.get_all_boxers(req_filters))

@boxer_bp.route('/<boxer_id>', methods=['GET'])
def get_boxer_by_id(boxer_id):
    return jsonify(boxer_service.get_boxer_by_id(boxer_id))