import React from 'react';
import { connect } from 'react-redux';
import { logOut } from '../../state/actions/loginActions';

const LogoutBtn = (props) => {

    const handleClick = () => {
        props.logOut();

    }

    // const logOutBackend = async () => {
    //     await axios({
    //         method: 'get',
    //         url: 'http://localhost:3001/api/logout'
    //     }).then(response => console.log(response, "my own loggoin out"))
    //         .catch(error => console.log(error, "nad the error from my own"))
    //     localStorage.removeItem("token");
    //     localStorage.removeItem("account_token");
    // }


    return (
        <React.Fragment>
            <li style={{marginRight: "1.6rem"}} className="nav-link">
                <span onClick={handleClick} className="logout-btn">Log out</span>
            </li>
        </React.Fragment>
    )
}

const mapStateToProps = state => {
    return {
        isSignedIn: state.auth.isSignedIn,
        accountId: state.auth.accountId,
        sessionId: state.auth.sessionId,
    }

}
export default connect(mapStateToProps, { logOut })(LogoutBtn);
