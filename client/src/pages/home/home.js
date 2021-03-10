import React, { Component } from "react";

class Home extends Component {
    componentDidMount() {
        window.location = "/login";
    }

    render() {
        return (
            <div>
                Redirecting...
            </div>
        )
    }
}

export default Home;