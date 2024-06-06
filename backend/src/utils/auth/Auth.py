from dotenv import dotenv_values
import jwt
from dotenv import dotenv_values
import datetime

env = dotenv_values(".env")


class Auth:
    def __init__(self):
        self.env = dotenv_values(".env")
        self.secret_key = self.env['JWT_SECRET_KEY']

    def extract_jwt(self, JWT):
        try:
            payload = jwt.decode(JWT, self.secret_key, algorithms=["HS256"])
            
            if payload:
                return payload
            else:
                return False
        except jwt.ExpiredSignatureError:
            print("Token has expired")
            return False
        except jwt.InvalidTokenError:
            print("Invalid Token")
            return False
        

    def get_user_info_for_jwt(self, email, db):
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
        
    def create_jwt_token(self, user):
        
        token = jwt.encode({
            'fname': user['fname'],
            'lname': user['lname'],
            'email': user['email'],
            'uuid': user['UUID'],
            'profile_pic': user['profile_pic'],
            'account_type': user['account_type'],
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=72)
        }, 
        env['JWT_SECRET_KEY'], algorithm="HS256")

        return token