import unittest
from parameterized import parameterized
from src.utils.auth.PassWordHash import PassWordHash
import bcrypt

class TestPasswordHash(unittest.TestCase):
    def setUp(self):
        self.password_hasher = PassWordHash()

    def test_hash_password(self):
        password = "securepassword123"
        hashed = self.password_hasher.hash_password(password)
        # Check that the hashed password is indeed a byte string
        self.assertIsInstance(hashed, bytes)
        # Verify bcrypt's hash contains the correct prefix indicating the bcrypt hash
        self.assertTrue(hashed.startswith(b'$2b$'))

    def test_passwords_match(self):
        password = "testpassword"
        hashed_password = self.password_hasher.hash_password(password)
        # Check password match returns True
        self.assertTrue(self.password_hasher.passwords_match(password, hashed_password))
        # Check that incorrect password returns False
        self.assertFalse(self.password_hasher.passwords_match("wrongpassword", hashed_password))

    @parameterized.expand([
        ("empty_password", ""),
        ("simple_password", "password"),
        ("complex_password", "Comp!ex@1234")
    ])
    def test_hash_and_verify_password(self, name, password):
        hashed_password = self.password_hasher.hash_password(password)
        self.assertTrue(self.password_hasher.passwords_match(password, hashed_password))

if __name__ == "__main__":
    unittest.main()
