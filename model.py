from flask import Flask
from flask_sqlalchemy import SQLAlchemy

# Instantiate a SQLAlchemy obj to create db.Model classess.
db = SQLAlchemy()


###################################################
# Model definitions






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