# ============================================
# APP.PY - Flask application and routes
# ============================================

from flask import Flask, render_template, request, redirect, session, jsonify
from models import create_user, get_user_by_email, get_tasks, create_task, update_task, toggle_task, delete_task
from werkzeug.security import check_password_hash
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Create Flask app
app = Flask(__name__)

# Secret key for sessions - reads from .env
app.secret_key = os.getenv('SECRET_KEY')

# ============================================
# AUTH ROUTES
# ============================================

# Home page - show login
@app.route('/')
def home():
    # If already logged in, go to tasks
    if 'user_id' in session:
        return redirect('/tasks')
    return render_template('login.html')

# Handle login form
@app.route('/login', methods=['POST'])
def login():
    # Get data from form
    email = request.form['email']
    password = request.form['password']

    # Find user in database
    user = get_user_by_email(email)

    # Check if user exists and password is correct
    if user and check_password_hash(user['password'], password):
        # Save user info in session
        session['user_id'] = user['id']
        session['user_name'] = user['name']
        return redirect('/tasks')
    else:
        # Wrong email or password
        return render_template('login.html',
            error = 'Invalid email or password')

# Show register page
@app.route('/register')
def register_page():
    return render_template('register.html')

# Handle register form
@app.route('/register', methods=['POST'])
def register():
    # Get data from form
    name = request.form['name']
    email = request.form['email']
    password = request.form['password']
    confirm_password = request.form['confirm_password']

    # Check passwords match
    if password != confirm_password:
        return render_template('register.html',
            error = 'Password do not match')
    
    # Check if email already exists
    existing_user = get_user_by_email(email)
    if existing_user:
        return render_template('register.html',
            error = 'Email already registered')
    
    # Create new user
    create_user(name, email, password)

    # Redirect to login with success message
    return render_template('login.html',
        success = 'Account created! Please login')

# Logout
@app.route('/logout')
def logout():
    # Clear session
    session.clear()
    return redirect('/')

# ============================================
# TASKS ROUTES
# ============================================

# Show tasks page
@app.route('/tasks')
def tasks():
    # If not logged in, redirect to login
    if 'user_id' not in session:
        return redirect('/')
    
    # Get all tasks for this user
    user_tasks = get_tasks(session['user_id'])

    # Count tasks
    total = len(user_tasks)
    completed = sum(1 for t in user_tasks if t['completed'] == 1)
    pending = total - completed

    return render_template('tasks.html',
        tasks = user_tasks,
        total_tasks = total,
        completed_tasks = completed,
        pending_tasks = pending,
        current_user = {'name': session['user_name']}
    )

# Add or edit task
@app.route('/add-task', methods=['POST'])
def add_task():
    # If not logged in, redirect
    if 'user_id' not in session:
        return redirect('/')
    
    # Get form data
    title = request.form['title']
    description = request.form['description']
    action = request.form['action']
    task_id = request.form['task_id']

    if action == 'edit' and task_id:
        # Update existing task
        update_task(task_id, title, description)
    else:
        # Create new task
        create_task(session['user_id'], title, description)

    return redirect('/tasks')

# Toggle task complete/incomplete
@app.route('/toggle-task/<int:task_id>', methods=['POST'])
def toggle(task_id):
    # If not logged in, return error
    if 'user_id' not in session:
        return jsonify({'error': 'Not logged in'}), 401
    
    toggle_task(task_id)
    return jsonify({'success': True})

# Delete task
@app.route('/delete-task/<int:task_id>', methods=['POST'])
def delete(task_id):
    # If not logged in, return error
    if 'user_id' not in session:
        return jsonify({'error': 'Not logged in'}), 401
    
    delete_task(task_id)
    return jsonify({'success': True})

# ============================================
# RUN APP
# ============================================

if __name__ == '__main__':
    app.run(debug=True)