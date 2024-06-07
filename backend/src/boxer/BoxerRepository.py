from dotenv import dotenv_values
import pymongo
import certifi
from src.utils.auth.Auth import Auth

env = dotenv_values(".env")
db_connection_string = env["DATABASE_CONNECTION_STRING"]

client = pymongo.MongoClient(db_connection_string, tlsCAFile=certifi.where())
db = client.people
gyms = client.gyms

class BoxerRepository:
    def __init__(self):
        self.db = db
        self.auth = Auth()
        self.gyms = gyms

    def get_boxer_profile_by_id(self, id):
        query = {"UUID": str(id)}
        fields = {
            "_id": 0,
            "num_of_fights": 1,
            "weight": 1,
            "profile_pic": 1,
            "fname": 1,
            "lname": 1,
            "gender": 1,
            "country": 1,
            "birth_date": 1,
            "stance": 1,
            "level": 1
        }
        result = self.db.boxers.find_one(query, fields)
        if result:
            return result
        else:
            return {}


    def post_boxer_profile_by_id(
            self,
            id,
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
            profile_pic=""):
        
        query = {"UUID": str(id)}
        update = {
            "$set": {
                "birth_date": birth_date,
                "country": country,
                "fname": fname,
                "lname": lname,
                "gender":gender,
                "level": level,
                "num_of_fights": num_of_fights,
                "stance": stance,
                "weight": weight,
                "profile_pic": profile_pic
            }
        }
        result = self.db.boxers.update_one(query, update)
        if result.matched_count == 0:
            return {"error" : "No profile found with the given ID."}
        elif result.modified_count == 0:
            return {"error" : "No update needed, the data is the same."}
        else:
            user = self.auth.get_user_info_for_jwt(jwt_payload_email, self.db)
            token = self.auth.create_jwt_token(user)
            return {
                "Success":"Profile updated successfully.",
                "JWT": token
              }


    def boxer_choose_gym(self, gym_uuid, boxer_uuid):
        db.boxers.update_one(
            {"UUID": boxer_uuid},
            {"$set": {"gym_id": gym_uuid}}
        )
        return {"Success": "Gym chosen successfully."}


    def get_boxer_gym_info(self, boxer_id):
        query = {"UUID": boxer_id}
        fields = {
            "_id": 0,
            "gym_id": 1
        }
        gym = db.boxers.find_one(query, fields)

        if not gym:
            return {"error": "boxer not found."}

        query = {"UUID": gym["gym_id"]}
        fields = {
            "_id": 0,
            "name": 1
        }

        gym = gyms.gyms.find_one(query, fields)
        
        if not gym:
            return {"error": "No gym found for this boxer."}

        return gym

