## About This App
Evently is a single-page web app that is aimed at planning and managing small scale personal events on its own standalone platform. Users are directed to a landing page from which they can sign up to create an account or log in to their existing profile. Once logged in, users can create new events, view and navigate to events that they are hosting and/or events that they are invited to. Guests and hosts can both view the invitees to an event, but only hosts can invite new guests. While the backend web server is built with Flask using RESTful APIs, the frontend UI is created entirely with React. So users are able to navigate throughout the entire app without refreshing the web page although they can visualize the transitions with the changes in the browser URL.

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
Users register or login on the landing page.

#### Profile Page
Once signed in, users are directed to their profile page.

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