import pyrebase
import database.email_logic as e
import sys
sys.path.insert(1, "./")

def firebase_config_setup():
    config = {
      "apiKey": "AIzaSyCaL00piOMooOgJxUt9QOZ9SImZzw9Fti0",
      "authDomain": "dreamjourney-9e24f.firebaseapp.com",
      "databaseURL": "https://dreamjourney-9e24f-default-rtdb.firebaseio.com",
      "projectId": "dreamjourney-9e24f",
      "storageBucket": "dreamjourney-9e24f.appspot.com",
      "messagingSenderId": "362150677267",
      "appId": "1:362150677267:web:8172786302155b50ba28e6",
      "measurementId": "G-X26MTWKSQX"    
    }

    firebase = pyrebase.initialize_app(config)
    db = firebase.database()
    return db

def create_user_database(name, email, password,db):
    data = {}
    dream_strings = {"Strings": 0}
    dream_images = {"Images": 0}
    data["Name"] = name
    data["Password"] = password
    data["DreamImageArray"] = dream_images
    data["DreamStringArray"]= dream_strings
    
    email_modi = email[:-4]
    db.child("Users").child(email_modi).set(data)
    subject = "Welcome to the DreamJourney Beta, " + name
    
    email_list = [email]
    e.send_emails(email_list,subject)

def retrieve_user_data(key, email,db):
    email = email[:-4]
    user = db.child("Users").child(email).get()
    if(user.each() is None):
        return None
    for element in user.each():
        if(element.key() == key):
            return element.val()
    return None

def update_user_database(email, imageURL, text,db):
    dream_strings = retrieve_user_data("DreamStringArray", email,db)
    dream_images  = retrieve_user_data("DreamImageArray", email,db)
    

    dream_strings["Strings"] = dream_strings["Strings"]+1
    dream_images["Images"]  = dream_images["Images"] +1
    
    iCount =  dream_strings["Strings"] 
    
    dreamTitle = "Dream " + str(iCount)
    
    dream_strings[dreamTitle] = text
    dream_images[dreamTitle] = imageURL
    
    
    db.child("Users").child(email).update({"DreamImageArray":dream_images})
    db.child("Users").child(email).update({"DreamStringArray":dream_strings})


def validate_user(email, password, db):
    password_retrieve = retrieve_user_data("Password", email, db)
    if(password_retrieve is not None and password_retrieve == password):
        return True
    return False

#------------------------------------------------------------------------------
# Remove Data

#Delete 1 Value
#db.child("Users").child("User1").child("Password").remove()

# Delete whole Node
#db.child("Users").child("User1").remove()

#------------------------------------------------------------------------------
'''
name = input("What is your name? ")
email = input("What is your email? ")
password = input("What is your password? ")
create_user_database(name, email, password)
'''
