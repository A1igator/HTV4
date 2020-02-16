from flask import Flask, request
from flask_cors import CORS, cross_origin
import googlemaps
from datetime import datetime
from operator import itemgetter
import json
import requests

client = googlemaps.Client(key="AIzaSyDlJuLdAreKv4vCNH0vwGxarXY3e4F_e-I")


#Get places near to location, then return one with top review
#Expects string in the form "lat,long"
def getPlace(event, location, radius):
    cat = event["category"]
    places = client.places(cat.replace('_',' '), type = cat, location=location, radius = radius)["results"]
    places = sorted(places, key = itemgetter("rating"), reverse=True)
    if(len(places) >= 1):
        return places[0]
    else:
        getPlace(event, location, radius + 2000)

#Returns tuple containing waypoints data and their respective place IDs and durations


def generateWaypoints(data):
    wp = []
    placeID = []
    dur = []
    name = []
    category = []
    data = json.loads(str(data))
    i = 0
    location = str(data["user"]["location"]["lat"]) + \
        "," + str(data["user"]["location"]["lng"])
    for event in data["events"]:
        address = getPlace(event, location, 10000)
        if(address == None):
            continue
        location = str(address["geometry"]["location"]["lat"]) + \
            "," + str(address["geometry"]["location"]["lng"])
        print(event)
        duration = event["timeSpent"]

        name.append(event["name"])
        category.append(event["category"])
        dur.append(duration)
        wp.append(location)
        placeID.append(address["place_id"])

    return (wp, placeID, dur, name, category, location)


#Expects initial location, and a tuple containing waypoint placeid and duration
def generateDirections(location, waypoints):
    dir = client.directions(location, location, waypoints = waypoints[0], optimize_waypoints = True)
    #We can POST the directions to the client from here and use "waypoint_order"
    #To organize the time table.

    #Waypoint Order, PlaceId, Duration, Names, Category:
    return [dir[0]["waypoint_order"], waypoints[1], waypoints[2], waypoints[3], waypoints[4]]


#wp_data is a nested tuple containing (waypoint, waypoint order), placeID.
def buildTT(wp_data):
    ordered_wp = []
    for i in range(len(wp_data[0])):
        idx = wp_data[0][i]
        #Place ID, Duration, Name, Category:
        ordered_wp.append([wp_data[1][idx], wp_data[2][idx], wp_data[3][idx], wp_data[4][idx]])
    return ordered_wp

app = Flask(__name__)
CORS(app)

@app.route('/postTT', methods=['POST'])
def parse_data():
    data = request.get_json()
    data = json.dumps(data)
    wp = generateWaypoints(data)
    direc = generateDirections(wp[5], wp)
    timetable = buildTT(direc)
    response = json.dumps({"response": timetable})
    print(response)
    return response


