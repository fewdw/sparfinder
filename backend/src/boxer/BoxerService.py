from src.utils.auth.Auth import Auth
from src.boxer.BoxerRepository import BoxerRepository

class BoxerService:

    def __init__(self):
        self.auth = Auth()
        self.boxer_repository = BoxerRepository()

    def get_boxer_profile_by_id(self, req):
            
        JWT = req.get("JWT", None)
        
        jwt_payload = self.auth.extract_jwt(JWT)

        boxer_profile = self.boxer_repository.get_boxer_profile_by_id(jwt_payload['uuid'])

        return boxer_profile
    
    def post_boxer_profile_by_id(self, req):

        JWT = req.get("JWT", None)

        jwt_payload_id = self.auth.extract_jwt(JWT)['uuid']

        # all fields from boxer

        return self.boxer_repository.post_boxer_profile_by_id(
            jwt_payload_id, fname, lname, profile_pic, email
        )
