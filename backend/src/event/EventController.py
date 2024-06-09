from flask import Blueprint, request, jsonify
from src.event.EventService import EventService

event_bp = Blueprint('event', __name__)
event_service = EventService()

