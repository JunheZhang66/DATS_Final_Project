from flask import Flask
app = Flask(__name__)

@app.route('/')
def hellp():
    return 'Hello world'