from flask import Blueprint, request, jsonify
from src.event.EventService import EventService

event_bp = Blueprint('event', __name__)
event_service = EventService()

@event_bp.route('/', methods=['POST'])
def create_event():
    return jsonify(event_service.create_event(request.get_json()))