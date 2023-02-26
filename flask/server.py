import json
import requests
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
    data = {}
    data["validate"] = valid_login

    if(valid_login):
        data["dreams"] = query(email)

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

@app.route("/parseDate", methods=["POST"])
def parseDate(date):
    year = date[0:4]
    month = date[5:7]
    day = date[8:10]
    return month + "/" + day + "/" + year  

@app.route("/add", methods=["POST"])
def add():
    """ website 
    """
    date = parseDate(request.json["date"])
    email = request.json["email"]
    text = request.json["text"]

    jsons = {
        "key": "nR6I2mbVdrc3nxe6A8TDjdGkE3kxsoGCDVzySW9VTpJlvcX8mkAxoGuK7xG5",
        "model_id": "arcane-diffusion",
        "prompt": text,
        "negative_prompt": "",
        "width": "512",
        "height": "512",
        "samples": "3",
        "safety_checker": "no",
        "num_inference_steps": "30",
        "enhance_prompt": "no",
        "guidance_scale": 7.5,
    }
    response = requests.post("https://stablediffusionapi.com/api/v4/dreambooth", json=jsons)
    response = dict(json.loads(response.content.decode('utf-8')))
    images = [link.replace("///", "/") for link in response["output"]]

    dbs.update_user_database(email, images, text, date, db)
    reply = {"images": images}
    
    return json.dumps(reply)


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
