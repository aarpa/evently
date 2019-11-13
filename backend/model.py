from flask import Flask
from flask_sqlalchemy import SQLAlchemy


# Instantiate a SQLAlchemy obj to create db.Model classess.
db = SQLAlchemy()
# app = Flask(__name__)
# app.secret_key = 'something&super&duper&secretive'


def connect_to_db(app):
    """Connect the database to the Flask app."""

    # Configurations to use the database.
    app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql:///events"
    app.config["SQLALCHEMY_ECHO"] = False
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.app = app
    db.init_app(app)

    # Create all tables
    db.create_all()


# ---------------------------------------------------------------------- #
# Model definitions

class User(db.Model):
    """Create data for a user."""

    __tablename__ = "users"

    user_id = db.Column(db.Integer,
                        autoincrement=True,
                        primary_key=True)
    
    name = db.Column(db.String(100),
                     nullable=False)
    
    email = db.Column(db.String(100),
                      nullable=False,
                      unique=True)
    
    password = db.Column(db.String(50),
                      nullable=True)
    
    phone = db.Column(db.String(20),
                      nullable=True,
                      unique=True)

    dob = db.Column(db.DateTime,
                    nullable=True) 
    

    # ONE user to MANY events
    events = db.relationship("Event",
                             backref=db.backref("user", order_by=user_id))

    # ONE user to MANY invites
    invites = db.relationship("Invitation", 
                           backref=db.backref("user", order_by=user_id))

    # ONE user to MANY images
    images = db.relationship("Image", 
                           backref=db.backref("user", order_by=user_id))

    # ONE user to MANY resources
    resources = db.relationship("Resource", 
                           backref=db.backref("user", order_by=user_id))



    def __repr__(self):
        """Human readable representation of user object when printed."""

        return f"""< User: user_id = {self.user_id}, 
                           name = {self.name} >"""


    ### Define instance methods here ###
    

# ---------------------------------------------------------------------- #
class Event_Type(db.Model):
    """Create data for a user."""

    __tablename__ = "event_types"

    code = db.Column(db.String(5),
                     primary_key=True)
    
    name = db.Column(db.String(20),
                     nullable=False,
                     unique=True)
    
    description = db.Column(db.Text,
                            nullable=False)
    
    isActive = db.Column(db.Boolean,
                         nullable=False)

    # ONE event type to MANY events 
    events = db.relationship("Event",
                            backref=db.backref("event_type", order_by=code))



    def __repr__(self):
        """Human readable representation of event category object when printed."""

        return f"""< Event Type: code = {self.code}, 
                           name = {self.name} >"""


    ### Define instance methods here ###
    

# ---------------------------------------------------------------------- #
class Event(db.Model):
    """Create data for an event."""

    __tablename__ = "events"

    event_id = db.Column(db.Integer,
                         autoincrement=True,
                         primary_key=True)
    
    host = db.Column(db.Integer,
                     db.ForeignKey('users.user_id'))
    
    category = db.Column(db.String(5),
                         db.ForeignKey('event_types.code'))
    
    title = db.Column(db.String(50),
                      nullable=False)
    
    start_on = db.Column(db.DateTime,
                                nullable=False)
    
    end_on = db.Column(db.DateTime,
                              nullable=False)
    
    created_on = db.Column(db.DateTime,
                                  nullable=False)
    

    ########### Need to revisit ######################
    # location = db.Column(db.String(200),
    #                      nullable=False)


    # ONE event to MANY invites
    invites = db.relationship("Invitation",
                            backref=db.backref("event", order_by=event_id))

    # ONE event to MANY images
    images = db.relationship("Image",
                            backref=db.backref("event", order_by=event_id))

    # ONE event to MANY resources
    resources = db.relationship("Resource",
                            backref=db.backref("event", order_by=event_id))



    def __repr__(self):
        """Human readable representation of event object when printed."""

        return f"""< Event: event_id = {self.event_id},
                            title = {self.title},
                            host = {self.host},
                            category = {self.category} >"""


    ### Define instance methods here ###


# ---------------------------------------------------------------------- #
class RSVP_Type(db.Model):
    """Create data for a user."""

    __tablename__ = "rsvp_types"

    code = db.Column(db.String(5),
                     primary_key=True)
    
    name = db.Column(db.String(20),
                     nullable=False,
                     unique=True)
    
    isActive = db.Column(db.Boolean,
                         nullable=False)



    def __repr__(self):
        """Human readable representation of event category object when printed."""

        return f"""< Event Type: code = {self.code}, 
                           name = {self.name} >"""


    ### Define instance methods here ###
    

# ---------------------------------------------------------------------- #
class Invitation(db.Model):
    """Create data for a distinct invitation."""

    __tablename__ = "invites"

    invite_id = db.Column(db.Integer,
                          autoincrement=True,
                          primary_key=True)
    
    user_id = db.Column(db.Integer,
                        db.ForeignKey('users.user_id'))
    
    event_id = db.Column(db.Integer,
                         db.ForeignKey('events.event_id'))
    
    rsvp = db.Column(db.String(10),
                     nullable=False)    # branch this out to a separate entity
    
    created_on = db.Column(db.DateTime,
                           nullable=False)
    

    # ONE rsvp type to MANY rsvps
    rsvp_type = db.relationship("RSVP_Type",
                            backref=db.backref("rsvps", order_by=invite_id))



    def __repr__(self):
        """Human readable representation of invitation object when printed."""

        return f"""< Invitation: invite_id = {self.invite_id},
                                 user_id = {self.user_id},
                                 event_id = {self.event_id},
                                 rsvp = {self.rsvp_status} >"""


    ### Define instance methods here ###


# ---------------------------------------------------------------------- #

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
    
    created_on = db.Column(db.DateTime,
                           nullable=False)
    

    def __repr__(self):
        """Human readable representation of image object when printed."""

        return f"""< Image: img_id = {self.img_id},
                            user_id = {self.user_id},
                            event_id = {self.event_id} >"""


    ### Define instance methods here ###


# ---------------------------------------------------------------------- #

class Resource_Type(db.Model):
    """Create data for a user."""

    __tablename__ = "resource_types"

    code = db.Column(db.String(5),
                        primary_key=True)
    
    name = db.Column(db.String(20),
                     nullable=False,
                     unique=True)
    
    description = db.Column(db.Text,
                            nullable=False)
    
    isActive = db.Column(db.Boolean,
                         nullable=False)


    # ONE resource type to MANY resources
    resources = db.relationship("Resource",
                                backref=db.backref("resource_type", order_by=code))


    def __repr__(self):
        """Human readable representation of event category object when printed."""

        return f"""< Resource Category: code = {self.code}, 
                           name = {self.name} >"""


    ### Define instance methods here ###
    

# ---------------------------------------------------------------------- #
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
                    nullable=False)
    
    category = db.Column(db.String(25),
                         nullable=False)
    
    cost = db.Column(db.Integer,
                     nullable=True)


    def __repr__(self):
        """Human readable representation of image object when printed."""

        return f"""< Resource: res_id = {self.res_id},
                               user_id = {self.user_id},
                               event_id = {self.event_id},
                               name = {self.name} >"""


    ### Define instance methods here ###


# ---------------------------------------------------------------------- #
# Helper functions

if __name__ == "__main__":
    from server import app
    connect_to_db(app)

    print("Connected to DB")