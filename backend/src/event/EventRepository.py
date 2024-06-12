from datetime import date, datetime
from dotenv import dotenv_values
import pymongo
import certifi
from src.utils.auth.Auth import Auth
from src.utils.db.Database import Database


class EventRepository(Database):
    def __init__(self):
        super().__init__()
        self.auth = Auth()

    def get_gym_id_by_coach_id(self, coach_id):
        query = {"coaches": coach_id}
        gym = self.gyms.find_one(query, {"UUID": 1, "_id": 0})
        return gym["UUID"]

    def get_gym_location(self, gym_id):
        gym = self.gyms.find_one({"UUID": gym_id}, {"address": 1, "_id": 0})
        return gym["address"]

    def create_event(self, new_event):
        try:
            self.events.insert_one(new_event.to_dict())

            self.gyms.update_one(
            {'UUID': new_event.gym_id}, 
            {'$push': {'events': new_event.uuid}}
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
            self.boxers.find_one_and_update(
                {"UUID": boxer_id},
                {"$push": {"waiting_list": event_id}}
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

    def remove_boxer_from_participants_by_id(self, event_id, boxer_id):
        try:
            self.events.update_one(
                {'uuid': event_id},
                {"$pull": {"participants": boxer_id}}
            )
            self.boxers.update_one(
                {'UUID': boxer_id},
                {"$pull": {"participated_events": event_id}}
            )
            return {"success": "Boxer removed from event"}
        except Exception as e:
            return {"error": f"There was an error reaching the database: {e}"}


    def view_event_waitlist(self, event_id):
        query = {
            "uuid": event_id
        }
        fields = {
            "_id": 0,
            "waiting": 1
        }
        event = self.events.find_one(query, fields)
        boxers_in_waitlist = list(event["waiting"])

        boxers = self.boxers.find({"UUID": {"$in": boxers_in_waitlist}}, {
        "_id": 0,
        "waiting_list":0, 
        "invite_list":0,
        "event_rated":0,
        "boxers_rated":0,
        "rating":0,
        "profile_pic":0,
        "participated_events":0})

        return list(boxers)

    def approve_people_from_waitlist(self, event_id, boxer_id):
        try:

            current_event = self.events.find_one({"uuid": event_id})
            is_full = len(current_event.get('participants', [])) >= current_event.get('max_participants', float('inf'))

            if is_full:
                return {"error": "Event is already full"}

            self.events.update_one(
                {'uuid': event_id},
                {"$pull": {"waiting": boxer_id}}
            )
            self.events.update_one(
                {'uuid': event_id},
                {"$push": {"participants": boxer_id}}
            )
            self.boxers.update_one(
                {'UUID': boxer_id},
                {"$pull": {"waiting_list": event_id}}
            )
            self.boxers.update_one(
                {'UUID': boxer_id},
                {"$push": {"participated_events": event_id}}
            )
            return {"success": "Boxer approved from waitlist"}
        except Exception as e:
            return {"error": f"There was an error reaching the database: {e}"}

    def remove_people_from_waitlist(self, event_id, boxer_id):
        try:
            self.events.update_one(
                {'uuid': event_id},
                {"$pull": {"waiting": boxer_id}}
            )
            self.boxers.update_one(
                {'UUID': boxer_id},
                {"$pull": {"waiting_list": event_id}}
            )
            return {"success": "Boxer removed from waitlist"}
        except Exception as e:
            return {"error": f"There was an error reaching the database: {e}"}


    def get_coach_event_name_and_id_by_id(self, coach_id):
        # find the coaches gym id
        gym_id = self.get_gym_id_by_coach_id(coach_id)
        # find gym by id and return the events field
        gym = self.gyms.find_one({"UUID": gym_id}, {"events": 1, "_id": 0})
        gym_events_ids = gym["events"]
        # for each event find the full event information, make sure date is $gte today
        today_str = date.today().strftime('%Y-%m-%d')
        gym_events = self.events.find({"uuid": {"$in": gym_events_ids}, "date": {"$gte": today_str}},{"_id": 0, "uuid": 1, "name": 1})
        return(list(gym_events))

    def invite_boxer_to_event(self, event_id, boxer_id):
        try:

            # check if event full, if so return {"result":"event is full..."}
            event = self.events.find_one({"uuid": event_id})
            if len(event.get('participants', [])) >= event.get('max_participants', float('inf')):
                return {"result": "Event is full"}

            # Find the event to ensure it exists and to check its status
            event = self.events.find_one({"uuid": event_id})
            if not event:
                return {"error": "Event not found"}

            # Check if the boxer is already participating, waiting, or invited
            if boxer_id in event.get('participants', []):
                return {"result": "Boxer already participating"}
            if boxer_id in event.get('waiting', []):
                # Move boxer from waiting to invited
                self.events.update_one(
                    {'uuid': event_id},
                    {"$pull": {"waiting": boxer_id}, "$push": {"participants": boxer_id}}
                )
                self.boxers.update_one(
                    {'UUID': boxer_id},
                    {"$pull": {"waiting_list": event_id}, "$push": {"participated_events": event_id}}
                )
                return {"result": "Boxer was in waiting list, now participating"}
            if boxer_id in event.get('invited', []):
                return {"result": "Boxer already in the invited list"}

            # If boxer is neither participating, waiting, nor invited, invite them now
            self.events.update_one(
                {'uuid': event_id},
                {"$push": {"invited": boxer_id}}
            )
            self.boxers.update_one(
                {'UUID': boxer_id},
                {"$push": {"invite_list": event_id}}
            )
            return {"success": "Boxer invited to event"}
        except Exception as e:
            return {"error": f"There was an error reaching the database: {e}"}

    def get_invited_boxers_list(self, event_id):
        query = {
            "uuid": event_id
        }
        fields = {
            "_id": 0,
            "invited": 1
        }
        event = self.events.find_one(query, fields)
        boxers_in_invited = list(event["invited"])

        boxers = self.boxers.find({"UUID": {"$in": boxers_in_invited}}, {
        "_id": 0,
        "waiting_list":0, 
        "invite_list":0,
        "event_rated":0,
        "boxers_rated":0,
        "rating":0,
        "profile_pic":0,
        "participated_events":0})

        return list(boxers)


    def revoke_invitation(self, event_id, boxer_id):
        try:
            self.events.update_one(
                {'uuid': event_id},
                {"$pull": {"invited": boxer_id}}
            )
            self.boxers.update_one(
                {'UUID': boxer_id},
                {"$pull": {"invite_list": event_id}}
            )
            return {"success": "Boxer invitation revoked"}
        except Exception as e:
            return {"error": f"There was an error reaching the database: {e}"}


    def view_boxers_participating_events(self, boxer_id):
        query = {
            "UUID": boxer_id
        }
        boxer = self.boxers.find_one(query, {"participated_events": 1, "_id": 0})
        participating_event_list = list(boxer["participated_events"])
        events = self.events.find({"uuid": {"$in": participating_event_list}}, {"_id": 0, "uuid": 1, "name": 1})
        return list(events)

    def boxer_leave_participating_events(self, event_id, boxer_id):
        try:
            self.events.update_one(
                {'uuid': event_id},
                {"$pull": {"participants": boxer_id}}
            )
            self.boxers.update_one(
                {'UUID': boxer_id},
                {"$pull": {"participated_events": event_id}}
            )
            return {"success": "Boxer removed from event"}
        except Exception as e:
            return {"error": f"There was an error reaching the database: {e}"}

    def view_boxers_waiting_list_events(self, boxer_id):
        query = {
            "UUID": boxer_id
        }
        boxer = self.boxers.find_one(query, {"waiting_list": 1, "_id": 0})
        waiting_event_list = list(boxer["waiting_list"])
        events = self.events.find({"uuid": {"$in": waiting_event_list}}, {"_id": 0, "uuid": 1, "name": 1})
        return list(events)

    def boxer_leave_waiting_list_events(self, event_id, boxer_id):
        try:
            self.events.update_one(
                {'uuid': event_id},
                {"$pull": {"waiting": boxer_id}}
            )
            self.boxers.update_one(
                {'UUID': boxer_id},
                {"$pull": {"waiting_list": event_id}}
            )
            return {"success": "Boxer removed from event"}
        except Exception as e:
            return {"error": f"There was an error reaching the database: {e}"}


    def view_boxers_invited_events(self, boxer_id):
        query = {
            "UUID": boxer_id
        }
        boxer = self.boxers.find_one(query, {"invite_list": 1, "_id": 0})
        invited_event_list = list(boxer["invite_list"])
        events = self.events.find({"uuid": {"$in": invited_event_list}}, {"_id": 0, "uuid": 1, "name": 1})
        return list(events)

    def boxer_leave_invited_events(self, event_id, boxer_id):
        try:
            self.events.update_one(
                {'uuid': event_id},
                {"$pull": {"invited": boxer_id}}
            )
            self.boxers.update_one(
                {'UUID': boxer_id},
                {"$pull": {"invite_list": event_id}}
            )
            return {"success": "Boxer removed from event"}
        except Exception as e:
            return {"error": f"There was an error reaching the database: {e}"}

    def boxer_accept_invitation(self, event_id, boxer_id):
        try:
            current_event = self.events.find_one({"uuid": event_id})
            is_full = len(current_event.get('participants', [])) >= current_event.get('max_participants', float('inf'))

            if is_full:
                return {"error": "Event is already full"}

            self.events.update_one(
                {'uuid': event_id},
                {"$pull": {"invited": boxer_id}}
            )
            self.events.update_one(
                {'uuid': event_id},
                {"$push": {"participants": boxer_id}}
            )
            self.boxers.update_one(
                {'UUID': boxer_id},
                {"$pull": {"invite_list": event_id}}
            )
            self.boxers.update_one(
                {'UUID': boxer_id},
                {"$push": {"participated_events": event_id}}
            )
            return {"success": "Boxer accepted invitation"}
        except Exception as e:
            return {"error": f"There was an error reaching the database: {e}"}