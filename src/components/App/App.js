import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../css/style.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import { checkIfLoggedIn } from '../../state/actions/loginActions';
import AppInitializer from "./AppInitializer";
import AppShell from './AppShell';

class App extends Component {
    componentDidMount() {
        this.props.checkIfLoggedIn();
    }

    render() {
        return (
            <AppInitializer>
                <AppShell />
            </AppInitializer>
        )
    }
}


export default connect(null, { checkIfLoggedIn })(App);
