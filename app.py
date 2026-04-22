from flask import Flask, render_template

app = Flask(__name__)

# When someone visits the home page, show login
@app.route('/')
def home():
    return render_template('login.html')

# Run the app
if __name__ == '__main__':
    app.run(debug=True)