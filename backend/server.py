from flask import Flask, render_template, request, flash, redirect, session, jsonify
from flask_debugtoolbar import DebugToolbarExtension
from model import db, connect_to_db, User
import json

app = Flask(__name__)
app.secret_key = 'something&super&duper&secretive'


# Standalone function to convert query result into dict
def as_dict(row):
       return {c.name: getattr(row, c.name) for c in row.__table__.columns}

###################################################
@app.route('/api/users')
def index():
    """Display userlist page."""

    users = User.query.all()  # returns list of obj from DB

    users_list = []

    for user in users:
        users_list.append(as_dict(user))

    return {'usersList': users_list}


# @app.route('/test')
# def test():
#     users = User.query.all()

#     return render_template("test.html", users=users)


###################################################
# Helper functions

if __name__ == "__main__":
  app.debug = True

  connect_to_db(app)

  DebugToolbarExtension(app)

  app.run(host="0.0.0.0")