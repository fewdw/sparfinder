from src.gym.GymRepository import GymRepository

class GymService:
    def __init__(self):
        self.gym_repository = GymRepository()

    def get_gym_coach_by_id(self, id):
        return self.gym_repository.get_gym_coach_by_id(id)