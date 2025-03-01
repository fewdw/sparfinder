from datetime import datetime
import uuid


class User:
    def __init__(self, username, email, birth_date, password, account_type):
        self.username = username
        self.email = email
        self.birth_date = birth_date
        self.password = password
        self.account_type = account_type
        self.UUID = str(uuid.uuid4())
        self.join_date = datetime.today().strftime('%Y-%m-%d')
        self.isVerified = False

    def to_dict(self):
        return{
            'username': self.username,
            'email': self.email,
            'birth_date': self.birth_date,
            'password': self.password,
            'account_type': self.account_type,
            'UUID': self.UUID,
            'join_date': self.join_date,
            'isVerified': self.isVerified
        }