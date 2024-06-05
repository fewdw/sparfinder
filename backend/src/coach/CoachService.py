from src.utils.auth.Auth import Auth
from src.coach.CoachRepository import CoachRepository

class CoachService:
    
    def __init__(self):
        self.auth = Auth()
        self.coach_repository = CoachRepository()

    def get_coach_profile_by_id(self, id, req):

        JWT = req.get("JWT", None)
        
        if not self.auth.coach_profile_request_matches_jwt(id, JWT):
            return {"error":"requested id does not match profile id found in JWT"}

        coach_profile = self.coach_repository.get_coach_profile_by_id(id)

        return coach_profile
    
    def post_coach_profile_by_id(self, id, req):

        JWT = req.get("JWT", None)
        fname = req.get("fname", None)
        lname = req.get("lname", None)
        profile_pic = req.get("profile_pic", None)

        # form validation for data here....
        # use validator class

        if not self.auth.coach_profile_request_matches_jwt(id, JWT):
            return {"error":"requested id does not match profile id found in JWT"}
        
        return self.coach_repository.post_coach_profile_by_id(id, fname, lname, profile_pic)
