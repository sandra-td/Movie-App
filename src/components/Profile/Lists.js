import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUserLists } from '../../state/actions/listsActions';
import SplashScreen from "../SplashScreen/index.js"


class Lists extends React.Component {
    componentDidMount() {
        setTimeout(() => {
            this.props.getUserLists(this.props.accountId, this.props.sessionId)
        }, 300)
    }

    renderList = () => {
        if (!this.props.lists) {
            return <SplashScreen text="Loading" />
        }
        else if (this.props.lists.length === 0) {
            return <p className="empty-list-message">You haven't created any lists yet.</p>
        }
        else {
            return (
                this.props.lists.map(list => {
                    return (
                        <Link to={`/profile/list/${list.id}`} params={{ id: list.id }} key={list.id}> <li key={list.id} className="my-list-item">
                            <p>{list.name}</p>
                            <span>See more</span>
                        </li>
                        </Link>
                    )
                }
                )
            )
        }

    }
    render() {
        return (
            <div className="user-list-container">
                <div className="user-list-header">
                    <h3>My Lists</h3>
                    <Link to='/profile/list/new' ><span className="button-link"> Create List</span></Link>
                </div>
                <div className="user-list">
                    <ul>
                        {this.renderList()}
                    </ul>
                </div>

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        lists: state.profile.lists.userLists,
        isFetching: state.profile.lists.isFetching,
        accountId: state.auth.accountId,
        sessionId: state.auth.sessionId
    }
}
export default connect(mapStateToProps, { getUserLists })(Lists);
