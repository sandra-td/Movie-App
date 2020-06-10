import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SplashScreen from "../../SplashScreen/index.js";

import { getList, deleteList, clearList } from '../../../state/actions/listsActions';
import ListItem from './ListItem';

class ListPage extends Component {
    state = {
        rerender: false
    }
    componentDidMount() {
        this.props.getList(this.props.match.params.id)
    }

    rerenderPage = () => {
        this.setState({ rerender: true })
        setTimeout(() => {
            this.props.getList(this.props.match.params.id)
        }, 300);
    }

    handleDelete = () => {
        this.props.deleteList(this.props.list.id, this.props.sessionId);
        this.rerenderPage()
    }

    handleClear = () => {
        this.props.clearList(this.props.list.id, this.props.sessionId);
        this.rerenderPage()
    }

    renderList = () => {
        if (!this.props.list) {
            return <SplashScreen text="Loading" />
        }
        else {
            return (
                this.props.list.items.map(item => {
                    return <ListItem listId={this.props.match.params.id} rerender={this.rerenderPage} movie={item} key={item.id} />
                })
            )
        }
    }
    render() {
        return (
            <div className="user-list-container">
                <div className="user-list-header">
                    <h2>List {this.props.list ? this.props.list.name : null}</h2>
                    <div className="user-list-header-btns">
                        {this.props.list ? <Link to={{ pathname: `/profile/list/${this.props.list.id}/add-movies`, title: this.props.list.name }} ><span className="button-link">Add movies</span></Link> : null}
                        <span className="button-link" onClick={this.handleDelete}>Delete List</span>
                        <span className="button-link" onClick={this.handleClear}>Clear List</span>
                    </div>
                </div>
                <p>{this.props.list ? this.props.list.description : null}</p>
                <div className="search-list-results">
                    {this.renderList()}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        list: state.profile.lists.currentList,
        sessionId: state.auth.sessionId
    }
}
export default connect(mapStateToProps, { getList, deleteList, clearList })(ListPage);
