from jinja2 import StrictUndefined

from flask import Flask, render_template, request, flash, redirect, session, jsonify
from flask_debugtoolbar import DebugToolbarExtension

from model import db, connect_to_db  # import the other classes defined in model.py

app = Flask(__name__)
app.secret_key = 'something&super&duper&secretive'

app.jinja_env.undefined = StrictUndefined


###################################################
@app.route('/')
def index():
    """Display landing page."""

    return render_template("index.html")


@app.route('/login')
def login():
    """Display login page."""

    return render_template("login.html")


@app.route('/signup')
def signup():
    """Display sign up page."""

    render_template("signup.html")

###################################################
# Helper functions

if __name__ == "__main__":
    app.debug = True

    connect_to_db(app)

    DebugToolbarExtension(app)

    app.run(host="0.0.0.0")