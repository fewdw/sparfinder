from dotenv import dotenv_values
import pymongo
from bson import Binary
import certifi
from src.boxer.Boxer import Boxer
from src.coach.Coach import Coach
from src.utils.auth.PassWordHash import PassWordHash
from src.utils.auth.Auth import Auth
from src.utils.db.Database import Database

class UserRepository(Database):
    def __init__(self):
        super().__init__()
        self.password_hash = PassWordHash()
        self.auth = Auth()

    def add_new_user(self, new_user):

        # check if username is unique
        # check if email is unique
        query = {'$or': [{'username': new_user.username}, {'email': new_user.email}]}

        try:
            exists = self.users.find_one(query)
        except Exception as e:
            return {"error": str(e), "type: ": "error connecting to database"}

        if exists:
            return {"error": "username or email already exists"}

        # add user to the db
        try:
            self.users.insert_one(new_user.to_dict())
        except Exception as e:
            return {"error": str(e), "type: ": "error inserting to database"}

        if new_user.account_type == "boxer":
            new_boxer = Boxer(new_user.UUID, new_user.birth_date)
            self.boxers.insert_one(new_boxer.to_dict())
            return {"success": f"account with username {new_user.username} created, please login"}

        if new_user.account_type == "coach":
            new_coach = Coach(new_user.UUID)
            self.coaches.insert_one(new_coach.to_dict())
            return {"success": f"account with username {new_user.username} created, please login"}

        return {"error": "we ran into an error while creating your account"}


    def check_credentials(self, email, password):
        query = {'email': email}
        try:
            user = self.users.find_one(query)
        except Exception as e:
            return {"error": str(e), "type: ": "error connecting to database"}

        if not user:
            return False

        if self.password_hash.passwords_match(password, user['password']):
            return True

        return False


    def get_user_info_for_jwt(self, email):
        return self.auth.get_user_info_for_jwt(email, self.people)
        
        