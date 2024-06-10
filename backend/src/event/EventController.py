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
