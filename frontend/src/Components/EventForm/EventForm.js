/* 
Parent component: App
Objective: To render form to create new events --> once created, redirects that event's page
Browser URL: /create-event
Backend API: /events
*/

import React from "react";
import $ from "jquery";
import { Redirect } from "react-router-dom";


class EventForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      startTime: '',
      endTime: '',
    };
  }

  handleChange = (event) => {
    let newState = {}

    let name = event.target.name;
    let value = event.target.value; 
    
    newState[name] = value

    this.setState(newState);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    
    $.post('/events', this.state, (response) => {
      // return alert(`You created an event with id ${response}`);

      this.setState({eventId: response})
    });
  }


  render() {
    if (this.state.eventId) {
      let redirectUrl = `/events/${this.state.eventId}`
      return <Redirect to={redirectUrl} />
    }

    return (
      <div className="event-form">
        <h1 className="form-title">Create a New Event!</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-field">
            <p>Title</p>
            <input name="title" type="text" value={this.state.title} onChange={this.handleChange} />
          </div>
          <div className="form-field">
            <p>Start</p>
            <input name="startTime" type="datetime-local" value={this.state.startTime} onChange={this.handleChange} />
          </div>
          <div className="form-field">
            <p>End</p>
            <input name="endTime" type="datetime-local" value={this.state.endTime} onChange={this.handleChange} />
          </div>
          <div className="form-field submit-button">
            <input type="submit" value="Submit" />
          </div>
        </form>
      </div>
    );
  }
}

export default EventForm;