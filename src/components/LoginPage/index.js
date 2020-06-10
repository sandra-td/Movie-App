import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { isLoggedIn } from '../../state/actions/loginActions';
import image from '../rings.jpg';
import image2 from '../matrix.jpg';

class LoginPage extends Component {
    componentDidMount() {
        this.getToken();
    }

    state = {
        token: null,
        activated: false,
        loggedin: "",
        writtenToken: null,
        accountId: null,
        session_id: null,
        errorTokenActivation: false,
        errorNoAccount: false
    }


    getToken = async () => {
        await axios({
            method: 'get',
            url: "https://api.themoviedb.org/3/authentication/token/new?api_key=37d221c2301fc617ed594f567533476f"
        }).then(response => {
            this.setState({ token: response.data.request_token })
        }).catch(error => console.log(error));
    }


    activate = () => {
        window.open(`https://www.themoviedb.org/authenticate/${this.state.token}`, '_blank');
        this.setState({ activated: true })
    }

    login = async () => {
        await axios({
            method: 'post',
            url: "https://api.themoviedb.org/3/authentication/session/new?api_key=37d221c2301fc617ed594f567533476f",
            data: {
                "request_token": this.state.token
            }
        }).then(response => {
            this.setState({ session_id: response.data.session_id })
        }).catch(error => console.log(error, "hits"))
            .then(async () => {
                await axios({
                    method: 'get',
                    url: `https://api.themoviedb.org/3/account?api_key=37d221c2301fc617ed594f567533476f&session_id=${this.state.session_id}`,

                }).then(response => {
                    this.setState({ accountId: response.data.id })
                    this.props.isLoggedIn(this.state.accountId, this.state.session_id);
                    this.props.history.push('/')

                }).catch(error => {
                    this.setState({ errorTokenActivation: true })
                })
            })
        // .then(async () => {
        //     axios({
        //         method: 'post',
        //         url: 'http://localhost:3001/api/login',
        //         data: {
        //             id: this.state.accountId
        //         }
        //     })
        //         .then(response => {
        //             console.log(response, "LOGIN PART 1");

        //             // this.props.history.push('/')
        //         }).catch(error => {
        //             console.log(error);
        //             this.setState({errorNoAccount: true})
        //         })
        // })

    }

    renderLogin = () => {
        if (this.state.activated) {
            return (
                <div className="login-input">
                    <p>Your token is {this.state.token}</p>
                    <p>Login with your token</p>
                    <form onSubmit={this.handleSubmit}>
                        <input type="text" style={{ width: "60%" }} value={this.state.token} onChange={(e) => this.setState({ token: e.target.value })} />
                        <button type="submit">Login</button>
                    </form>
                    {this.state.errorTokenActivation ? <p>The token has not been activated or has expired.<br />
                        Please request a new token and try again.</p> : null}
                    {this.state.errorNoAccount ? "No account found. Please register." : null}
                </div>
            )
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.login();
    }

    render() {
        return (
            <div className="login-main-container">
                <div className="login-images">
                    <img alt="" src={image} ></img>
                </div>
                <div className="login-container">
                    <p>In order to active an account please click on Get token.<br /> After you have successfully activated your account come back to this page.</p>
                    <span onClick={this.activate}>Get token</span>
                    {this.renderLogin()}
                </div>
                <div className="login-images">
                    <img alt="" className="image-darker" src={image2}></img>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isSignedIn: state.auth.isSignedIn,
        accountId: state.auth.accountId,
        sessionId: state.auth.sessionId,

    }
}

export default connect(mapStateToProps, { isLoggedIn })(LoginPage);
