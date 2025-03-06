from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from .models import Task, User
from .db import db_session

bp = Blueprint('task', __name__, url_prefix='/tasks')

# POST /tasks: Create a new task
@bp.post("/")
@jwt_required()
def create_task():
    user_email = get_jwt_identity()
    
    user = User.query.filter_by(email=user_email).first()
    
    title = request.form.get("title", None)
    description = request.form.get("description", None)

    if not title:
        return jsonify({
            'msg': 'bad request'
        }), 400
    
    task = Task(title, description)
    task.creator = user

    db_session.add(task)
    db_session.commit()

    return jsonify({
        'task': {
            'id': task.id,
            "title": task.title,
            "description": task.description,
            'status': task.status,
            'creator_id': task.creator_id
        }
    })

# GET /tasks: List all tasks with optional filters 
# (status, assigned_user)
@bp.get("/")
@jwt_required()
def list_tasks():
    user_email = get_jwt_identity()
    
    user = User.query.filter_by(email=user_email).first()
    
    tasks = Task.query.filter_by(creator_id=user.id)

    return jsonify({
        'tasks': [task.to_json() for task in tasks]
    })

# GET /tasks/<id>: Retrieve a specific task by ID
@bp.get("/<int:task_id>")
def get_task(task_id):
    return f"get task {task_id}"

# PUT /tasks/<id>: Update a task's status or assigned user
@bp.put("/<int:task_id>")
def update_task(task_id):
    return f"update task {task_id}"

# DELETE /tasks/<id>: Delete a task
@bp.delete("/<int:task_id>")
def delete_task(task_id):
    return f"delete task {task_id}"