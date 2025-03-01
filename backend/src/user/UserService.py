from src.user.User import User
from src.utils.validator.UserValidator import UserValidator
from src.user.UserRepository import UserRepository
from src.utils.auth.PassWordHash import PassWordHash
from dotenv import dotenv_values
from src.utils.auth.Auth import Auth

env = dotenv_values(".env")

class UserService:

    def __init__(self):
        self.validator = UserValidator()
        self.user_repository = UserRepository()
        self.password_hash = PassWordHash()
        self.auth = Auth()

    def create_account(self, req):

        new_user = User(
            req.get('username', None),
            req.get('email', None),
            req.get('birth_date', None),
            req.get('password', None),
            req.get('type', None)
        )

        if not self.validator.is_user_valid(new_user):
            return {"error": "Invalid form inputs... please follow instructions"}

        new_user.password = self.password_hash.hash_password(new_user.password)

        return self.user_repository.add_new_user(new_user)

    def login(self, req):
        email = req.get('email', None)
        password = req.get('password', None)

        if not self.validator.is_login_valid(email, password):
            return {"error": "please enter username and password correctly"}

        # check db to see if it has the email
        if not self.user_repository.check_credentials(email, password):
            return {"error": "email or password is incorrect"}

        # get info from db 
        user = self.user_repository.get_user_info_for_jwt(email)

        # generate a JWT
        token = self.auth.create_jwt_token(user)

        return {"JWT": token}
