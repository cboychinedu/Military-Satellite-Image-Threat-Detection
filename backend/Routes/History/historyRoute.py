#!/usr/bin/env python3 

# Importing the necessary modules 
import os 
import jwt 
from flask import jsonify, request, Blueprint 

# Creating the history route blueprint 
history = Blueprint("history", __name__)

# Creating the route for the history 
@history.route("/", methods=["POST"])
def historyPage(): 
    pass 