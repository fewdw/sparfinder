from flask import Flask
from flask_cors import CORS

from src.user.UserController import user_bp
from src.coach.CoachController import coach_bp
from src.boxer.BoxerController import boxer_bp
from src.gym.GymController import gym_bp

app = Flask(__name__)
CORS(app)

app.register_blueprint(user_bp, url_prefix='/sparfinder/api/user')
app.register_blueprint(coach_bp, url_prefix='/sparfinder/api/coach')
app.register_blueprint(boxer_bp, url_prefix='/sparfinder/api/boxer')
app.register_blueprint(gym_bp, url_prefix='/sparfinder/api/gym')


if __name__ == '__main__':
    app.run(debug=True)
