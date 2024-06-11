from datetime import date, datetime
from dotenv import dotenv_values
import pymongo
import certifi
from src.utils.auth.Auth import Auth

env = dotenv_values(".env")
db_connection_string = env["DATABASE_CONNECTION_STRING"]

db = pymongo.MongoClient(db_connection_string, tlsCAFile=certifi.where())

events = db.events.events
gyms = db.gyms.gyms
boxers = db.people.boxers

class EventRepository:
    def __init__(self):
        self.events = events
        self.auth = Auth()
        self.gyms = gyms
        self.boxers = boxers

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

    def event_belongs_to_coach(self, event_id, coach_id):
        query = {
            "uuid": event_id,
        }
        event = self.events.find_one(query, {"gym_id": 1, "_id": 0})

        gym = self.gyms.find_one({"UUID": event["gym_id"]}, {"coaches": 1, "_id": 0})

        if coach_id not in gym["coaches"]:
            return False

        return True

    def delete_event(self, event_id):
        try:
            event = self.events.find_one({"uuid": event_id}, {"date": 1})
            if event is None:
                return {"error": "Event not found"}

            event_date = datetime.strptime(event['date'], '%Y-%m-%d').date()
            today = date.today()

            if event_date < today:
                return {"error": "Cannot delete past or current events"}

            self.events.delete_one({"uuid": event_id})
            
            self.gyms.update_one(
                {'events': event_id}, 
                {'$pull': {'events': event_id}}
            )

            # REMOVE FROM BOXERS

            return {"success": "Event deleted successfully"}
        except Exception as e:
            return {"error": f"There was an error reaching the database: {e}"}


    def get_event_by_id_to_modify(self, event_id):
        query = {
            "uuid": event_id
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
            "private": 1

        }
        event = self.events.find_one(query,fields)
        return event


    def modify_event(self, date, description, length_time, location, max_participants, name, time, private, event_uuid):
        try:
            self.events.update_one(
                {"uuid": event_uuid},
                {"$set": {
                    "date": date,
                    "description": description,
                    "length_time": length_time,
                    "location": location,
                    "max_participants": max_participants,
                    "name": name,
                    "time": time,
                    "private": private,
                }}
            )
            return {"success": "Event updated successfully"}
        except Exception as e:
            return {"error": f"There was an error reaching the database: {e}"}


    def get_fields_for_get_all_events(self):
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
            "private": 1,
            "participants_count": {"$size": "$participants"}
        }
        return fields

    def get_all_future_events(self, filters):
        today_str = date.today().strftime('%Y-%m-%d')
        query = {"date": {"$gte": today_str}}
        self.apply_filters(query, filters, future=True)
        fields = self.get_fields_for_get_all_events()
        events = self.events.find(query, fields)
        return list(events)

    def get_all_past_events(self, filters):
        today_str = date.today().strftime('%Y-%m-%d')
        query = {"date": {"$lt": today_str}}
        self.apply_filters(query, filters, future=False)
        fields = self.get_fields_for_get_all_events()
        events = self.events.find(query, fields)
        return list(events)

    def apply_filters(self, query, filters, future=False):
        if 'min_date' in filters:
            query["date"].update({"$gte": filters['min_date']})
        if 'max_date' in filters:
            query["date"].update({"$lte": filters['max_date']})
        if 'min_time' in filters:
            query.setdefault("time", {})["$gte"] = filters['min_time']
        if 'max_time' in filters:
            query.setdefault("time", {})["$lte"] = filters['max_time']
        if 'is_private' in filters:
            query["private"] = filters['is_private'].lower() in ['true', '1', 'yes']

        if 'has_place' in filters and filters['has_place'].lower() in ['true', '1', 'yes']:
            # Ensure the number of participants is less than max_participants
            query["$expr"] = {"$lt": [{"$size": "$participants"}, "$max_participants"]}


    def boxer_participate_to_event(self, event_id, boxer_id):
        # Find the event to check its status
        event = self.events.find_one({"uuid": event_id})
        if not event:
            return {"result": "Event not found"}

        # Check if the boxer is already in any of the lists
        if boxer_id in event.get('participants', []) + event.get('waiting', []) + event.get('invited', []):
            list_name = "participants" if boxer_id in event.get('participants', []) else ("waiting" if boxer_id in event.get('waiting', []) else "invited")
            return {"result": f"already in {list_name} list"}

        # Check if the event is full or private
        is_full = len(event.get('participants', [])) >= event.get('max_participants', float('inf'))
        is_private = event.get('private', False)

        # Decide where to add the boxer based on the event's status
        if is_full or is_private:
            # Add boxer to the waiting list if the event is full or private
            self.events.find_one_and_update(
                {"uuid": event_id},
                {"$push": {"waiting": boxer_id}},
            )
            return {"result": "added to waiting list"}
        else:
            # Add boxer to the participants list if the event is not full and is public
            update_result = self.events.find_one_and_update(
                {"uuid": event_id},
                {"$push": {"participants": boxer_id}},
            )
            # Update boxer's participated events only if added to the participants
            if update_result:
                self.boxers.find_one_and_update(
                    {"UUID": boxer_id},
                    {"$push": {"participated_events": event_id}}
                )
            return {"result": "added to participants"}

        return {"result": "An error occurred while adding the boxer to the event"}


    def get_event_participants_by_id(self, event_id):
        query = {
            "uuid": event_id
        }
        fields = {
            "_id": 0,
            "participants": 1
        }
        event = self.events.find_one(query, fields)
        
        boxers = self.boxers.find({"UUID": {"$in": event["participants"]}}, {"_id": 0, "waiting_list":0, "invite_list":0,"event_rated":0,"boxers_rated":0,"rating":0,"profile_pic":0,"participated_events":0})
        return list(boxers)