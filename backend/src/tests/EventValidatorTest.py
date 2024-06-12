from datetime import timedelta
import unittest
from parameterized import parameterized
from datetime import datetime
from src.utils.validator.EventValidator import EventValidator

class TestEventValidator(unittest.TestCase):
    def setUp(self):
        self.validator = EventValidator()

    @parameterized.expand([
        (None, {"error": "The name field is required."}),
        ("", {"error": "The name field is required."}),
        ("a" * 101, {"error": "Name must be between 1 and 100 characters long."}),
        ("Valid Name", True)
    ])
    def test_name_is_valid(self, input, expected):
        result = self.validator.name_is_valid(input)
        self.assertEqual(result, expected)

    @parameterized.expand([
        (None, {"error": "Description is required."}),
        ("", {"error": "Description is required."}),
        ("short", True),
        ("A" * 501, {"error": "Description must be between 5 and 500 characters long."}),
        ("Valid description over five characters", True)
    ])
    def test_description_is_valid(self, input, expected):
        result = self.validator.description_is_valid(input)
        self.assertEqual(result, expected)

    @parameterized.expand([
        ("24:00", False),
        ("23:60", False),
        ("13:60", False),
        ("1300", False),
        ("13:00", True)
    ])
    def test_time_is_valid(self, input, expected):
        result = self.validator.time_is_valid(input)
        self.assertEqual(result, expected)

    @parameterized.expand([
        ("2023-06-10", False),
        ("not-a-date", False),
        ("2024-10-30fff", False),
        ((datetime.now() + timedelta(days=1)).strftime('%Y-%m-%d'), True)  # Future date
    ])
    def test_date_is_valid(self, input, expected):
        result = self.validator.date_is_valid(input)
        self.assertEqual(result, expected)

    @parameterized.expand([
        (None, {"error": "Length time field is required."}),  # Check if this is actually handled. If not, remove or adjust.
        (0, {"error": "Length time must be between 1 and 5."}),  # If "0" is a valid input according to your validation logic, this needs adjusting.
        (6, {"error": "Length time must be between 1 and 5."}),
        (3, True)  # Assuming "3" is within an acceptable range.
    ])
    def test_length_time_is_valid(self, input, expected):
        result = self.validator.length_time_is_valid(input)
        self.assertEqual(result, expected)


    @parameterized.expand([
        (None, {"error": "Location is required."}),
        ("", {"error": "Location is required."}),
        ("A" * 4, {"error": "Location must be between 5 and 500 characters long."}),
        ("A" * 501, {"error": "Location must be between 5 and 500 characters long."}),
        ("Valid Location", True)
    ])
    def test_location_is_valid(self, input, expected):
        result = self.validator.location_is_valid(input)
        self.assertEqual(result, expected)

    @parameterized.expand([
        (None, {"error": "Gym ID is required."}),
        ("72de8b75-5653-454e-8f32-2aedd2578af1",True)
    ])
    def test_gym_id_is_valid(self, input, expected):
        result = self.validator.gym_id_is_valid(input)
        self.assertEqual(result, expected)

    @parameterized.expand([
        (None, {"error": "Max participants field is required."}),
        (2, {"error": "Max participants must be between 3 and 100."}),
        (101, {"error": "Max participants must be between 3 and 100."}),
        (50, True)
    ])
    def test_max_participants_is_valid(self, input, expected):
        result = self.validator.max_participants_is_valid(input)
        self.assertEqual(result, expected)

    @parameterized.expand([
        (None, {"error": "Private must be a boolean value (True or False)."}),
        ("not_boolean", {"error": "Private must be a boolean value (True or False)."}),
        (True, True),
        (False, True)
    ])
    def test_private_is_valid(self, input, expected):
        result = self.validator.private_is_valid(input)
        self.assertEqual(result, expected)

if __name__ == "__main__":
    unittest.main()