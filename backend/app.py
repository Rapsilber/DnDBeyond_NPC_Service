import re
from re import I
from flask import Flask, request, jsonify, json
from flask_cors import CORS, cross_origin
import requests
import json
import sqlite3
import os
import ast

from dotenv import load_dotenv
load_dotenv()

app = Flask(__name__)
CORS(app)


#Gets the current userID based on enviroment variables. Accepts user cookie and returns ID
def get_userId(token_headers: dict):
    conn = sqlite3.connect("database.db")
    cursor = conn.cursor()
    cookie = token_headers["cookie"]
    c = cookie.split(';')
    for item in c:
        if "UserID" in item:
            items = item.split('&')
            itemnum = items[0]
            itemuser = items[1][9:]
            ids = re.findall(r'\d+', itemnum)
            cookieid=int(ids[0])
        
    #Check if table exists first, then get user data
    r = cursor.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='users';").fetchone()
    if r:
        result = cursor.execute("SELECT userID FROM users WHERE cookie = '{}';".format(cookie)).fetchone()
        try:
            userid = result[0]
        except TypeError:
            userid = cookieid
    #If table doesn't exist, then get data from cookie and create table with that data
    else:
        cursor.execute("CREATE TABLE IF NOT EXISTS users(userID INT, username VARCHAR, cookie VARCHAR);")
        cursor.execute(f"INSERT INTO users(userID, username, cookie) VALUES({cookieid}, '{itemuser}', '{str(cookie)}');")
        userid = cookieid
    conn.close()
    return userid

#Gets user token based on token headers. This token must be called for every API call due to the expiration of the token after 15 minutes
def get_token():
    response = requests.post(TOKEN_API, cookies=token_headers)
    if response.status_code == 200:
        token = response.json()
        return token
    else:
        return None

#Gets character data from an API call. Accepts API
def get_data(api: str, payload: dict=None):
    token = get_token()
    if token:
        headers = {"Authorization": "Bearer {}".format(token["token"])}
        #If payload is accepted, do a POST request
        if payload:
            response = requests.post(api, headers=headers, json=payload)
        #Otherwise, it's a GET request
        else:
            response = requests.get(api, headers=headers)
        #If data was successfully recieved
        if response.status_code == 200:
                data = response.json()
                return data
        #Otherwise, return the failed status code
        else:
            return str(response)
    else:
        return "Token not valid"

#Helper function to get character data from the SCDS
def get_characters(charid: int):
    payload = {"characterIds": [ charid ]}
    data = get_data(SCDS, payload=payload)
    return data

#Flask Init Function to verify connection to server
@app.route('/')
def m():
    return "Connected to Server"

@app.route('/add', methods=['POST'])
def add_char_to_db():
    payload = request.get_json()
    conn = sqlite3.connect("database.db")
    cursor = conn.cursor()
    #will need some error checking to check validity of characters
    cursor.execute("INSERT INTO characters (charID, ownerID) VALUES ({}, {});".format(payload['id'], userId))
    conn.commit()
    return "true"

#Function to get Characters from local DB. Returns dictionary of characters
@app.route('/characters', methods=['GET'])
def get_chars_from_db():
    api = API + 'characters/list'
    token = get_token()
    if token:
        headers = {"Authorization": "Bearer {}".format(token["token"])}
        #API Call to get user ID
        response = requests.get(api, headers=headers, params={'userId': userId})

    conn = sqlite3.connect("database.db")
    cursor = conn.cursor()
    #Getting list of characters from database
    rows = cursor.execute(f"SELECT charID from characters WHERE ownerID = {userId};").fetchall()
    
    chars = {"characters": []}

    for respID in response.json()["data"]["characters"]:
        for char in rows:
            if char[0] == respID["id"]:
                chars["characters"].append(respID)
    return chars

#API Route to get list of classes
@app.route("/classes", methods=['GET'])
def get_classes():
    api = API + 'game-data/classes'
    data = get_data(api)
    return data

#API Route to get list of races
@app.route("/races", methods=['GET'])
def get_races():
    api = API + 'game-data/official-races'
    data = get_data(api)
    return data

#API Route to get randomly built character. Returns random character ID
@app.route("/random", methods=['POST'])
def get_random():
    min_payload = request.get_json()
    ap = API + 'builder/random-build'
    data = get_data(ap, payload=min_payload)
    return data

#API Route to get character data from the Character API. Returns Dictionary of Values
@app.route("/char", methods=['POST'])
def get_chars():
    id = request.get_json()
    charid = id['response']
    #Converting String ID to Integer
    try:
        int(charid)
    except Exception as e:
        return str(e)
    ap = API + 'character/' + str(charid)
    data = get_data(ap)
    return data

#API Route to get character data from the SCDS. Returns Dictionary of Values
@app.route("/scds", methods=['POST'])
def get_scds():
    id = request.get_json()
    charid = id['response']
    #Converting String ID to Integer
    try:
        charid = int(charid)
    except Exception as e:
        return str(e)
    data = get_characters(charid)
    return data


if __name__ == "__main__":
    try:
        #setting user variables
        TOKEN_API = os.environ['TOKEN_API']
        API = os.environ['API']
        SCDS = os.environ['SCDS']
        #setting token headers that will be used
        token_headers = ast.literal_eval(os.environ['token_headers'])
        userId = get_userId(token_headers)
    except KeyError:
        print("Unable to find .env file. Please create one!")
    app.run(debug=True)