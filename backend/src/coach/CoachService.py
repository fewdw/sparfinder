from src.utils.auth.Auth import Auth
from src.coach.CoachRepository import CoachRepository

class CoachService:
    
    def __init__(self):
        self.auth = Auth()
        self.coach_repository = CoachRepository()

    def get_coach_profile_by_id(self, req):

        JWT = req.get("JWT", None)
        
        jwt_payload = self.auth.extract_jwt(JWT)

        coach_profile = self.coach_repository.get_coach_profile_by_id(jwt_payload['uuid'])

        return coach_profile
    
    def post_coach_profile_by_id(self, req):

        JWT = req.get("JWT", None)

        jwt_payload_id = self.auth.extract_jwt(JWT)['uuid']

        fname = req.get("fname", None)
        lname = req.get("lname", None)
        profile_pic = req.get("profile_pic", None)
        email = req.get("email", None)
        
        return self.coach_repository.post_coach_profile_by_id(jwt_payload_id, fname, lname, email, profile_pic)
