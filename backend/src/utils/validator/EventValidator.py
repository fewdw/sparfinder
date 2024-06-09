import datetime

class EventValidator:

    def __init__(self):
        pass

    def name_is_valid(self, name):
        try:
            if not name:
                return False
            if len(name) < 1 or len(name) > 100:
                return False
        except Exception as e:
            return False
        return True

    def description_is_valid(self, description):
        try:
            if not description:
                return False
            if len(description) < 5 or len(description) > 500:
                return False
        except Exception as e:
            return False
        
        return True

    def date_is_valid(self, date):
        try:
            input_date = datetime.strptime(date, '%Y-%m-%d')
            today = datetime.now().date()
            return input_date.date() > today
        except ValueError:
            return False

    def time_is_valid(self, time):
        try:
            datetime.strptime(time, '%H:%M')
            return True
        except ValueError:
            return False

    def length_time_is_valid(self, length_time):
        try:
            if not length_time:
                return False
            if len(length_time) < 1 or len(length_time) > 5:
                return False
        except Exception as e:
            return False
        
        return True

    def location_is_valid(self, location):
        try:
            if not description:
                return False
            if len(description) < 5 or len(description) > 500:
                return False
        except Exception as e:
            return False
        
        return True

    def gym_id_is_valid(self, gym_id):
        try:
            if not gym_id:
                return False
        except Exception as e:
            return False
        return True

    def max_participants_is_valid(self, max_participants):
        try:
            if not max_participants:
                return False
            if max_participants <= 2 or max_participants >= 100:
                return False
        except Exception as e:
            return False
        return True

    def private_is_valid(self, private):
        try:
            if not private:
                return False
            if private not in [True, False]:
                return False
        except Exception as e:
            return False
        return True

    def event_is_valid(self, event):
        return(
            self.name_is_valid(event.name) and
            self.description_is_valid(event.description) and
            self.date_is_valid(event.date) and
            self.time_is_valid(event.time) and
            self.length_time_is_valid(event.length_time) and
            self.location_is_valid(event.location) and
            self.gym_id_is_valid(event.gym_id) and
            self.max_participants_is_valid(event.max_participants) and
            self.private_is_valid(event.private)
        )
