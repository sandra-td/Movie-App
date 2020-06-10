import React, { Component } from 'react';
import { connect } from 'react-redux';
import IntroSection from './IntroSection';
import LatestMovie from './LatestMovie';
import GridDisplay from '../../components/GridDisplay';

class StartPage extends Component {

    getRandomMovies = () => {
        let num = Math.floor(Math.random() * Math.floor(this.props.popular.length - 5))
        let num2 = num + 5
        return [num, num2]
    }

    renderContent = () => {
        if (this.props.isSuccess) {
            const randomNumbers = this.getRandomMovies()
            return (
                <React.Fragment>
                    <div className="startpage-container">
                        <IntroSection />
                        <GridDisplay
                            items={this.props.popular.slice(randomNumbers[0], randomNumbers[1])}
                            heading="Popular Movies"
                            mainLinkNoId="/popular-movies"
                        />
                        <GridDisplay
                            items={this.props.topRated.slice(randomNumbers[0], randomNumbers[1])}
                            heading="Top-rated Movies"
                            mainLinkNoId="/toprated-movies"
                        />
                        <LatestMovie />
                        <GridDisplay
                            items={this.props.upcoming.slice(randomNumbers[0], randomNumbers[1])}
                            heading="Upcoming Movies"
                            mainLinkNoId="/upcoming-movies"
                        />
                    </div>
                </React.Fragment>
            )
        }
    }

    render() {
        return (
            <>
                {this.renderContent()}
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        nowPlaying: state.startPage.nowPlaying,
        popular: state.startPage.popular,
        upcoming: state.startPage.upcoming,
        topRated: state.startPage.topRated,
        latest: state.startPage.latest,
        isSuccess: state.startPage.isSuccess
    }
}
export default connect(mapStateToProps, {})(StartPage);