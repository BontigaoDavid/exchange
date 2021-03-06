import React, { Component } from "react";
import DashboardMenu from "../components/dashboard-menu.js"

class Dashboard extends Component {
    render() {
        return (
            <div>
                Dashboard
                <div>
                    <DashboardMenu/>
                </div>
                <div>
                    Welcome 
                </div>
            </div>
        )
    }
}

export default Dashboard;