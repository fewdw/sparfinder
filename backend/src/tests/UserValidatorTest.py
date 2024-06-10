import unittest
from datetime import datetime
from parameterized import parameterized
from src.utils.validator.UserValidator import UserValidator

class TestUserValidator(unittest.TestCase):

    @parameterized.expand([
        ("username1", True),
        ("user_123", True),
        ("usr", False),
        ("user_name_with_too_long_username", False),
        ("User12", False),
        ("user@12", False),
        ("user.12", False),
        ("fred.mao1", False),
    ])
    def test_validate_username(self, username, expected):
        validator = UserValidator()
        result = validator.validate_username(username)
        self.assertEqual(result, expected)

    @parameterized.expand([
        ("email@example.com", True),
        ("user@example.co.uk", True),
        ("user.name@web.com", True),
        ("user@website", False),
        ("user@", False),
        ("user@.com", False),
    ])
    def test_validate_email(self, email, expected):
        validator = UserValidator()
        result = validator.validate_email(email)
        self.assertEqual(result, expected)

    @parameterized.expand([
        (datetime.now().strftime("%Y-%m-%d"), False),  # Today, should be at least 13 years ago
        ((datetime.now().replace(year=datetime.now().year - 13)).strftime("%Y-%m-%d"), True),  # Exactly 13 years ago
        ((datetime.now().replace(year=datetime.now().year - 15)).strftime("%Y-%m-%d"), True),  # 15 years ago
        ("1960-01-01", True),  # Boundary condition
        ("1959-12-31", False),  # Before 1960
    ])
    def test_validate_birth_date(self, birth_date, expected):
        validator = UserValidator()
        result = validator.validate_birth_date(birth_date)
        self.assertEqual(result, expected)

    @parameterized.expand([
        ("Password1!", True),
        ("P@ssw0rd", True),
        ("password", False),  # No upper case or special character
        ("PASSWORD", False),  # No lower case or special character
        ("Pass word1!", False),  # Contains space
        ("Passw1!", False),  # Too short
    ])
    def test_validate_password(self, password, expected):
        validator = UserValidator()
        result = validator.validate_password(password)
        self.assertEqual(result, expected)

    @parameterized.expand([
        ("boxer", True),
        ("coach", True),
        ("student", False),
        ("Boxer", False),  # Case sensitive
        ("", False),
        (None, False),
    ])
    def test_validate_type(self, user_type, expected):
        validator = UserValidator()
        result = validator.validate_type(user_type)
        self.assertEqual(result, expected)

if __name__ == "__main__":
    unittest.main()
