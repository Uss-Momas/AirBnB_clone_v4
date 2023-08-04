#!/usr/bin/python3
"""
Script to copy web_flask to web_dynamic
"""
from fabric.api import local


def do_copy():
    """copies data from one dir to another"""
    # Creating web_dynamic dir if not exists
    local("mkdir -p web_dynamic")
    local("mkdir -p web_dynamic/static")
    local("mkdir - p web_dynamic/templates")
    local("cp -r web_flask/static/* web_dynamic/static")
    local("cp -r web_flask/templates/100-hbnb.html web_dynamic/templates")
    local("cp -r web_flask/__init__.py web_dynamic/")
    local("cp web_flask/100-hbnb.py web_dynamic/")
    one = "web_dynamic/templates/100-hbnb.html"
    two = "web_dynamic/templates/0-hbnb.html"
    local("mv {} {}".format(one, two))
    local("mv web_dynamic/100-hbnb.py web_dynamic/0-hbnb.py")
