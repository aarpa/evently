from flask import Flask, render_template, request, flash, redirect, session, jsonify, abort
from flask_debugtoolbar import DebugToolbarExtension
from model import db, connect_to_db, User, Event
import json

app = Flask(__name__)
app.secret_key = 'something&super&duper&secretive'


# Standalone function to convert query result into dict
def as_dict(row):
       return {c.name: getattr(row, c.name) for c in row.__table__.columns}

###################################################
@app.route('/api/users')
def get_user_list():
    """Return userlist data in a JSON format."""

    users = User.query.all()  # list of objs

    users_list = []

    for user in users:
        users_list.append(as_dict(user))

    return {'usersList': users_list}

# ---------------------------------------------------------------------- #

@app.route('/api/users/<int:user_id>')
def get_user_profile(user_id):
    """Return user data in a JSON format."""

    user = User.query.get(user_id)

    if user:
        return as_dict(user)
    else:
        abort(404)

# ---------------------------------------------------------------------- #

@app.route('/api/users/<int:user_id>/hosted-events')
def get_user_hosted_events(user_id):
    """Return events hosted by a user in a JSON format."""

    user = User.query.get(user_id)

    events = user.events    # list of objs

    hosted_events = []

    for event in events:
        hosted_events.append(as_dict(event))

    return {'hostedEventsList': hosted_events}


# ---------------------------------------------------------------------- #

@app.route('/api/users/<int:user_id>/invites')
def get_user_invites(user_id):
    """Return events to which a user is invited in a JSON format."""

    user = User.query.get(user_id)

    invites = user.invites    # list of objs

    invites_list = []

    for invite in invites:
        invite_dict = as_dict(invite)
        
        # query in and add event details as another property of invite dict
        event = Event.query.get(invite_dict['event_id'])
        event_dict = as_dict(event)
        invite_dict['event'] = event_dict

        invites_list.append(invite_dict)

    return {'invitesList': invites_list}

# ---------------------------------------------------------------------- #


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