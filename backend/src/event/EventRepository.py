from dotenv import dotenv_values
import pymongo
import certifi
from src.utils.auth.Auth import Auth

env = dotenv_values(".env")
db_connection_string = env["DATABASE_CONNECTION_STRING"]

db = pymongo.MongoClient(db_connection_string, tlsCAFile=certifi.where())

events = db.events.events
gyms = db.gyms.gyms

class EventRepository:
    def __init__(self):
        self.events = events
        self.auth = Auth()
        self.gyms = gyms

    def get_gym_location(self, gym_id):
        gym = self.gyms.find_one({"UUID": gym_id}, {"address": 1, "_id": 0})
        return gym["address"]

    def create_event(self, event):
        try:
            events.insert_one(event.to_dict())

            self.gyms.update_one(
            {'UUID': event.gym_id}, 
            {'$push': {'events': event.uuid}}
        )
            return {"success": "Event created successfully"}

        except Exception as e:
            return {"error":f"there was an error reaching the database: {e}"}