from flask import Flask, render_template

app = Flask(__name__)

# Home page - show login
@app.route('/')
def home():
    return render_template('login.html')

# Register page - show register form
@app.route('/register')
def register():
    return render_template('register.html')

# Tasks page - show tasks (temporary, no real data yet)
@app.route('/tasks')
def tasks():
    return render_template('tasks.html',
                           total_tasks=0,
                           pending_tasks=0,
                           completed_tasks=0,
                           task=[],
                           current_user={'name': 'Test User'}
                           )

if __name__ == '__main__':
    app.run(debug=True)