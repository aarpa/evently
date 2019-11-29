/* 
Parent component: Event
Objective: To render the details of an event
Browser URL: /events/:eventId
Backend API: /events/<event_id>
*/

import React from 'react';

// propsObj contains all the props passed in by the parent component
export default function EventDetails(propsObj) {
  // extract out the event details
  const eventDetails = propsObj.eventDetails; 
  // const {eventDetails} = propsObj; --> destructuring

  return (
    <div>
      <h1>{eventDetails.title}</h1>
      <p>Start Time and Date: {eventDetails.start_on}</p>
      <p>End Time and Date: {eventDetails.end_on}</p>
    </div>
  );
}
