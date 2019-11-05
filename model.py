from flask import Flask
from flask_sqlalchemy import SQLAlchemy

# Instantiate a SQLAlchemy obj to create db.Model classess.
db = SQLAlchemy()


###################################################
# Model definitions

class User(db.Model):
    """Create data for a user."""

    __tablename__ = "users"

    user_id = db.Column(db.Integer,
                        autoincrement=True,
                        primary_key=True)
    name = db.Column(db.String(100),
                     nullable=False,
                     unique=True)
    email = db.Column(db.String(100),
                      nullable=False,
                      unique=True)
    password = db.Column(db.String(50),
                      nullable=False,
                      unique=True)
    age = db.Column(db.Integer,
                    nullable=False,
                    unique=True)
    phone = db.Column(db.String(20),
                      nullable=False,
                      unique=True)


    def __repr__(self):
        """Human readable representation of user object when printed."""

        return f"""< User: user_id = {self.user_id}, 
                           name = {self.name} >"""


    ### Define instance methods here ###
    

class Event(db.Model):
    """Create data for an event."""

    __tablename__ = "events"

    event_id = db.Column(db.Integer,
                         autoincrement=True,
                         primary_key=True)
    host = db.Column(db.String(100),
                     nullable=False,
                     unique=False)
    title = db.Column(db.String(100),
                      nullable=False,
                      unique=True)
    start = db.Column(db.DateTime,
                      nullable=False,
                      unique=False)
    end = db.Column(db.DateTime,
                    nullable=False,
                    unique=False)
    location = db.Column(db.String(200),
                         nullable=False,
                         unique=False)
    category = db.Column(db.String(50),
                         nullable=False,
                         unique=False)


    def __repr__(self):
        """Human readable representation of event object when printed."""

        return f"""< Event: event_id = {self.event_id},
                            title = {self.title},
                            host = {self.host},
                            category = {self.category} >"""


    ### Define instance methods here ###


class Invitation(db.Model):
    """Create data for a distinct invitation."""

    __tablename__ = "invitations"

    invite_id = db.Column(db.Integer,
                          autoincrement=True,
                          primary_key=True)
    user_id = db.Column(db.Integer,
                        db.ForeignKey('users.user_id'))
    event_id = db.Column(db.Integer,
                         db.ForeignKey('events.event_id'))
    rsvp = db.Column(db.String(10),
                     nullable=False,
                     unique=False)


    # Define relationship to user
    user = db.relationship("User", 
                           backref=db.backref("invitations", order_by=invite_id))

    # Define relationship to event
    event = db.relationship("Event",
                            backref=db.backref("invitations", order_by=invite_id))


    def __repr__(self):
        """Human readable representation of invitation object when printed."""

        return f"""< Invitation: invite_id = {self.invite_id},
                                 user_id = {self.user_id},
                                 event_id = {self.event_id},
                                 rsvp = {self.rsvp} >"""


class Image(db.Model):
    """Create data for a distinct image."""

    __tablename__ = "images"

    img_id = db.Column(db.Integer,
                       autoincrement=True,
                       primary_key=True)
    user_id = db.Column(db.Integer,
                        db.ForeignKey('users.user_id'))
    event_id = db.Column(db.Integer,
                         db.ForeignKey('events.event_id'))
    url = db.Column(db.String(200),
                    nullable=False,
                    unique=True)


    # Define relationship to user
    user = db.relationship("User", 
                           backref=db.backref("images", order_by=img_id))

    # Define relationship to event
    event = db.relationship("Event",
                            backref=db.backref("images", order_by=img_id))


    def __repr__(self):
        """Human readable representation of image object when printed."""

        return f"""< Image: img_id = {self.img_id},
                            user_id = {self.user_id},
                            event_id = {self.event_id} >"""


class Resource(db.Model):
    """Create data for a distinct image."""

    __tablename__ = "resources"

    res_id = db.Column(db.Integer,
                       autoincrement=True,
                       primary_key=True)
    user_id = db.Column(db.Integer,
                        db.ForeignKey('users.user_id'))
    event_id = db.Column(db.Integer,
                         db.ForeignKey('events.event_id'))
    name = db.Column(db.String(50),
                    nullable=False,
                    unique=False)
    category = db.Column(db.String(25),
                         nullable=False,
                         unique=False)
    cost = db.Column(db.Integer,
                     nullable=True)



    # Define relationship to user
    user = db.relationship("User", 
                           backref=db.backref("resources", order_by=res_id))

    # Define relationship to event
    event = db.relationship("Event",
                            backref=db.backref("resources", order_by=res_id))


    def __repr__(self):
        """Human readable representation of image object when printed."""

        return f"""< Resource: res_id = {self.res_id},
                               user_id = {self.user_id},
                               event_id = {self.event_id},
                               name = {self.name} >"""


####################################################
# Helper functions

def connect_to_db(app):
    """Connect the database to the Flask app."""

    # Configurations to use the database.
    app.config["SQLALCHEMY_DATABASE_URI"] = "postgres:///{db_name}"  # replace {db_name} with actual DB name
    app.config["SQLALCHEMY_ECHO"] = False
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.app = app
    db.init_app(app)


if __name__ == "__main__":

    from server import app
    connect_to_db(app)
    print("Connected to DB")