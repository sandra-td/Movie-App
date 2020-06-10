import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeMovieFromList, addMovieToList } from '../../../state/actions/listsActions';


class MovieCardList extends React.Component {

    handleClick = () => {
        this.props.removeMovieFromList(this.props.listId, this.props.sessionId, this.props.movie.id);
        this.props.rerender()
    }

    render() {
        const {
            id,
            title,
            release_date,
            poster_path
        } = this.props.movie;

        const date = release_date.slice(0, 4);
        return (
            <div className="cast-member-card">
                <div className="image-container">
                    <Link to={`/movie/${id}`}><img alt="" src={`https://image.tmdb.org/t/p/w185${poster_path}`} /></Link>
                </div>
                <div className="cast-info">
                    <p>{title}</p>
                    <div className="inner-card-list">
                        <span>{date}</span>
                        <span title="Add to List" className="icon-card"
                            onClick={this.handleClick}
                        > <i className="fas fa-trash-alt"></i></span>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        sessionId: state.auth.sessionId
    }
}
export default connect(mapStateToProps, { removeMovieFromList, addMovieToList })(MovieCardList);