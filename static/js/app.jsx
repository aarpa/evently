/* SINGLE PAGE APP

This page sets up a single "App" component that will render other functional components from "/static/js/componets.jsx" depending on the user interactions. 

ReactRouterDOM is intended to help 

*/

class App extends React.Component{
    constructor() {
        super();
        this.state = {};
    }

    render() {
        return (
            <ReactRouterDOM.BrowserRouter>
            
            </ReactRouterDOM.BrowserRouter>

        );
    }
}

ReactDOM.render(<App />, document.querySelector('#root'));