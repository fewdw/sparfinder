class Boxer:
    def __init__(self, UUID, birth_date):
        self.UUID = UUID
        self.num_of_fights = 0
        self.weight = 0
        self.rating = 0
        self.num_of_rating = 0
        self.waiting_list = []
        self.invite_list = []
        self.boxers_rated = []
        self.event_rated = []
        self.profile_pic = ""
        self.participated_events = []
        self.fname = ""
        self.lname = ""
        self.gender = ""
        self.country = ""
        self.birth_date = birth_date
        self.stance = ""
        self.level = ""
        self.gym_id = ""

    def to_dict(self):
        return {
            "UUID": self.UUID,
            "num_of_fights": self.num_of_fights,
            "weight": self.weight,
            "rating": self.rating,
            "num_of_rating": self.num_of_rating,
            "waiting_list": self.waiting_list,
            "invite_list": self.invite_list,
            "boxers_rated": self.boxers_rated,
            "event_rated": self.event_rated,
            "profile_pic": self.profile_pic,
            "participated_events": self.participated_events,
            "fname": self.fname,
            "lname": self.lname,
            "gender": self.gender,
            "country": self.country,
            "birth_date": self.birth_date,
            "stance": self.stance,
            "level": self.level,
            "gym_id": self.gym_id,
        }



