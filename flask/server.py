import json
from flask import Flask, request, render_template

app = Flask(__name__)

@app.route("/login", methods=["POST"])
def login():
    email = request.json["email"]
    password = request.json["password"]

    data = {"email": email, 
        "password": password}

    return json.dumps(data)

