#!/usr/bin/env python3 

# Importing the necessary modules 
import os 
import jwt 
from flask import jsonify, request, Blueprint

# Creating the dashboard route blueprint 
dashboard = Blueprint("dashboard", __name__) 

# Creating the route for the dashboard 
@dashboard.route("/", methods=["POST"])
def dashboardPage(): 
    pass 