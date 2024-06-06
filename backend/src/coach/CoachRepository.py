from dotenv import dotenv_values
import pymongo
import certifi
from src.utils.auth.Auth import Auth

env = dotenv_values(".env")
db_connection_string = env["DATABASE_CONNECTION_STRING"]

client = pymongo.MongoClient(db_connection_string, tlsCAFile=certifi.where())
db = client.people

class CoachRepository:
    def __init__(self):
        self.db = db
        self.auth = Auth()

    def get_coach_profile_by_id(self, id):
        query = {"UUID": str(id)}
        # Specify the fields to include in the results
        fields = {"fname": 1, "lname": 1, "profile_pic": 1, "_id": 0}
        result = self.db.coaches.find_one(query, fields)
        if result:
            return result
        else:
            return {}
        
    def post_coach_profile_by_id(self, id, fname, lname, email, profile_pic=" "):
        query = {"UUID": str(id)}
        update = {
            "$set": {
                "fname": fname,
                "lname": lname,
                "profile_pic": profile_pic
            }
        }
        result = self.db.coaches.update_one(query, update)
        if result.matched_count == 0:
            return {"error" : "No profile found with the given ID."}
        elif result.modified_count == 0:
            return {"error" : "No update needed, the data is the same."}
        else:
            user = self.auth.get_user_info_for_jwt(email, self.db)
            token = self.auth.create_jwt_token(user)
            return {
                "Success":"Profile updated successfully.",
                "JWT": token
                }

