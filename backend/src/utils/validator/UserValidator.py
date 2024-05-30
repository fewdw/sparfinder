import re
from datetime import datetime


class UserValidator:
    def is_user_valid(self, user):
        # Orchestrating validation checks
        return (
                self.validate_username(user.username) and
                self.validate_email(user.email) and
                self.validate_birth_date(user.birth_date) and
                self.validate_password(user.password) and
                self.validate_type(user.type)
        )

    def validate_username(self, username):
        # Check username length and character composition
        if len(username) < 5 or len(username) > 15:
            return False
        if not username.isalnum() and "_" not in username:
            return False
        if not username.islower():
            return False
        return True

    def validate_email(self, email):
        # Regex pattern for validating an email address
        pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        if re.match(pattern, email):
            return True
        return False

    def validate_birth_date(self, birth_date):
        # Validate that the user is at least 13 years old but not born before 1960
        today = datetime.now()
        thirteen_years_ago = today.replace(year=today.year - 13)
        year_1960 = datetime(year=1960, month=1, day=1)
        try:
            birth_date_obj = datetime.strptime(birth_date, "%Y-%m-%d")
        except ValueError:
            return False
        return year_1960 <= birth_date_obj <= thirteen_years_ago

    def validate_password(self, password):
        # Validate password requirements
        if len(password) < 8:
            return False
        if " " in password.strip():
            return False
        has_upper = any(char.isupper() for char in password)
        has_lower = any(char.islower() for char in password)
        has_special = any(not char.isalnum() for char in password)
        return has_upper and has_lower and has_special

    def validate_type(self, user_type):
        # Validate user type
        return user_type in ("boxer", "coach")
