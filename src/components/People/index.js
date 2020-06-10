import React from 'react';
import { connect } from 'react-redux'
import { fetchPersonDetails } from '../../state/actions/peopleActions'
import ActorDetails from './ActorDetails';
import Filmography from './Filmography';
import SplashScreen from "../SplashScreen/index.js";
import GridDisplay from '../GridDisplay';
import { getHighestRatedMovies } from '../shared/services';

class People extends React.Component {
    componentDidMount = () => {
        const id = this.props.match.params.id
        this.props.fetchPersonDetails(id)
        window.scrollTo(0, 0);
    }

    getHighRatedMovies = () => {
        if (this.props.personDetails) {
            let movies = getHighestRatedMovies(this.props.personDetails.movie_credits.cast)
            return movies;
        }
    }
    renderContent = () => {
        if (this.props.isFetchingData) {
            return <SplashScreen text="Loading..." />
        }
        return (
            <div className="actorpage-container">
                <ActorDetails details={this.props.personDetails} />
                <GridDisplay
                    items={this.getHighRatedMovies()}
                    heading="Known for"
                />
                <Filmography movies={this.props.personDetails} />
            </div>
        )
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
        personDetails: state.people.details,
        isFetchingData: state.people.isFetching
    }
}

export default connect(mapStateToProps, { fetchPersonDetails })(People);