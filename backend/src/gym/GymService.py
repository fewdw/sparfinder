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
        level = req.get("level", None)

        jwt_payload = self.auth.extract_jwt(JWT)
        if not jwt_payload:
            return {"error": "Invalid JWT"}

        # validate JWT account_type is coach and get the id
        if jwt_payload["account_type"] != "coach":
            return {"error": "You are not authorized to create a gym"}

        coach_id = jwt_payload["uuid"]

        # validate inputs


        # create a new gym
        new_gym = Gym(name, address, coach_id, rules, level)

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


    def get_gyms_names(self):
        return self.gym_repository.get_gyms_names()


    def get_gym_by_id(self, id):

        if not id:
            return {"error": "No id provided"}

        return self.gym_repository.get_gym_by_id(id)


    def get_gym_boxers(self, gym_id):
        if not gym_id:
            return {"error": "No gym id provided"}
        return self.gym_repository.get_gym_boxers(gym_id)

    def get_gym_coaches(self, gym_id):
        if not gym_id:
            return {"error": "No gym id provided"}
        return self.gym_repository.get_gym_coaches(gym_id)


    def get_all_gyms_for_find_gyms(self):
        return self.gym_repository.get_all_gyms_for_find_gyms()