from flask import Flask
from flask_cors import CORS

from src.user.UserController import user_bp
from src.coach.CoachController import coach_bp

app = Flask(__name__)
CORS(app)

app.register_blueprint(user_bp, url_prefix='/sparfinder/api/user')
app.register_blueprint(coach_bp, url_prefix='/sparfinder/api/coach')

if __name__ == '__main__':
    app.run(debug=True)
