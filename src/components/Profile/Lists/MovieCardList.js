import React from 'react';
import { connect } from 'react-redux';
import { removeMovieFromList, addMovieToList } from '../../../state/actions/listsActions';
import axios from 'axios';
import MissingPicture from '../../MissingPicture';


class MovieCardList extends React.Component {
    state = {
        present: false,
        added: false,
        showNotificationAdded: false,
        showNotificationRemoved: false,

    }
    componentDidMount() {
        this.checkItemStatus();
    }

    checkItemStatus = () => {
        axios({
            method: 'get',
            url: `https://api.themoviedb.org/3/list/${this.props.listId}/item_status?api_key=37d221c2301fc617ed594f567533476f&movie_id=${this.props.movie.id}`
        }).then(response => {
            this.setState({ present: response.data.item_present })
        }).catch(error => {
            console.log(error)
        })
    }

    handleClick = () => {
        if (this.state.present) {
            this.props.removeMovieFromList(this.props.listId, this.props.sessionId, this.props.movie.id);
            this.setState({ added: false, showNotificationRemoved: true })
            setTimeout(() => {
                this.checkItemStatus()
            }, 400);
        } else {
            this.props.addMovieToList(this.props.listId, this.props.sessionId, this.props.movie.id)
            this.setState({ added: true, showNotificationAdded: true })
            setTimeout(() => {
                this.checkItemStatus()
            }, 400);
        }

    }

    renderMovies = () => {
        console.log(this.props.movie);
        if (!this.props.movie || this.props.movie.title === "UNdefined") {
            return <p>No results. Please try again.</p>

        } else {
            const {
                title,
                release_date,
                poster_path
            } = this.props.movie;
            const date = release_date && release_date.slice(0, 4);
            return (
                <div className="cast-member-card "  >
                    <div className="image-container">
                        {!poster_path ? <MissingPicture /> :
                            <img
                                alt=""
                                src={`https://image.tmdb.org/t/p/w185${poster_path}`}
                                onClick={this.handleClick}
                            />}
                        {this.state.present || this.state.added ? <div className="overlay-green">
                            <div> <i class="fas fa-check"></i></div>
                        </div> : null}
                    </div>
                    <div className="cast-info">
                        <p>{title}</p>
                        <div className="inner-card-list">
                            <span>{date}</span>
                            <span title="Add to List" className="icon-card"
                                onClick={this.handleClick}
                            >{this.state.present || this.state.added ? <i class="fas fa-trash-alt "></i> : <i className="fas fa-plus"></i>}</span>
                        </div>
                    </div>
                </ div>
            )
        }

    }
    render() {
        return (

            <>
                {this.renderMovies()}
            </>
        )


    }
}
const mapStateToProps = state => {
    return {
        sessionId: state.auth.sessionId
    }
}
export default connect(mapStateToProps, { removeMovieFromList, addMovieToList })(MovieCardList);