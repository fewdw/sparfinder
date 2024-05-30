from dotenv import dotenv_values
import pymongo
from bson import Binary
import certifi

env = dotenv_values(".env")
db_connection_string = env["DATABASE_CONNECTION_STRING"]

client = pymongo.MongoClient(db_connection_string, tlsCAFile=certifi.where())
db = client.people


class UserRepository:
    def __init__(self):
        self.db = db

    def add_new_user(self, new_user):
        # check if username is unique
        # check if email is unique
        query = {'$or': [{'username': new_user.username}, {'email': new_user.email}]}
        exists = self.db.users.find_one(query)

        if exists:
            return {"error": "username or email already exists"}

        # add user to the db
        self.db.users.insert_one(new_user)
        new_user.to_dict()
        # create a user or coach with same uuid and add it

