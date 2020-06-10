import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class IntroSection extends React.Component {

    renderMovie = () => {
        if (this.props.nowPlaying.length) {
            const movies = this.props.nowPlaying;
            const movie = movies[Math.floor(Math.random() * movies.length)];
            const {
                backdrop_path,
                title,
                overview,
                id
            } = movie;

            return (
                <section className="landing-page-intro" style={{ backgroundImage: `linear-gradient(to left, rgba(0,0, 0, 0.2) 0%, rgba(0,0, 0, 0.2) 55%, rgba(0, 0, 0, 1) 100%),url(http://image.tmdb.org/t/p/original/${backdrop_path})` }}>
                    <div className="landing-page-content">
                        <div className="info-landing">
                            <h2>{title}</h2>
                            <p className="cinemas-now">Now in Cinemas</p>
                            <p className="overview-landing">{overview}</p>
                            <div className="landing-buttons">
                                <Link to={`/movie/${id}`} className="no-dec"> <span>Read more</span></Link>
                                <Link to="/profile/list" className="no-dec">  <span><i className="fas fa-plus"></i>Add to List</span></Link>

                            </div>
                        </div>
                    </div>
                </section>)
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

const mapStateToProps = (state) => {
    return {
        nowPlaying: state.startPage.nowPlaying,
    }
}

export default connect(mapStateToProps, {})(IntroSection);
