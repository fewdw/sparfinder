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
        birth_date = req.get("birth_date", None)
        country = req.get("country", None)
        fname = req.get("fname", None)
        gender = req.get("gender", None)
        level = req.get("level", None)
        lname = req.get("lname", None)
        num_of_fights = req.get("num_of_fights", None)
        profile_pic = req.get("profile_pic", None)
        stance = req.get("stance", None)
        weight = req.get("weight", None)

        jwt_payload_id = self.auth.extract_jwt(JWT)['uuid']
        jwt_payload_email = self.auth.extract_jwt(JWT)['email']

        # validate inputs here before posting.........

        return self.boxer_repository.post_boxer_profile_by_id(
            jwt_payload_id,
            jwt_payload_email,
            birth_date,
            country,
            fname,
            gender,
            level,
            lname,
            num_of_fights,
            stance,
            weight,
            profile_pic
        )
