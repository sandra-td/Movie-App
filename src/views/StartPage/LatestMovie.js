import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class LatestMovie extends Component {

    renderMovie = () => {
        if (this.props.latest) {
            const movies = this.props.latest;
            const movie = movies[Math.floor(Math.random() * movies.length)];

            return (
                <div className="latest-movie-container">
                    <div className="image-container" style={{ marginLeft: "5rem" }}>
                        <Link to={`/movie/${movie.id}`}><img alt="" src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} /></Link>
                    </div>
                    <div className="latest-info">
                        <h3 style={{ paddingLeft: "2rem" }}>Trending Now</h3>
                        <div className="details-links" style={{ border: "none" }}>
                            <ul className="details-latest" >
                                <li> <h4 >{movie.title}</h4></li>
                                <li className="styled-icon1">
                                    <i className="fas fa-star specialIcon"></i><span>{movie.vote_average}</span></li>
                            </ul>
                        </div>
                        <div className="latest-overview">
                            <p>{movie.overview}</p>
                        </div>
                        <div className="landing-buttons" style={{ marginLeft: "2rem" }}>
                            <Link to={`/movie/${movie.id}`}><span>Read more</span></Link>
                            <Link to='/profile/list'><span>Add to List</span></Link>
                        </div>
                    </div>
                </div>
            )
        }
    }

    render() {
        return (
            <React.Fragment>
                {this.renderMovie()}
            </React.Fragment>
        )
    }
}
const mapStateToProps = state => {
    return {
        latest: state.startPage.latest
    }
}
export default connect(mapStateToProps, {})(LatestMovie);
