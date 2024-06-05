from dotenv import dotenv_values
import pymongo
import certifi
from src.utils.auth.Auth import Auth

env = dotenv_values(".env")
db_connection_string = env["DATABASE_CONNECTION_STRING"]

client = pymongo.MongoClient(db_connection_string, tlsCAFile=certifi.where())
db = client.people

class BoxerRepository:
    def __init__(self):
        self.db = db
        self.auth = Auth()

    def get_boxer_profile_by_id(self, id):
        query = {"UUID": str(id)}
        fields = {
            "_id": 0,
            "num_of_fights": 1,
            "weight": 1,
            "profile_pic": 1,
            "fname": 1,
            "lname": 1,
            "gender": 1,
            "country": 1,
            "birth_date": 1,
            "stance": 1,
            "level": 1
        }
        result = self.db.boxers.find_one(query, fields)
        if result:
            return result
        else:
            return {}


    def post_boxer_profile_by_id():
        pass