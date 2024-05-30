import bcrypt


class PassWordHash:

    def __init__(self):
        pass

    def hash_password(self, password):
        return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
