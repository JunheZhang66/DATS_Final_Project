#!flask/bin/python
import json
from flask import jsonify
from flask import Flask
import pandas as pd
from flask import Flask, render_template, jsonify
app = Flask(__name__)
@app.route('/')
def index():
    # function to return the main html page
    return render_template('index.html')
@app.route('/data')
def data():
    # function to respond scatter data request
    data=pd.read_csv('data/scatter_line_data.csv')
    data = json.dumps(json.loads(data.to_json(orient='records')), indent=2)
    return jsonify(data)
if __name__ == '__main__':
    app.run()