from flask import Flask, request

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

# POST /tasks: Create a new task
@app.post("/tasks")
def create_task():
    title = request.form["title"]
    description = request.form["description"]

    return {
        "title": title,
        "description": description
    }

# GET /tasks: List all tasks with optional filters 
# (status, assigned_user)
@app.get("/tasks")
def list_tasks():
    return "tasks"

# GET /tasks/<id>: Retrieve a specific task by ID
@app.get("/tasks/<int:task_id>")
def get_task(task_id):
    return f"get task {task_id}"

# PUT /tasks/<id>: Update a task's status or assigned user
@app.put("/tasks/<int:task_id>")
def update_task(task_id):
    return f"update task {task_id}"

# DELETE /tasks/<id>: Delete a task
@app.delete("/tasks/<int:task_id>")
def delete_task(task_id):
    return f"delete task {task_id}"