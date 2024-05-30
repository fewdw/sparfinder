from src.user.User import User
from src.utils.validator.UserValidator import UserValidator


class UserService:

    def __init__(self):
        self.validator = UserValidator()

    def create_account(self, req):
        new_user = User(
            req.get('username', None),
            req.get('email', None),
            req.get('birth_date', None),
            req.get('password', None),
            req.get('type', None)
        )

        self.validator.is_user_valid(new_user)

        # add it to the db through repository


