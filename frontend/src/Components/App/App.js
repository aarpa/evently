import React from 'react';
import './App.css';
import NavBar from '../NavBar/NavBar';
import Credentials from '../Credentials/Credentials';
import UserList from '../UserList/UserList';
import Profile from '../Profile/Profile';


class App extends React.Component {
  constructor() {
    super();
    this.state = { page: 'userList'};
  }

  changePage = (page) => {
    this.setState({ page: page});
  }

  // renderCredentials = () => {
  //   return (
  //     <div>
  //       <Credentials />
  //       <button onClick={() => this.changePage('profile')}>Go to Profile Page</button>
  //     </div>
  //   );
  // }

  
  renderUserList = () => {
    return (
      <UserList />
    );
  }

  renderProfile = (userObj) => {
    return (
      <div>
        <Profile user={userObj}/>
        <button onClick={() => this.changePage('credentials')}>Log Out</button>
      </div>
    );
  }

  render() {
    let page = this.state.page;
    let toRender;

    if (page === 'credentials') {
      toRender = this.renderCredentials();
    } else if (page === 'userList') {
      toRender = this.renderUserList();
    } else {
      toRender = this.renderProfile(this.state.user);
    }

    return (
      <div className="app">
        <NavBar />
        {toRender}
      </div>
    );
  }
}

export default App;
