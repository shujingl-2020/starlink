import React, {Component} from 'react';
import logo from "../assets/images/spacex_logo.svg";

class Header extends Component {
    render() {
        return (
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p className="title">
                    Starlink Tracker
                </p>
            </header>
        );
    }
}

export default Header;