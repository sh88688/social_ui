import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router,Route} from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import muiTheme from "./theme/muiTheme";
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import ErrorBoundary from "./Components/ErrorBoundary";

import {SERVER_IP, PROTOCOL, API_URL_3} from './Configs/apiConf';
import fetchCall from './Components/FetchCaller';
//Pages 
import App from "./App";
import SignIn from "./Login/login";

class Routing extends Component {
	constructor (props) {
		super (props);
		this.state = {
			loaded: false,
			loggedIn: false,
			clientId : null
		};
		this.sessionData = [];
		this.setLoggedIn = this.setLoggedIn.bind(this);
	}
	UNSAFE_componentWillMount () {
		this.checkSession();
		// send ajax request to check the session validity and set the this.state.loaded = true
		// pass the user session data into login and app components so that they can directly redirect the page into the requested page
	}
	
	checkSession = () => {
		////console.log ("%c!! FUNC-INFO => [index.js] componentWillMount  !!","color: green; font-weight: 900;");
		const url = new URL(`${PROTOCOL}${SERVER_IP}${API_URL_3}`);
		const fetchCallOptions = {
			method: "GET",
			credentials: "include"
		};
		fetchCall(url, fetchCallOptions, "json")
			.then(
				(result) => {
					this.setState({
						loaded: true
					});
					if(result.statusCode === 200) {
						this.sessionData = result.responseData;
						this.setLoggedIn (result.responseData);
						// take the user inside the application on the basis of authentication flag variable
					}
				},
				(error) => {
					//console.log (error);
				}
			);
	}
	setLoggedIn = (client) => {
		this.setState ({
			loggedIn: true,
			clientData : client
		});
	}
	setLoggedOut = () => {
		let promise = new Promise((resolve,reject) => {
			this.setState ({
				loggedIn: false
			},resolve(403));

		})
		return promise;
	}
	
	render () {
		if (this.state.loaded) {
			return (
				<Router basename="/CZ_SOCIAL">
					<MuiThemeProvider theme={muiTheme}>
								<Route path="/">
									{this.state.loggedIn === false ?
									<SignIn loggedInHangler={this.setLoggedIn} /> :
									<SnackbarProvider preventDuplicate={true} maxSnack={3}>
										<App loggedOutHandler={this.setLoggedOut} client={this.state.clientData} authCheck={this.checkSession} AUTH={this.state.loggedIn} location={{pathname: "/integration"}}  />
									</SnackbarProvider>}
								</Route>
					</MuiThemeProvider>
				</Router>
			);
		}else {
			return null;
		}
	}
}

ReactDOM.render(<ErrorBoundary><Routing /></ErrorBoundary>, document.querySelector("#root"));