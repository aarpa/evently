from flask import Flask, render_template, request, flash, redirect, session, jsonify, abort
from flask_debugtoolbar import DebugToolbarExtension
from model import db, connect_to_db, User, Event, RSVP_Type
from datetime import datetime

app = Flask(__name__)
app.secret_key = 'something&super&duper&secretive'


# Standalone function to convert query result into dict
def as_dict(row):
       return {c.name: getattr(row, c.name) for c in row.__table__.columns}

# API routes and responses
# ------------------------------------------------------------------- #

@app.route('/api/users')
def get_all_users():
    """Return all users in a JSON format."""

    users = User.query.all()  # list of objs

    users_list = []

    for user in users:
        users_list.append(as_dict(user))

    return {'usersList': users_list}

# ------------------------------------------------------------------- #

@app.route('/api/users/<int:user_id>')
def get_user_profile(user_id):
    """Return a specific user's data in a JSON format."""

    user = User.query.get(user_id)

    if user:
        return as_dict(user)
    else:
        abort(404)

# ------------------------------------------------------------------- #

@app.route('/api/users', methods=['POST'])
def create_user():
    """Add a new user into database."""
    
    # POST reqs have a body, so extract out the parsed JSON data
    # Don't use HTML form requests --> request.form.args()
    req_body = request.get_json()

    # Note: ** is used to "spread" an object into keyword arguments, where (key=argument name), and (value=argument value)
    user = User(**req_body)

    db.session.add(user)
    db.session.commit()

    return {}

# ------------------------------------------------------------------- #
@app.route('/api/users/<int:user_id>/hosted-events')
def get_user_hosted_events(user_id):
    """Return events hosted by a user in a JSON format."""

    user = User.query.get(user_id)

    events = user.events    # list of objs

    hosted_events = []

    for event in events:
        hosted_events.append(as_dict(event))

    return {'hostedEventsList': hosted_events}


# ------------------------------------------------------------------- #

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

# ------------------------------------------------------------------- #

@app.route('/api/events')
def get_all_events():
    """Return list of events in a JSON format."""

    events = Event.query.all()  # list of objs

    events_list = []

    for event in events:
        events_list.append(as_dict(event))

    return {'eventsList': events_list}

# ------------------------------------------------------------------- #

@app.route('/api/events/<int:event_id>')
def get_event(event_id):
    """Return a specific event in JSON format."""

    event = Event.query.get(event_id)

    if event:
        return as_dict(event)
    else:
        abort(404)

# ------------------------------------------------------------------- #

@app.route('/api/events', methods=['POST'])
def create_event():
    """Add a new event into database."""
    
    # POST reqs have a body, so extract out the parsed JSON data
    # Don't use HTML form requests --> request.form.args()
    req_body = request.get_json()

    datetime_format = "%m/%d/%Y %H:%M"

    req_body['start_on'] = datetime.strptime(req_body['start_on'], datetime_format)
    req_body['end_on'] = datetime.strptime(req_body['end_on'], datetime_format)
    req_body['created_on'] = datetime.strptime(req_body['created_on'], datetime_format)


    # Note: ** is used to "spread" an object into keyword arguments, where (key=argument name), and (value=argument value)
    event = Event(**req_body)

    db.session.add(event)
    db.session.commit()

    return {}

# ------------------------------------------------------------------- #

@app.route('/api/events/<int:event_id>', methods=['PUT'])
def update_event(event_id):
    """Update a specific event using JSON data in request."""

    event = Event.query.get(event_id)
    event_dict = as_dict(event)

    req_body = request.get_json()
    req_body_keys = list(req_body.keys())

    for item in req_body_keys:
        event_dict[item] = req_body[item]

    for key in event_dict:
        # event.key = event_dict[key]
        setattr(event, key, event_dict[key])

    db.session.commit()

    return {}

# ------------------------------------------------------------------- #

@app.route('/api/events/<int:event_id>', methods=['DELETE'])
def delete_event(event_id):
    """Delete an event from the DB."""

    del_event = Event.query.get(event_id)

    if del_event:
        db.session.delete(del_event)
        db.session.commit()
    else:
        abort(404)

    return {}

# ------------------------------------------------------------------- #

@app.route('/api/events/<int:event_id>/guests')
def get_event_guests(event_id):
    """Return users who are invited to an event in a JSON format."""

    event = Event.query.get(event_id)

    invites = event.invites

    guest_list = []

    for invite in invites:
        invite_dict = as_dict(invite)

        user = User.query.get(invite_dict['user_id'])
        user_dict = as_dict(user)

        guest_list.append(user_dict)

    return {'guestList': guest_list}

# ------------------------------------------------------------------- #

@app.route('/api/rsvp-types')
def get_rsvp_types():
    """Return types of rsvp in a JSON format."""

    rsvp_types = RSVP_Type.query.filter_by(is_active=True).all()

    rsvp_types_list = []

    for obj in rsvp_types:
        rsvp_types_list.append(as_dict(obj))

    return {'rsvpTypesList': rsvp_types_list}

# ------------------------------------------------------------------- #
# Helper functions

if __name__ == "__main__":
  app.debug = True

  connect_to_db(app)

  DebugToolbarExtension(app)

  app.run(host="0.0.0.0")