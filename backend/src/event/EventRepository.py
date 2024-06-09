from dotenv import dotenv_values
import pymongo
import certifi
from src.utils.auth.Auth import Auth

env = dotenv_values(".env")
db_connection_string = env["DATABASE_CONNECTION_STRING"]

db = pymongo.MongoClient(db_connection_string, tlsCAFile=certifi.where())

events = db.events.events

class EventRepository:
    def __init__(self):
        self.events = events
        self.auth = Auth()

    def create_event(self, event):
        try:
            events.insert_one(event)
        except Exception as e:
            return {"error":f"there was an error reaching the database: {e}"}