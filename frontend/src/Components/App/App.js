import React from 'react';
// import logo from './logo.svg';
import './App.css';
import NavBar from '../NavBar/NavBar';
import Credentials from '../Credentials/Credentials';
import UserList from '../UserList/UserList';
import Profile from '../Profile/Profile';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }


class App extends React.Component {
  constructor() {
    super();
    this.state = { page: 'userList'};
  }

  renderCredentials = () => {
    return (
      <div>
        <Credentials />
        <button onClick={() => this.changePage('profile')}>Go to Profile Page</button>
      </div>
    );
  }

  renderUserList = () => {
    const usersArray = [
      {id: 1,
       name: 'Arpa'},
      {id: 2,
       name: 'Asheq'}
    ]

    return (
        <UserList users={usersArray} onUserClick={this.handleUserClick}/>
    );
  }

  handleUserClick = (user) => {
    this.setState({ 
      page: 'profile',
      user:  user
    })
  }

  renderProfile = (userObj) => {
    return (
      <div>
        <Profile user={userObj}/>
        <button onClick={() => this.changePage('credentials')}>Log Out</button>
      </div>
    );
  }

  changePage = (page) => {
    this.setState({ page: page});
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
