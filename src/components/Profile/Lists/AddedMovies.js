import React from 'react';
import { connect } from 'react-redux';
import { getListItems } from '../../../state/actions/listsActions';


class AddedMovies extends React.Component {
    componentDidMount() {
        this.props.getListItems(this.props.id)
    }

    renderMovies = () => {
        if (!this.props.addedMovies) {
            return null
        } else {
            return (
                this.props.addedMovies.map(movie => {
                    return (
                        <p key={movie.id}>{movie.title}</p>
                    )
                })
            )
        }

    }

    render() {
        return (
            <div>Added
                {this.renderMovies()}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        addedMovies: state.profile.lists.currentListItems
    }
}

export default connect(mapStateToProps, { getListItems })(AddedMovies);