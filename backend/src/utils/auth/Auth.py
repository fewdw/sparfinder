from dotenv import dotenv_values
import jwt

class Auth:
    def __init__(self):
        self.env = dotenv_values(".env")
        self.secret_key = self.env['JWT_SECRET_KEY']

    def coach_profile_request_matches_jwt(self, profile_id, JWT):
        try:
            payload = jwt.decode(JWT, self.secret_key, algorithms=["HS256"])
            
            if payload['uuid'] == profile_id:
                return True
            else:
                return False
        except jwt.ExpiredSignatureError:
            print("Token has expired")
            return False
        except jwt.InvalidTokenError:
            print("Invalid Token")
            return False