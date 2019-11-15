import React from 'react';

class UserList extends React.Component {
  constructor(props) {
    super(props)  // props = an obj of stuff
  }

  render() {
    let users = this.props.users;  // arr of obj

    let userItems = [];

    for (let user of users) {
      const handleClick = () => {
        this.props.onUserClick(user)
        console.log("this went through")
      }

      userItems.push(<li onClick={handleClick}>{user.name}</li>)
    }

    return (
      <ul>
        {userItems}
      </ul>
    );
  }
}

export default UserList;