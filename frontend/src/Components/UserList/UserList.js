import React from 'react';
import $ from "jquery";

class UserList extends React.Component {
  constructor(props) {
    super(props)  // props = an obj of stuff
    this.state = { users: [] }
  }

  componentDidMount() {
    $.get('/api/users', response => this.setState({users: response}))
  }

  render() {
    let users = this.state.users;

    let userListItems = [];

    for (let user of users) {
      // const handleClick = () => {
      //   this.props.onUserClick(user)
      // }

      userListItems.push(<li>{user.name}</li>)
    }

    return (
      <ul>
        {userListItems}
      </ul>
    );
  }
}

export default UserList;