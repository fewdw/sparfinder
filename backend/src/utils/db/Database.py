from dotenv import dotenv_values
import pymongo
import certifi

class Database:
    def __init__(self):
        env = dotenv_values(".env")
        db_connection_string = env["DATABASE_CONNECTION_STRING"]
        client = pymongo.MongoClient(db_connection_string, tlsCAFile=certifi.where())
        self.boxers = client.people.boxers
        self.coaches = client.people.coaches
        self.users = client.people.users
        self.gyms = client.gyms.gyms
        self.events = client.events.events
        self.people = client.people