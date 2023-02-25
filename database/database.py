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
    dreamTitle = "Dream " + str(len(dreams_dict))
    
    dreams_dict[dreamTitle] = {"Text": text, "Images": imageURL, "Date": date}
    
    email = email[:-4]
    db.child("Users").child(email).update({"Dreams":dreams_dict})

    if(dreams_dict["Skip"] is not None):
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


name = input("What is your name? ")
email = input("Enter email: ")
password = input("Enter password: ")
print(create_user_database(name, email, password, db))

if(validate_user(email, password,db)):
    url = input("enter image url: ")
    text = input("enter string of text: ")
    update_user_database(email, url, text,db)
'''