## About This App
Evently is a single-page web app that is aimed at planning and managing small scale events. Inspired by Facebook Events and Eventbrite, this app has a similar functionality in this current implementation, but the vision is to allow users to have a standalone platform that is dedicated to creating and managing non-ticketed personal events. 

This app required a database that could accommodate a complex data model with several many-to-many relationship between users and events. Since the backend web server is written in Python and built with Flask and the frontend is written in JavaScript using React, there needed to be a set of internal RESTful API endpoints that could handle and process the raw data passed over the web using JSON.

UX was a high priority, so the ability to navigate across the UI without ever refreshing the whole page was achieved by utilizing React Router. That way, users can still visualize the transitions with the changes in the browser URL.

## Contents
* [Tech Stack](#tech-stack)
* [Features](#features)
* [Future Implementations](#future)
* [Installation](#installation)

## <a name="tech-stack"></a>Technologies
* React
* JavaScript
* jQuery
* Python
* Flask
* PostgreSQL
* SQLAlchemy ORM
* HTML
* CSS

## <a name="features"></a>Features

#### Landing Page
Users register or log in on the landing page.

#### Profile Page
Once signed in, users are directed to their profile page. This page has 2 segregated sections: the bio (which remains static) and the upcoming events (which can be toggled based on user interactions). The upcoming events includes those that the user is hosting and events that the user is invited to. Users can also create a new event from their profile page.

#### Create New Event
This page has a form that takes necessary information to create a new event. Upon saving, the user will be directed to the event page.

#### Event Page
This page has 2 segregated sections similar to the profile page: the event details (which remains static) and the guests invited to the event (which can be toggled based on user interactions). Any user can view the guestlist, but only the host can invite new guests to an event that they are hosting.

## <a name="future"></a>Upcoming Features
The current data model is extremely robust and is able to support a wide range of features in future implementations. Some of them include:
* Trip itineraries
* Photo galleries where users can share images from an event
* Templates for a user to quickly create a specific type of event 
* Calendar view of upcoming events
* Password hashing using Google OAuth
* Geolocation embedding and live search of addresses when creating or updating an event

## <a name="installation"></a>Installation
To run this app on your own machine:

Clone or fork this repo:
```
https://github.com/aarpa/evently.git
```

Create and activate a virtual environment inside the project directory:
```
virtualenv env
source env/bin/activate
```

Install the dependencies:
```
pip install -r requirements.txt
```

Set up the database:

```
createdb goalsdb
python3 model.py
python3 seed.py
```

Run the app:

```
python3 server.py
```

You can now navigate to 'localhost:5000/' to access this app.