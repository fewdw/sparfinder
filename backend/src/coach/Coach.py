class Coach:
    def __init__(self, UUID):
        self.UUID = UUID
        self.gym_id = ""
        self.rating = 0
        self.num_of_rating = 0
        self.boxers_rated = []
        self.gym_rated = []
        self.event_rated = []
        self.fname = ""
        self.lname = ""
        self.profile_pic = ""
        self.invite_list = []

    def to_dict(self):
        return {
            "UUID": self.UUID,
            "gym_id": self.gym_id,
            "rating": self.rating,
            "num_of_rating": self.num_of_rating,
            "boxers_rated": self.boxers_rated,
            "gym_rated": self.gym_rated,
            "event_rated": self.event_rated,
            "fname": self.fname,
            "lname": self.lname,
            "profile_pic": self.profile_pic,
            "invite_list": self.invite_list,
        }