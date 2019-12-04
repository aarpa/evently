from flask import Flask, render_template, request, flash, redirect, session, jsonify, abort
from flask_debugtoolbar import DebugToolbarExtension
from model import db, connect_to_db, User, Event, RSVP_Type, Invitation
from datetime import datetime

app = Flask(__name__)
app.secret_key = 'something&super&duper&secretive'


# Standalone function to convert query result into dict
def as_dict(row):
       return {c.name: getattr(row, c.name) for c in row.__table__.columns}

# API routes and responses
# ------------------------------------------------------------------- #

@app.route('/login', methods=['POST'])
def login():
    """Check login credentials against users table database."""

    email = request.form.get('email')
    password = request.form.get('password')

    user = User.query.filter(User.email == email, User.password == password).first()
    
    if user != None:
        return jsonify(user.user_id)
    else:
        abort(404)

# ------------------------------------------------------------------- #

@app.route('/users')
def get_all_users():
    """Return all users in a JSON format."""

    users = User.query.all()  # list of objs

    users_list = []

    for user in users:
        users_list.append(as_dict(user))

    return {'users': users_list}

# ------------------------------------------------------------------- #

@app.route('/users/<int:user_id>')
def get_user(user_id):
    """Return a specific user's data in a JSON format."""

    user = User.query.get(user_id)

    if user:
        return as_dict(user)
    else:
        abort(404)

# ------------------------------------------------------------------- #

@app.route('/users', methods=['POST'])
def create_user():
    """Add a new user into database."""
    
    # POST reqs have a body, so extract out the parsed JSON data
    # req_body = request.get_json()
    req_body = {
        'name': request.form.get('name'),
        'phone': request.form.get('phone'),
        'dob': request.form.get('dob'),
        'email': request.form.get('email'),
        'password': request.form.get('password')
    }

    # Note: ** is used to "spread" an object into keyword arguments, where (key=argument name), and (value=argument value)
    user = User(**req_body)

    db.session.add(user)
    db.session.commit()

    # Need to refresh db.session to obtain the newly created event instance
    # Useful for extracting out the event id to redirect to another API
    db.session.refresh(user)

    return jsonify(user.user_id)

# ------------------------------------------------------------------- #

