import React from 'react';
import { connect } from 'react-redux';
import {
    userInputName,
    userInputDescription,
    createNewList
} from '../../../state/actions/listsActions';

const CreateList = (props) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        props.createNewList(props.sessionId)
    }

    return (
        <div className="user-list-container">
            <div className="user-list-header">
                <h3>Step 1 - Create New List</h3>
            </div>
            <div className="user-list">
                <form className="form-new-list" onSubmit={handleSubmit}>
                    <div>
                        <label>Name</label>
                        <input required onChange={(e) => props.userInputName(e.target.value)} />
                    </div>
                    <div>
                        <label>Description</label>
                        <textarea required onChange={(e) => props.userInputDescription(e.target.value)} />
                    </div>
                    <button className="button-link" type="submit">Continue</button>
                </form>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        sessionId: state.auth.sessionId
    }
}

export default connect(mapStateToProps, { userInputDescription, userInputName, createNewList })(CreateList);