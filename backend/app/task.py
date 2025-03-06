from flask import Blueprint, request, jsonify
from flask_cors import CORS, cross_origin
from flask_jwt_extended import jwt_required, get_jwt_identity
from .models import Task, User
from .db import db_session

bp = Blueprint('task', __name__, url_prefix='/tasks')

# CORS(bp)

# POST /tasks: Create a new task
@bp.post("")
@jwt_required()
def create_task():
    user_email = get_jwt_identity()
    
    user = User.query.filter_by(email=user_email).first()
    
    title = request.json.get("title", None)
    description = request.json.get("description", None)

    if not title:
        return jsonify({
            'msg': 'bad request'
        }), 400
    
    task = Task(title, description)
    task.creator = user

    db_session.add(task)
    db_session.commit()

    return jsonify({
        'success': True,
        'task': task.to_json()
    })

# GET /tasks: List all tasks with optional filters 
# (status, assigned_user)
@bp.get("/")
# @cross_origin(origin='localhost',headers=['Content-Type','Authorization'])
@jwt_required()
def list_tasks():
    user_email = get_jwt_identity()
    
    user = User.query.filter_by(email=user_email).first()
    
    tasks = Task.query.filter_by(creator_id=user.id)

    response = jsonify({
        'success': True,
        'tasks': [task.to_json() for task in tasks]
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

# GET /tasks/<id>: Retrieve a specific task by ID
@bp.get("/<int:task_id>")
@jwt_required()
def get_task(task_id):
    user_email = get_jwt_identity()
    
    user = User.query.filter_by(email=user_email).first()
    
    task = Task.query.filter_by(id=task_id).first()
    
    if not task:
        return jsonify({
            'success': False,
            'msg': 'task not found'
        }), 404
        
    if task.creator_id != user.id:
        return jsonify({
            'success': False,
            'msg': 'unauthorized'
        }), 401
    
    return jsonify({
        'success': True,
        'task': task.to_json()
    })

# PUT /tasks/<id>: Update a task's status or assigned user
@bp.put("/<int:task_id>")
@jwt_required()
def update_task(task_id):
    title = request.json.get("title", None)
    description = request.json.get("description", None)
    status = request.json.get("status", None)
    assigned_user_id = request.json.get("assigned_user_id", None)
    
    task = Task.query.filter_by(id=task_id).first()
    
    if not task:
        return jsonify({
            'success': False,
            'msg': 'task not found'
        }), 404
        
    if title:
        task.title = title
    if description:
        task.description = description
    if status:
        task.status = status
    if assigned_user_id:
        assigned_user = User.query.filter_by(id=assigned_user_id).first()
        if not assigned_user:
            return jsonify({
                'success': False,
                'msg': 'assigned user not found'
            }), 404
        task.assigned_user = assigned_user
        
    db_session.commit()

    return jsonify({
        'success': True,
        'task': task.to_json()
    })

# DELETE /tasks/<id>: Delete a task
@bp.delete("/<int:task_id>")
def delete_task(task_id):
    task = Task.query.filter_by(id=task_id).first()
    
    if not task:
        return jsonify({
            'success': False,
            'message': 'task not found'
        }), 404
        
    db_session.delete(task)
    db_session.commit()

    return jsonify({
        'success': True
    })