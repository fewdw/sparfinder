from flask import Blueprint, request, jsonify
from src.event.EventService import EventService

event_bp = Blueprint('event', __name__)
event_service = EventService()

@event_bp.route('/', methods=['POST'])
def create_event():
    return jsonify(event_service.create_event(request.get_json()))

@event_bp.route('/coach/past', methods=['POST'])
def get_coaches_past_events():
    return jsonify(event_service.get_coaches_past_events(request.get_json()))

@event_bp.route('/coach/future', methods=['POST'])
def get_coaches_future_events():
    return jsonify(event_service.get_coaches_future_events(request.get_json()))

@event_bp.route('/', methods=['DELETE'])
def delete_event():
    return jsonify(event_service.delete_event(request.get_json()))

@event_bp.route('/belongsto', methods=['POST'])
def event_belongs_to_coach():
    return jsonify(event_service.event_belongs_to_coach(request.get_json()))

@event_bp.route('/<event_id>', methods=['GET'])
def get_event_by_id_to_modify(event_id):
    return jsonify(event_service.get_event_by_id_to_modify(event_id))

@event_bp.route('/', methods=['PUT'])
def modify_event():
    return jsonify(event_service.modify_event(request.get_json()))

@event_bp.route('/events/future', methods=['GET'])
def get_all_future_events():
    req_filters = request.args.to_dict()
    return jsonify(event_service.get_all_future_events(req_filters))

@event_bp.route('/events/past', methods=['GET'])
def get_all_past_events():
    req_filters = request.args.to_dict()
    return jsonify(event_service.get_all_past_events(req_filters))

@event_bp.route('/participate', methods=['POST'])
def boxer_participate_to_event():
    return jsonify(event_service.boxer_participate_to_event(request.get_json()))
