import uuid

class Gym:

    def __init__(self, name, address, coach_id, rules):
        self.name = name
        self.address = address
        self.UUID = str(uuid.uuid4())
        self.coaches = [coach_id]
        self.boxers = []
        self.rating = 0
        self.num_of_ratings = 0
        self.events = []
        self.level = ""
        self.pic = ""
        self.rules = rules


    def to_dict(self):
        return {
            "name": self.name,
            "address": self.address,
            "UUID": self.UUID,
            "coaches": self.coaches,
            "boxers": self.boxers,
            "rating": self.rating,
            "num_of_ratings": self.num_of_ratings,
            "events": self.events,
            "level": self.level,
            "pic": self.pic,
            "rules": self.rules
        }
