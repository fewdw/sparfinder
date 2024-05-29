from flask import Flask

from blueprints.example.example import example_bp

app = Flask(__name__)

app.register_blueprint(example_bp, url_prefix='/pages')

if __name__ == '__main__':
    app.run(debug=True)
