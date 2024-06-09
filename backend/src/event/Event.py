import uuid

class Event:
    def __init__(self, name, description, date, time, length_time, location, gym_id, max_participants, is_private):
        self.uuid = str(uuid.uuid4())
        self.name = name
        self.description = description
        self.date = date
        self.time = time
        self.length_time = length_time
        self.location = location
        self.gym_id = gym_id
        self.max_participants = max_participants
        self.participants = []
        self.waiting = []
        self.invited = []
        self.private = is_private


    def to_dict(self):
        return {
            "uuid": self.uuid,
            "name": self.name,
            "description": self.description,
            "date": self.date,
            "time": self.time,
            "length_time": self.length_time,
            "location": self.location,
            "gym_id": self.gym_id,
            "max_participants": self.max_participants,
            "participants": self.participants,
            "waiting": self.waiting,
            "invited": self.invited,
            "private": self.private
        }