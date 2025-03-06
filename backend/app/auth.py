import functools
import bcrypt
import sqlalchemy

from flask import (
    Blueprint, request, jsonify
)
import sqlalchemy.exc
from werkzeug.security import check_password_hash, generate_password_hash

from flask_jwt_extended import create_access_token

from .db import db_session
from .models import User

bp = Blueprint('auth', __name__, url_prefix='/auth')

@bp.post('/register')
def register():
    name = request.form.get('name', None)
    email = request.form.get('email', None)
    password = request.form.get('password', None)

    if not (name and email and password):
        return jsonify({
            'msg': 'bad request'
        }), 400
    
    user = User(name, email, password=generate_password_hash(password))

    try:
        db_session.add(user)
        db_session.commit()
    except sqlalchemy.exc.IntegrityError:
        return jsonify({
            'msg': 'email already used'
        }), 400
    else:
        return jsonify({
            'user': {
                'id': user.id,
                'name': user.name,
                'email': user.email
            }
        })

@bp.post('/login')
def login():
    email = request.form.get('email', None)
    password = request.form.get('password', None)

    if not (email and password):
        return jsonify({
            'errors': ['email and password are required']
        }), 400

    user = User.query.filter_by(email=email).first()

    if user and check_password_hash(user.password, password):
        access_token = create_access_token(identity=user.email)
        return jsonify({
            'data': {
                'access_token': access_token
            }
        })
    else:
        return jsonify({
            'errors': ['Invalid credentials']
        }), 401