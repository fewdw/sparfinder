from dotenv import dotenv_values
import pymongo
import certifi
from src.utils.auth.Auth import Auth
from src.utils.db.Database import Database

class CoachRepository(Database):
    def __init__(self):
        super().__init__()
        self.auth = Auth()

    def get_coach_profile_by_id(self, id):
        query = {"UUID": str(id)}
        # Specify the fields to include in the results
        fields = {"fname": 1, "lname": 1, "profile_pic": 1, "_id": 0}
        result = self.coaches.find_one(query, fields)
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
        result = self.coaches.update_one(query, update)
        if result.matched_count == 0:
            return {"error" : "No profile found with the given ID."}
        elif result.modified_count == 0:
            return {"error" : "No update needed, the data is the same."}
        else:
            user = self.auth.get_user_info_for_jwt(email, self.people)
            token = self.auth.create_jwt_token(user)
            return {
                "Success":"Profile updated successfully.",
                "JWT": token
                }

    def get_all_coaches(self):
        fields = {"fname": 1, "lname": 1, "gym_id":1, "_id": 0}
        results = self.coaches.find({}, fields)
        return list(results)