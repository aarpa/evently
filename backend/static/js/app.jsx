/* SINGLE PAGE APP

This page sets up a single "App" component that will render other functional components from "/static/js/components.jsx" depending on the user interactions. 

*/

class App extends React.Component{
    constructor() {
        super();
        this.state = {};

        this.renderHomePage = this.renderHomePage.bind(this);
        this.renderLoginPage = this.renderLoginPage.bind(this);
        this.renderSignUpPage = this.renderSignUpPage.bind(this);
    }

    componentDidMount() {
        // Code to override inherited function from React.Component
    }

    renderHomePage() {
        // Code for displaying home page.
    }

    renderLoginPage () {
        // Code to direct user to their login page.
    }

    renderSignUpPage() {
        // Code to direct new user to a sign up page.
    }

    render() {
        return (
            <ReactRouterDOM.BrowserRouter>
                <nav>
                  <ReactRouterDOM.NavLink
                    to="/login"
                    activeClassName="navlink-active"
                    className="nav-link"
                  >
                    Login to Account
                  </ReactRouterDOM.NavLink>
                  <ReactRouterDOM.NavLink
                    to="/signup"
                    activeClassName="navlink-active"
                    className="nav-link"
                  >
                    Sign Up
                  </ReactRouterDOM.NavLink>
                </nav>
                <div>
                    <ReactRouterDOM.Route
                        exact
                        path="/"
                        render={this.renderHomePage}
                    />
                    <ReactRouterDOM.Route
                        exact
                        path="/login"
                        render={this.renderLoginPage}
                    />
                    <ReactRouterDOM.Route
                        exact
                        path="/signup"
                        render={this.renderSignUpPage}
                    />
                </div>
            </ReactRouterDOM.BrowserRouter>

        );
    }
}

ReactDOM.render(<App />, document.querySelector('#root'));