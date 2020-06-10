import React from 'react';
import { connect } from 'react-redux';
import { fetchDatatoStartPage } from '../../state/actions/startPageActions'
import SplashScreen from "../SplashScreen/index.js"

class AppInitializer extends React.Component {
    componentDidMount = () => {
        this.setApplicationReady()
    }

    setApplicationReady = () => {
        this.props.fetchDatatoStartPage()
    }

    isApplicationReady = () => {
        if (!this.props.nowPlayingIsFetching && this.props.isSuccess) {
            return true
        } else {
            return false
        }
    }

    render() {
        return (
            this.isApplicationReady() ? this.props.children : <SplashScreen text="Movie App" />

        )
    }
}

const mapStateToProps = state => {
    return {
        isFetching: state.startPage.isFetching,
        isSuccess: state.startPage.isSuccess
    }
}
export default connect(mapStateToProps, {
    fetchDatatoStartPage
})(AppInitializer); 