import json
from flask import Flask, request, render_template
import sys
sys.path.insert(1, "./")
import database.database as dbs

db = dbs.firebase_config_setup()


app = Flask(__name__)

@app.route("/login", methods=["POST"])
def login():
    email = request.json["email"]
    password = request.json["password"]

    

    valid_login = dbs.validate_user(email, password,db)
    

    if(valid_login):
        data = {"Dreams": query(email)}
    else:
        data = {"Dreams": None}

    return json.dumps(data)

@app.route("/create", methods=["POST"])
def create():
    name = request.json["name"]
    email = request.json["email"]
    password = request.json["password"]

    ## YOUR CODE ##

    success_create = dbs.create_user_database(name, email, password, db)
    data = {"success": success_create}
    

    return json.dumps(data)

@app.route("/query", methods=["POST"])
def query(email):
    return dbs.retrieve_user_data("Dreams", email,db)
    


@app.after_request
def after_request(response):
    white_origin = ['http://localhost:3000']
    if request.headers['Origin'] in white_origin:
        response.headers['Access-Control-Allow-Origin'] = request.headers['Origin'] 
        response.headers['Access-Control-Allow-Methods'] = 'PUT,GET,POST,DELETE'
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type,Authorization'
    return response

if __name__ == "__main__":
    app.run(debug=True, port=8000)