@app.route('/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    """Update a specific user using JSON data in request."""

    user = User.query.get(user_id)

    req_body = request.get_json()

    # Call instance method to update self by passing in the request body
    user.update(**req_body)

    db.session.commit()

    return as_dict(user)

# ------------------------------------------------------------------- #

@app.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    """Delete a user from the DB."""

    del_user = User.query.get(user_id)

    if del_user:
        db.session.delete(del_user)
        db.session.commit()
    else:
        abort(404)

    return {}

# ------------------------------------------------------------------- #
@app.route('/users/<int:user_id>/hosted-events')
def get_user_hosted_events(user_id):
    """Return events hosted by a user in a JSON format."""

    user = User.query.get(user_id)

    events = user.events    # list of objs

    hosted_events = []

    for event in events:
        hosted_events.append(as_dict(event))

    return jsonify(hosted_events)


# ------------------------------------------------------------------- #

@app.route('/users/<int:user_id>/invites')
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

    return jsonify(invites_list)

# ------------------------------------------------------------------- #

@app.route('/events')
def get_all_events():
    """Return list of events in a JSON format."""

    events = Event.query.all()  # list of objs

    events_list = []

    for event in events:
        events_list.append(as_dict(event))

    return jsonify(events_list)

# ------------------------------------------------------------------- #

@app.route('/events/<int:event_id>')
def get_event(event_id):
    """Return a specific event in JSON format."""

    event = Event.query.get(event_id)
    # if session['user_id'] == event.host:

    if event:
        return as_dict(event)
    else:
        print("this is the else block")
        abort(404)

# ------------------------------------------------------------------- #

@app.route('/events', methods=['POST'])
def create_event():
    """Add a new event into database."""
    
    # POST reqs have a body, so you can extract out the parsed JSON data
    # req_body = request.get_json()

    req_body = {
        'title': request.form.get('title'),
        'start_on': request.form.get('startTime'),
        'end_on': request.form.get('endTime')
    } 

    datetime_format = "%Y-%m-%dT%H:%M"

    req_body['start_on'] = datetime.strptime(req_body['start_on'], datetime_format)
    req_body['end_on'] = datetime.strptime(req_body['end_on'], datetime_format)
    req_body['created_on'] = datetime.now()
    req_body['host'] = session['user_id']


    # Note: ** is used to "spread" an object into keyword arguments, where (key=argument name), and (value=argument value)
    event = Event(**req_body)

    db.session.add(event)
    db.session.commit()

    # Need to refresh db.session to obtain the newly created event instance
    # Useful for extracting out the event id to redirect to another API
    db.session.refresh(event)

    return jsonify(event.event_id)

# ------------------------------------------------------------------- #

@app.route('/events/<int:event_id>', methods=['PUT'])
def update_event(event_id):
    """Update a specific event using JSON data in request."""

    event = Event.query.get(event_id)

    req_body = request.get_json()

    # Call instance method to update self by passing in the request body
    event.update(**req_body)

    db.session.commit()

    return as_dict(event)

# ------------------------------------------------------------------- #

@app.route('/events/<int:event_id>', methods=['DELETE'])
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

@app.route('/events/<int:event_id>/invites')
def get_event_invites(event_id):
    """Return list of users who are invited to an event in a JSON format."""

    event = Event.query.get(event_id)

    invites = event.invites

    invites_list = []

    for invite in invites:
        invite_dict = as_dict(invite)

        # query in and add user details as another property of invite_dict
        user = User.query.get(invite_dict['user_id'])
        user_dict = as_dict(user)
        invite_dict['user'] = user_dict

        invites_list.append(invite_dict)

    return {'users': invites_list}

# ------------------------------------------------------------------- #

@app.route('/events/<int:event_id>/to_invite')
def get_users_to_invite(event_id):
    """Return list of users are are NOT invited to an event in a JSON format."""

    # get list of all users
    # get set of users invited to this event
    # iterate over all users to check for inclusion in invited users list

    all_users = get_all_users()['users']
    invited_users = get_event_invites(event_id)['users']   
    
    # Lambda func = one-time use func to extract out id from userObj
    # map() = alternate way to transform each element in a for-loop iteration
    invited_user_ids = set(map(lambda userObj: userObj['user_id'], invited_users))

    guests_to_invite = []

    for userObj in all_users:
        if userObj['user_id'] not in invited_user_ids:
            guests_to_invite.append(userObj)

    return {'users': guests_to_invite}

# ------------------------------------------------------------------- #

@app.route('/events/<int:event_id>/invites', methods=['POST'])
def create_invite(event_id):
    """Add a new invite for an event into database."""
    
    json_req_body = request.get_json()

    # print(req_body)

    user_ids = json_req_body['userIds']

    # print(user_ids)

    for user_id in user_ids:
        req_body = {
            'user_id': user_id,
            'event_id': event_id
        }
        invite = Invitation(**req_body)
        db.session.add(invite)
    
    db.session.commit()

    return jsonify(event_id)

# ------------------------------------------------------------------- #

@app.route('/invites/<int:invite_id>', methods=['PUT'])
def update_invite(invite_id):
    """Update a specific invite using JSON data in request."""

    invite = Invitation.query.get(invite_id)

    req_body = request.get_json()

    # Call instance method to update self by passing in the request body
    invite.update(**req_body)

    db.session.commit()

    return as_dict(invite)

# ------------------------------------------------------------------- #

@app.route('/invites/<int:invite_id>', methods=['DELETE'])
def delete_invite(invite_id):
    """Delete an invite from the DB."""

    del_invite = Invitation.query.get(invite_id)

    if del_invite:
        db.session.delete(del_invite)
        db.session.commit()
    else:
        abort(404)

    return {}

# ------------------------------------------------------------------- #

@app.route('/rsvp-types')
def get_rsvp_types():
    """Return types of rsvp in a JSON format."""

    rsvp_types = RSVP_Type.query.filter_by(is_active=True).all()

    rsvp_types_list = []

    for obj in rsvp_types:
        rsvp_types_list.append(as_dict(obj))

    return jsonify(rsvp_types_list)

# ------------------------------------------------------------------- #

if __name__ == "__main__":
  app.debug = True

  connect_to_db(app)

  DebugToolbarExtension(app)

  app.run(host="0.0.0.0")