from src.gym.GymRepository import GymRepository
from src.utils.auth.Auth import Auth
from src.gym.Gym import Gym

class GymService:
    def __init__(self):
        self.gym_repository = GymRepository()
        self.auth = Auth()

    def get_gym_coach_by_id(self, req):

        JWT = req.get("JWT", None)
        jwt_payload = self.auth.extract_jwt(JWT)

        if not jwt_payload:
            return {"error": "Invalid JWT"}

        if jwt_payload["account_type"] != "coach":
            return {"error": "You are not authorized to view this gym"}

        return self.gym_repository.get_gym_coach_by_id(jwt_payload['uuid'])


    def post_new_gym(self, req):
        
        # get all data from the request
        JWT = req.get("JWT", None)
        name = req.get("name", None)
        address = req.get("address", None)
        rules = req.get("rules", None)

        jwt_payload = self.auth.extract_jwt(JWT)
        if not jwt_payload:
            return {"error": "Invalid JWT"}

        # validate JWT account_type is coach and get the id
        if jwt_payload["account_type"] != "coach":
            return {"error": "You are not authorized to create a gym"}

        coach_id = jwt_payload["uuid"]

        # validate inputs


        # create a new gym
        new_gym = Gym(name, address, coach_id, rules)

        # place it in the database(gym, coach id)
        return self.gym_repository.post_new_gym(new_gym, coach_id)

    def delete_gym(self, req):

        JWT = req.get("JWT", None)
        jwt_payload = self.auth.extract_jwt(JWT)

        if not jwt_payload:
            return {"error": "Invalid JWT"}

        if jwt_payload["account_type"] != "coach":
            return {"error": "You are not authorized to delete this gym"}

        return self.gym_repository.delete_gym(jwt_payload['uuid'])