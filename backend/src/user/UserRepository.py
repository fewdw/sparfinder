from dotenv import dotenv_values
import pymongo
from bson import Binary
import certifi
from src.boxer.Boxer import Boxer
from src.coach.Coach import Coach
from src.utils.auth.PassWordHash import PassWordHash

env = dotenv_values(".env")
db_connection_string = env["DATABASE_CONNECTION_STRING"]

client = pymongo.MongoClient(db_connection_string, tlsCAFile=certifi.where())
db = client.people


class UserRepository:
    def __init__(self):
        self.db = db
        self.password_hash = PassWordHash()

    def add_new_user(self, new_user):

        # check if username is unique
        # check if email is unique
        query = {'$or': [{'username': new_user.username}, {'email': new_user.email}]}

        try:
            exists = self.db.users.find_one(query)
        except Exception as e:
            return {"error": str(e), "type: ": "error connecting to database"}

        if exists:
            return {"error": "username or email already exists"}

        # add user to the db
        try:
            self.db.users.insert_one(new_user.to_dict())
        except Exception as e:
            return {"error": str(e), "type: ": "error inserting to database"}

        if new_user.account_type == "boxer":
            new_boxer = Boxer(new_user.UUID, new_user.birth_date)
            self.db.boxers.insert_one(new_boxer.to_dict())
            return {"success": f"account with username {new_user.username} created, please login"}

        if new_user.account_type == "coach":
            new_coach = Coach(new_user.UUID)
            self.db.coaches.insert_one(new_coach.to_dict())
            return {"success": f"account with username {new_user.username} created, please login"}

        return {"error": "we ran into an error while creating your account"}


    def check_credentials(self, email, password):
        query = {'email': email}
        try:
            user = self.db.users.find_one(query)
        except Exception as e:
            return {"error": str(e), "type: ": "error connecting to database"}

        if not user:
            return False

        if self.password_hash.passwords_match(password, user['password']):
            return True

        return False


    def get_user_info_for_jwt(self, email):
        user_info = db.users.find_one({'email': email},{"account_type": 1, "UUID": 1, "_id": 0})

        if user_info["account_type"] == "boxer":
            boxer_info = db.boxers.find_one({'UUID': user_info["UUID"]}, {"fname": 1, "lname": 1, "profile_pic": 1,"_id": 0})
            return {
                "fname": boxer_info["fname"],
                "lname": boxer_info["lname"],
                "email": email,
                "profile_pic": boxer_info["profile_pic"],
                "account_type": "boxer",
                'UUID':user_info["UUID"]
            }
            

        if user_info["account_type"] == "coach":
            boxer_info = db.coaches.find_one({'UUID': user_info["UUID"]}, {"fname": 1, "lname": 1, "profile_pic": 1, "_id": 0})
            return {
                "fname": boxer_info["fname"],
                "lname": boxer_info["lname"],
                "email": email,
                "profile_pic": boxer_info["profile_pic"],
                "account_type": "coach",
                'UUID':user_info["UUID"]
            }