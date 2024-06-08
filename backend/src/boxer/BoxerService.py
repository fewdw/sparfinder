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


    def boxer_choose_gym(self, req):

        try:

            JWT = req.get("JWT", None)
            gym_uuid = req.get("gym_id", None)

        except Exception as e:
            return {"error": f"there was an error getting your JWT: {str(e)}"}
        
        extracted_jwt = self.auth.extract_jwt(JWT)
        
        if extracted_jwt['account_type'] != "boxer":
            return {"error": "You must be a boxer to choose a gym."}

        return self.boxer_repository.boxer_choose_gym(gym_uuid, extracted_jwt['uuid'])


    def get_boxer_gym_info(self, req):
        # with the JWT, get the id of the boxer, then find his gym id, then get the name of the gym..... and return it
        try:
            JWT = req.get("JWT", None)
            extracted_jwt = self.auth.extract_jwt(JWT)
        except Exception as e:
            return {"error": f"there was an error getting your JWT: {str(e)}"}

        if extracted_jwt['account_type'] != "boxer":
            return {"error": "You must be a boxer to get your gym name"}

        return self.boxer_repository.get_boxer_gym_info(extracted_jwt['uuid'])

    def get_all_boxers(self, req_filters):
        filters = {}
        if 'country' in req_filters:
            filters['country'] = req_filters['country']
        if 'gender' in req_filters:
            filters['gender'] = req_filters['gender']
        if 'level' in req_filters:
            filters['level'] = req_filters['level']
        if 'stance' in req_filters:
            filters['stance'] = req_filters['stance']
        if 'minWeight' in req_filters and 'maxWeight' in req_filters:
            filters['weight'] = {
                '$gte': int(req_filters['minWeight']),
                '$lte': int(req_filters['maxWeight'])
            }
        if 'minFights' in req_filters and 'maxFights' in req_filters:
            filters['num_of_fights'] = {
                '$gte': int(req_filters['minFights']),
                '$lte': int(req_filters['maxFights'])
            }

        return self.boxer_repository.get_all_boxers(filters)