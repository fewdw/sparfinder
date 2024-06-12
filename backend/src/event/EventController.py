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

@event_bp.route('/participants/<event_id>', methods=['GET'])
def get_event_participants_by_id(event_id):
    return jsonify(event_service.get_event_participants_by_id(event_id))

@event_bp.route('/participants', methods=['POST'])
def remove_boxer_from_participants_by_id():
    return jsonify(event_service.remove_boxer_from_participants_by_id(request.get_json()))

@event_bp.route('/waiting/<event_id>', methods=['POST'])
def view_event_waitlist(event_id):
    return jsonify(event_service.view_event_waitlist(request.get_json(), event_id))

@event_bp.route('/approve/<event_id>', methods=['POST'])
def approve_people_from_waitlist(event_id):
    return jsonify(event_service.approve_people_from_waitlist(request.get_json(), event_id))

@event_bp.route('/remove/<event_id>', methods=['POST'])
def remove_people_from_waitlist(event_id):
    return jsonify(event_service.remove_people_from_waitlist(request.get_json(), event_id))

@event_bp.route('/coach/events', methods=['POST'])
def get_coach_event_name_and_id_by_id():
    return jsonify(event_service.get_coach_event_name_and_id_by_id(request.get_json()))

@event_bp.route('/invite', methods=['POST'])
def invite_boxer_to_event():
    return jsonify(event_service.invite_boxer_to_event(request.get_json()))

@event_bp.route('/invite/list', methods=['POST'])
def get_invited_boxers_list():
    return jsonify(event_service.get_invited_boxers_list(request.get_json()))


@event_bp.route('/invite/revoke', methods=['POST'])
def revoke_invitation():
    return jsonify(event_service.revoke_invitation(request.get_json()))

# route to view boxers participating events
@event_bp.route('/boxer/view/participating', methods=['POST'])
def view_boxers_participating_events():
    return jsonify(event_service.view_boxers_participating_events(request.get_json()))

# route to leave boxers participating events
@event_bp.route('/boxer/leave/participating', methods=['POST'])
def boxer_leave_participating_events():
    return jsonify(event_service.boxer_leave_participating_events(request.get_json()))

# route to view boxers waiting list events
@event_bp.route('/boxer/view/waiting', methods=['POST'])
def view_boxers_waiting_list_events():
    return jsonify(event_service.view_boxers_waiting_list_events(request.get_json()))

# route to leave boxers waiting list events
@event_bp.route('/boxer/leave/waiting', methods=['POST'])
def boxer_leave_waiting_list_events():
    return jsonify(event_service.boxer_leave_waiting_list_events(request.get_json()))

# route to view boxers invited events
@event_bp.route('/boxer/view/invited', methods=['POST'])
def view_boxers_invited_events():
    return jsonify(event_service.view_boxers_invited_events(request.get_json()))

# route to leave boxers invited events
@event_bp.route('/boxer/leave/invited', methods=['POST'])
def boxer_leave_invited_events():
    return jsonify(event_service.boxer_leave_invited_events(request.get_json()))

# route to accept invitation
@event_bp.route('/boxer/accept/invitation', methods=['POST'])
def boxer_accept_invitation():
    return jsonify(event_service.boxer_accept_invitation(request.get_json()))
