from flask import Blueprint

example_bp = Blueprint('example', __name__)


@example_bp.route('/')
def index():
    return 'Hello from example blueprint'
