import React from 'react';
import $ from "jquery";


class HostedEvents extends React.Component {
  // constructor(props) {
  //   super(props);
  // //   this.state = { 
  // //     userBio: {}
  // //   }
  // }

  // componentDidMount() {
  //   let userId = this.props.match.params.userId;
  //   let apiUrl = `/users/${userId}`
    
  //   $.get(apiUrl, response => this.setState({ userBio: response }));
  // }

  render() {
    // let userBio = this.state.userBio;

    return (
      <div>
        Details about the hosted events go here
      </div>        
    );
  }
}

export default HostedEvents;