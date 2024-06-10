import unittest
from datetime import datetime
from parameterized import parameterized
from src.utils.validator.EventValidator import EventValidator

class TestEventValidator(unittest.TestCase):
    def setUp(self):
        self.validator = EventValidator()

    @parameterized.expand([
        ("", {"error": "The name field is required."}),
        ("a" * 101, {"error": "Name must be between 1 and 100 characters long."}),
        ("John Doe", True)
    ])
    def test_name_is_valid(self, input, expected):
        result = self.validator.name_is_valid(input)
        self.assertEqual(result, expected)

    @parameterized.expand([
        ("", {"error": "Description is required."}),
        ("short", {"error": "Description must be between 5 and 500 characters long."}),
        ("valid description", True)
    ])
    def test_description_is_valid(self, input, expected):
        result = self.validator.description_is_valid(input)
        self.assertEqual(result, expected)

    @parameterized.expand([
        ("2023-06-10", {"error": "Date must be in the future."}),
        ("2024-10-30", True),
        ("not-a-date", {"error": "Date must be in YYYY-MM-DD format."}),
        ("2024-10-30fff", {"error": "Date must be exactly 10 characters in YYYY-MM-DD format."})
    ])
    def test_date_is_valid(self, input, expected):
        result = self.validator.date_is_valid(input)
        self.assertEqual(result, expected)

    @parameterized.expand([
        ("13:00", True),
        ("13:60", {"error": "Time must be in HH:MM format."}),
        ("1300", {"error": "Time must be exactly 5 characters in HH:MM format."})
    ])
    def test_time_is_valid(self, input, expected):
        result = self.validator.time_is_valid(input)
        self.assertEqual(result, expected)

    # Additional tests for other methods can be added here following the same pattern.

if __name__ == "__main__":
    unittest.main()
