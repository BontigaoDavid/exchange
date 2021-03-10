import React, { Component } from "react";
import DashboardMenu from "../components/dashboard-menu.js"
import axios from "axios";

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            AccessToken: {},
            user: {}
        }
    }

    componentDidMount() {
        let AccessTokenString = window.sessionStorage.getItem("AccessToken");
        var AccessToken = JSON.parse(AccessTokenString);
        console.log(AccessToken);
        this.setState({ AccessToken: AccessToken});

        // get user wallet balance
        let config = {
            headers: { "Authorization": AccessToken.hash }
        }

        axios.get("/api/users/" + AccessToken.email, config).then( response => {
            let userObject = response.data;
            
            console.log(userObject);

            axios.get("/api/wallets/" + userObject.BTCWalletCredentials.address).then(response => {
                let balance = response.data
                userObject.balance = balance;
                this.setState({ user: userObject });
                console.log(this.state.user);
                console.log(this.state.user.BTCWalletCredentials.address);
            })
        });
    }

    render() {
        return (
            <div>
                Dashboard
                <div>
                    <DashboardMenu/>
                </div>
                <div>
                    Welcome: {this.state.user.firstname} {this.state.user.lastname}<br/>
                    Balance: {this.state.user.balance}sat BTC<br/>
                    Address: {this.state.user.BTCWalletCredentials ? this.state.user.BTCWalletCredentials.address : ""}
                </div>
            </div>
        )
    }
}

export default Dashboard;