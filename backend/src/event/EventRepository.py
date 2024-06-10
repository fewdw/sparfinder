from datetime import date
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

    def get_gym_id_by_coach_id(self, coach_id):
        query = {"coaches": coach_id}
        gym = self.gyms.find_one(query, {"UUID": 1, "_id": 0})
        return gym["UUID"]

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


    def get_coaches_past_events(self, coach_id):
        gym_id = self.get_gym_id_by_coach_id(coach_id)
        today_str = date.today().strftime('%Y-%m-%d')
        query = {
            "gym_id": gym_id,
            "date": {"$lt": today_str}
        }
        fields = {
            "_id": 0,
            "uuid": 1,
            "name": 1,
            "description": 1,
            "date": 1,
            "time": 1,
            "length_time": 1,
            "location": 1,
            "gym_id": 1,
            "max_participants": 1,
            "participants": 1,
            "waiting": 1,
            "invited": 1,
            "private": 1
        }
        events = self.events.find(query, fields)
        return list(events)

    def get_coaches_future_events(self, coach_id):
        gym_id = self.get_gym_id_by_coach_id(coach_id)
        today_str = date.today().strftime('%Y-%m-%d')
        query = {
            "gym_id": gym_id,
            "date": {"$gte": today_str}
        }
        fields = {
            "_id": 0,
            "uuid": 1,
            "name": 1,
            "description": 1,
            "date": 1,
            "time": 1,
            "length_time": 1,
            "location": 1,
            "gym_id": 1,
            "max_participants": 1,
            "participants": 1,
            "waiting": 1,
            "invited": 1,
            "private": 1
        }
        events = self.events.find(query, fields)
        return list(events)