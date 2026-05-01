# ============================================
# MODELS.PY - Database connection and queries
# ============================================

import mysql.connector
from werkzeug.security import generate_password_hash, check_password_hash
from dotenv import load_dotenv
import os

load_dotenv()
# ============================================
# DATABASE CONNECTION
# ============================================

def get_db():
    # Connect to MySQL database
    connection = mysql.connector.connect(
        host='localhost',
        user='root',
        password=os.getenv('MYSQL_PASSWORD'),
        database='todo_app',
    )
    return connection

# ============================================
# USER FUNCTIONS
# ============================================

def create_user(name,email, password):
    # Hash the password before saving
    hashed_password = generate_password_hash(password)

    # Connect to database
    db = get_db()
    cursor = db.cursor()

    # Insert new user into users table
    cursor.execute(
        'INSERT INTO users (name, email, password) VALUES (%s, %s, %s)',
        (name, email, hashed_password)
    )

    # Save changes
    db.commit()
    db.close()

def get_user_by_email(email):
    # Find user by email
    db = get_db()
    cursor = db.cursor(dictionary=True)

    cursor.execute(
        'SELECT * FROM users WHERE email = %s',
        (email,)
    )

    # Return user or None if not found
    user = cursor.fetchone()
    db.close()
    return user

# ============================================
# TASK FUNCTIONS
# ============================================

def get_tasks(user_id):
    # Get all tasks for this user
    db = get_db()
    cursor = db.cursor(dictionary=True)

    cursor.execute(
        'SELECT * FROM tasks WHERE user_id = %s ORDER BY created_at DESC',
        (user_id,)
    )

    tasks = cursor.fetchall()
    db.close()
    return tasks


def create_task(user_id, title, description):
    # Create new task
    db = get_db()
    cursor = db.cursor()

    cursor.execute(
        'INSERT INTO tasks (user_id, title, description) VALUES (%s, %s, %s)',
        (user_id, title, description)
    )

    db.commit()
    db.close()

def update_task(task_id, title, description):
    # Update existing task
    db = get_db()
    cursor = db.cursor()

    cursor.execute(
        'UPDATE tasks SET title = %s, description = %s WHERE id = %s',
        (title, description, task_id)
    )

    db.commit()
    db.close()

def toggle_task(task_id):
    # Flip completed status 0→1 or 1→0
    db = get_db()
    cursor = db.cursor()

    cursor.execute(
        'UPDATE tasks SET completed = 1 - completed WHERE id = %s',
        (task_id,)
    )

    db.commit()
    db.close()

def delete_task(task_id):
    # Delete task from database
    db = get_db()
    cursor = db.cursor()

    cursor.execute(
        'DELETE FROM tasks WHERE id = %s',
        (task_id,)
    )

    db.commit()
    db.close()
