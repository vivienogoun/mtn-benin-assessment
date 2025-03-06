import os
import datetime

from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager, jwt_required, get_jwt_identity

def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    
    app.config.from_mapping(
        SECRET_KEY='dev',
        JWT_SECRET_KEY='secret',
        JWT_TOKEN_LOCATION=['headers'],
        CORS_HEADERS='Content-Type',
        JWT_ACCESS_TOKEN_EXPIRES=datetime.timedelta(days=1)
        # DATABASE=os.path.join(app.instance_path, 'app.sqlite'),
    )

    if test_config is None:
        # load the instance config, if it exists, when not testing
        app.config.from_pyfile('config.py', silent=True)
    else:
        # load the test config if passed in
        app.config.from_mapping(test_config)

    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    # a simple page that says hello
    @app.route('/hello')
    @jwt_required()
    def hello():
        user_email = get_jwt_identity()
        # from .models import User
        # user = User.query.filter_by(id=user_id).first()
        return f'Hello, {user_email}'

    from app.db import db_session
    @app.teardown_appcontext
    def shutdown_session(exception=None):
        db_session.remove()

    jwt = JWTManager(app)

    from . import auth, task
    app.register_blueprint(auth.bp)
    app.register_blueprint(task.bp)

    cors = CORS(app, resources={r"*": { "origins": "http://localhost:5173"}})

    return app