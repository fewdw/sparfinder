from dotenv import dotenv_values
import pymongo
import certifi

env = dotenv_values(".env")
db_connection_string = env["DATABASE_CONNECTION_STRING"]

client = pymongo.MongoClient(db_connection_string, tlsCAFile=certifi.where())
db = client.gyms

class GymRepository:
    def __init__(self):
        self.db = db

    def get_gym_coach_by_id(self, coach_id):

        query = {"coaches": coach_id}
        
        gym = self.db.gyms.find_one(query, {"_id": 0})

        if not gym:
            return {"error": "No gym found for this coach"}

        return gym


    def post_new_gym(self, gym, coach_id):
        existing_gym_count = self.db.gyms.count_documents({"coaches": coach_id})

        if existing_gym_count > 0:
            return {"error": "Coach is already associated with another gym."}

        try:
            self.db.gyms.insert_one(gym.to_dict())
            return {"status": "success"}
        except Exception as e:
            return {"error": str(e)}
        
    def delete_gym(self, coach_id):
        query = {"coaches": coach_id}
        result = self.db.gyms.delete_one(query)

        if result.deleted_count == 0:
            return {"error": "No gym found for this coach"}

        return {"status": "success"}