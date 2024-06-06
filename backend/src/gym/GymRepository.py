from dotenv import dotenv_values
import pymongo
import certifi

env = dotenv_values(".env")
db_connection_string = env["DATABASE_CONNECTION_STRING"]

client = pymongo.MongoClient(db_connection_string, tlsCAFile=certifi.where())
db = client.gyms

class GymRepository:
    def __init__(self):
        self.db = db

    def get_gym_coach_by_id(self, id):
        # look for gyms where the id is in [] coaches
        # if found, return the gym
        pass
