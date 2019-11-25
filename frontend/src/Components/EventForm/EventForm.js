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
      <div>
        <h1>Create a New Event!</h1>
        <form onSubmit={this.handleSubmit}>
          <div>
            <p>Title</p>
            <input name="title" type="text" value={this.state.title} onChange={this.handleChange} />
          </div>
          <div>
            <p>Start</p>
            <input name="startTime" type="datetime-local" value={this.state.startTime} onChange={this.handleChange} />
          </div>
          <div>
            <p>End</p>
            <input name="endTime" type="datetime-local" value={this.state.endTime} onChange={this.handleChange} />
          </div>
          <div>
            <input type="submit" value="Submit" />
          </div>
        </form>
      </div>
    );
  }
}

export default EventForm;