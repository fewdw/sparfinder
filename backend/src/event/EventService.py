from src.utils.auth.Auth import Auth
from src.event.EventRepository import EventRepository
from src.utils.validator.EventValidator import EventValidator
from src.event.Event import Event

class EventService:

    def __init__(self):
        self.auth = Auth()
        self.event_repository = EventRepository()
        self.event_validator = EventValidator()

    def create_event(self, req):
        
        try:
            JWT = req.get("JWT", None)
            extracted_jwt = self.auth.extract_jwt(JWT)
            coach_id = extracted_jwt['uuid']
            account_type = extracted_jwt['account_type']
        except Exception as e:
            return {"error": str(e)}, 400
        
        if account_type != "coach":
            return {"error": "You must be a coach to create an event"}, 400
        
        name = req.get("name", None)
        description = req.get("description", None)
        date = req.get("date", None)
        time = req.get("time", None)
        length_time = int(req.get("length_time", None))
        location = req.get("location", None)
        max_participants = int(req.get("max_participants", None))
        is_private = req.get("is_private", None)
        use_gym_location = req.get("use_gym_location", None)
        
        gym_id = self.event_repository.get_gym_id_by_coach_id(coach_id)

        if use_gym_location:
            location = self.event_repository.get_gym_location(gym_id)


        new_event = Event(name, description, date, time, length_time, location, gym_id, max_participants, is_private)

        if not self.event_validator.event_is_valid(new_event):
            return {"error": "Invalid event data"}

        return self.event_repository.create_event(new_event)

    def get_coaches_past_events(self, req):
        try:
            JWT = req.get("JWT", None)
            extracted_jwt = self.auth.extract_jwt(JWT)
            coach_id = extracted_jwt['uuid']
        except Exception as e:
            return {"error": str(e)}, 400

        return self.event_repository.get_coaches_past_events(coach_id)
    
    def get_coaches_future_events(self, req):
        try:
            JWT = req.get("JWT", None)
            extracted_jwt = self.auth.extract_jwt(JWT)
            coach_id = extracted_jwt['uuid']
        except Exception as e:
            return {"error": str(e)}, 400

        return self.event_repository.get_coaches_future_events(coach_id)