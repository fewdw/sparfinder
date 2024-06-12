from datetime import datetime
import re

class EventValidator:
    def __init__(self):
        pass

    def name_is_valid(self, name):
        if not name:
            return {"error": "The name field is required."}
        if not (1 <= len(name) <= 100):
            return {"error": "Name must be between 1 and 100 characters long."}
        return True

    def description_is_valid(self, description):
        if not description:
            return {"error": "Description is required."}
        if not (5 <= len(description) <= 500):
            return {"error": "Description must be between 5 and 500 characters long."}
        return True


    def time_is_valid(self, time_str):
        time_pattern = re.compile(r'^([01]\d|2[0-3]):([0-5]\d)$')
        return bool(time_pattern.match(time_str))

    # FIX THIS CODE
    def date_is_valid(self, date_str):
        date_pattern = re.compile(r'^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$')
        if not date_pattern.match(date_str):
            return False

        try:
            date_obj = datetime.strptime(date_str, '%Y-%m-%d')
        except ValueError:
            return False

        return date_obj > datetime.now()

    def length_time_is_valid(self, length_time):
        if length_time is None:
            return {"error": "Length time field is required."}
        try:
            length_time = int(length_time)
        except ValueError:
            return {"error": "Length time must be a number between 1 and 5."}
        if not (1 <= length_time <= 5):
            return {"error": "Length time must be between 1 and 5."}
        return True


    def location_is_valid(self, location):
        if not location:
            return {"error": "Location is required."}
        if not (5 <= len(location) <= 500):
            return {"error": "Location must be between 5 and 500 characters long."}
        return True

    def gym_id_is_valid(self, gym_id):
        if not gym_id:
            return {"error": "Gym ID is required."}
        return True

    def max_participants_is_valid(self, max_participants):
        if not max_participants:
            return {"error": "Max participants field is required."}
        if not (3 <= max_participants <= 100):
            return {"error": "Max participants must be between 3 and 100."}
        return True

    def private_is_valid(self, private):
        if private not in [True, False]:
            return {"error": "Private must be a boolean value (True or False)."}
        return True

    def update_event_is_valid(self, date, description, length_time, location, max_participants, name, time, private):
        validators = [
            self.date_is_valid(date),
            self.description_is_valid(description),
            self.length_time_is_valid(length_time),
            self.location_is_valid(location),
            self.max_participants_is_valid(max_participants),
            self.name_is_valid(name),
            self.time_is_valid(time),
            self.private_is_valid(private)
        ]
        if all(result == True for result in validators):
            return True
        else:
            return [result for result in validators if result != True]

    def event_is_valid(self, event):
        validators = [
            self.name_is_valid(event.name),
            self.description_is_valid(event.description),
            self.date_is_valid(event.date),
            self.time_is_valid(event.time),
            self.length_time_is_valid(event.length_time),
            self.location_is_valid(event.location),
            self.gym_id_is_valid(event.gym_id),
            self.max_participants_is_valid(event.max_participants),
            self.private_is_valid(event.private)
        ]
        if all(result == True for result in validators):
            return True
        else:
            return [result for result in validators if result != True]
