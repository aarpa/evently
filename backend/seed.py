"""Utility file to seed data in DB using data from /seed_data/ directory."""

import datetime
import sqlalchemy

from model import db, User, Event_Type, Event, RSVP_Type, Invitation, Image, Resource_Type, Resource, connect_to_db
from server import app

# -------------------------------------------------------- #
def load_users(user_filename):
  """Load users from user_data.csv into DB."""

  # Write code here to loop over user data and populate DB.



def create_event_types():
  """Seed specific types of events in DB."""

  # Write code here 



def load_events(user_filename):
  """Load events from event_data.csv into DB."""

  # Write code here to loop over event data and populate DB.



def create_rsvp_types():
  """Seed specific types of rsvps in DB."""

  # Write code here



def load_invites(invite_filename):
  """Load invite from invite_data.csv into DB."""

  # Write code here to loop over invite data and populate DB.



def create_resource_types():
  """Seed specific types of resources in DB."""

  # Write code here 



def load_resources(resource_filename):
  """Load resources from resource_data.csv into DB."""

  # Write code here to loop over resource data and populate DB.



def load_images(image_filename):
  """Load images from image_data.csv into DB."""

  # Write code here to loop over image data and populate DB.



# -------------------------------------------------------- #

if __name__ == "__main__":
    connect_to_db(app)
    db.create_all()

