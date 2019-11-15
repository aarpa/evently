"""Utility file to seed data in DB using data from /seed_data/ directory."""

from datetime import datetime
import sqlalchemy

from model import db, User, Event_Type, Event, RSVP_Type, Invitation, Image, Resource_Type, Resource, connect_to_db
from server import app

# -------------------------------------------------------- #
def load_users(user_filename):
    """Load users from user_data.csv into DB."""

    print("Users")

    for i, row in enumerate(open(user_filename)):
        row = row.rstrip()
        user_id, name, email, password, phone, dob = row.split("|")

        if email:
          is_registered = True
        else:
            is_registered = False

        # Instantiate user
        user = User(name=name, 
                    email=email, 
                    password=password, 
                    phone=phone, 
                    dob=dob,
                    is_registered=is_registered)


        # Add user to session
        db.session.add(user)


    # Commit all users to DB
    db.session.commit()


# -------------------------------------------------------- #
def create_event_types(event_type_filename):
    """Seed specific types of events in DB."""

    print("Event Types")

    for i, row in enumerate(open(event_type_filename)):
        row = row.rstrip()
        code, name, description, is_active = row.split("|")

        # Instantiate event type
        event_type = Event_Type(code=code,
                                name=name,
                                description=description,
                                is_active=is_active)

        # Add event type to session
        db.session.add(event_type)

    # Commit all event type instances to DB
    db.session.commit()


# -------------------------------------------------------- #
def load_events(event_filename):
    """Load events from event_data.csv into DB."""

    print("Events")

    for i, row in enumerate(open(event_filename)):
        row = row.rstrip()
        event_id, host, category, title, start_str, end_str, created_str = row.split("|")

        start_on = datetime.strptime(start_str, "%m/%d/%Y %H:%M")
        end_on = datetime.strptime(end_str, "%m/%d/%Y %H:%M")
        created_on = datetime.strptime(created_str, "%m/%d/%Y %H:%M")

        # Instantiate event
        event = Event(host=host,
                      category=category,
                      title=title,
                      start_on=start_on,
                      end_on=end_on,
                      created_on=created_on)
        
        # Add event to session
        db.session.add(event)

    # Commit all event instances to DB
    db.session.commit()


# -------------------------------------------------------- #
def create_rsvp_types(rsvp_type_filename):
    """Seed specific types of rsvps in DB."""

    print("RSVP Types")

    for i, row in enumerate(open(rsvp_type_filename)):
        row = row.rstrip()
        code, name, is_active = row.split("|")

        # Instantiate rsvp type
        rsvp_type = RSVP_Type(code=code,
                              name=name,
                              is_active=is_active)

        # Add rsvp type to session
        db.session.add(rsvp_type)

    # Commit all rsvp type instances to DB
    db.session.commit()


# -------------------------------------------------------- #
def load_invites(invite_filename):
    """Load invite from invite_data.csv into DB."""

    # Write code here to loop over invite data and populate DB.

    print("Invites")

    for i, row in enumerate(open(invite_filename)):
        row = row.rstrip()

        user_id, event_id, rsvp = row.split("\t")

        user_id = int(user_id)
        event_id = int(event_id)

        # Instantiate invite
        invite = Invitation(user_id=user_id,
                            event_id=event_id,
                            rsvp=rsvp)

        # Add invite to session
        db.session.add(invite)

    # Commit all invite instances to DB
    db.session.commit()


# -------------------------------------------------------- #
def create_resource_types(resource_type_filenanme):
  """Seed specific types of resources in DB."""

    print("Resource Types")

    for i, row in enumerate(open(resource_type_filenanme)):
        row = row.rstrip()
        code, name, description, is_active = row.split("|")

        resource_type = Resource_Type(code=code,
                                      name=name,
                                      description=description,
                                      is_active=is_active)

        # Add resource type to session
        db.session.add(resource_type)

    # Commit all resource type instances to DB
    db.session.commit()


# -------------------------------------------------------- #
def load_resources(resource_filename):
  """Load resources from resource_data.csv into DB."""




# -------------------------------------------------------- #
def load_images(image_filename):
  """Load images from image_data.csv into DB."""

  # Write code here to loop over image data and populate DB.



# -------------------------------------------------------- #
if __name__ == "__main__":
    connect_to_db(app)
    db.create_all()

    # store data in corresponding variables
    user_filename = "seed_data/users.txt"
    event_type_filename = "seed_data/event_types.txt"
    event_filename = "seed_data/events.txt"
    rsvp_type_filename = "seed_data/rsvp_types.txt"
    invite_filename = 
    resource_type_filenanme = "seed_data/resource_types.txt"
    resource_filename = 
    image_filename = 

    # Call the defined functions and pass in variable names
    load_users(user_filename)
    create_event_types(event_type_filename)
    load_events(event_filename)
    create_rsvp_types(rsvp_type_filename)
    create_resource_types(resource_type_filenanme)

    load_invites(invite_filename)
    load_resources(resource_filename)
    load_images(image_filename)