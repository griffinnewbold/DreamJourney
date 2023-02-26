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
    if(retrieve_user_data("Name", email, db) is not None):
        return False
    
    data = {}

    dream_dict = {"Skip" : {"Text": "defaultText", "Images": "defaultImage", "Date": "defaultDate"}}

    data["Name"] = name
    data["Password"] = password
    data["Dreams"] = dream_dict

    email_modi = email[:-4]
    db.child("Users").child(email_modi).set(data)
    subject = "Welcome to the DreamJourney Beta, " + name
    
    email_list = [email]
    e.send_emails(email_list,subject)
    return True

def retrieve_user_data(key, email,db):
    email = email[:-4]
    user = db.child("Users").child(email).get()
    if(user.each() is None):
        return None
    for element in user.each():
        if(element.key() == key):
            return element.val()
    return None

def update_user_database(email, imageURL, text, date, db):
    dreams_dict = retrieve_user_data("Dreams", email, db)
    is_skip = False
    for key in reversed(dreams_dict.keys()):
        if(str(key) == str("Skip")):
            is_skip = True
            break
    
    email = email[:-4]

    dreamTitle = ""
    if(is_skip):
        dreamTitle = "Dream 01"
    elif(len(dreams_dict)+1 < 10):
        dreamTitle = "Dream 0" + str(len(dreams_dict)+1)
    else:    
        dreamTitle = "Dream " + str(len(dreams_dict)+1)
    
    dreams_dict[dreamTitle] = {"Text": text, "Images": imageURL, "Date": date}
    db.child("Users").child(email).update({"Dreams":dreams_dict})
    if(is_skip):
        db.child("Users").child(email).child("Dreams").child("Skip").remove()

    



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
db = firebase_config_setup()
email = "gabrielguerratrigo20@gmail.com"
imageURLs = ['https://cdn.midjourney.com/cdd88b1a-36d4-4ef8-beec-612e401cbcdb/grid_0.png', 
             'https://cdn.midjourney.com/93cf6260-6a5c-4464-a071-5b318e155df3/grid_0.png', 
             'https://cdn.midjourney.com/1499b8ff-832a-4272-b21a-af33f0a84b7c/grid_0.png']

text = "I dreamt that I was a bird, but while I was a bird the apocalypse began and before I  "
text += "knew it the lushful world I had known had turned into a fiery inferno."

date = "02/21/2023"

update_user_database(email, imageURLs, text, date, db)
'''