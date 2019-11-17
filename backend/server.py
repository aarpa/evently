from flask import Flask, render_template, request, flash, redirect, session, jsonify, abort
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
def get_user_list():
    """Return userlist data in a JSON format."""

    users = User.query.all()  # returns list of obj from DB

    users_list = []

    for user in users:
        users_list.append(as_dict(user))

    return {'usersList': users_list}

# ---------------------------------------------------------------------- #

@app.route('/api/users/<int:user_id>')
def get_user_profile(user_id):
    """Return user data in a JSON format."""

    user = User.query.filter_by(user_id=user_id).first()

    if user:
        return as_dict(user)
    else:
        abort(404)

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