import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router} from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import muiTheme from "./theme/muiTheme";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
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
			loggedIn: false
		};
		this.sessionData = [];
		this.setLoggedIn = this.setLoggedIn.bind(this);
	}
	UNSAFE_componentWillMount () {
		console.log ("%c!! FUNC-INFO => [index.js] componentWillMount  !!","color: green; font-weight: 900;");
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
						this.setLoggedIn ();
						// take the user inside the application on the basis of authentication flag variable
					}
				},
				(error) => {
					console.log (error);
				}
			);

		// send ajax request to check the session validity and set the this.state.loaded = true
		// pass the user session data into login and app components so that they can directly redirect the page into the requested page
	}
	
	setLoggedIn = () => {
		this.setState ({
			loggedIn: true
		});
	}
	
	render () {
		if (this.state.loaded) {
			return (
				<Router>
					<MuiThemeProvider theme={muiTheme}>
							{
								this.state.loggedIn === false ?
									<SignIn loggedInHangler={this.setLoggedIn} /> :
									<SnackbarProvider preventDuplicate={true} maxSnack={3}>
										<App />
									</SnackbarProvider>
							}
					</MuiThemeProvider>
				</Router>
			);
		}else {
			return null;
		}
	}
}

ReactDOM.render(<ErrorBoundary><Routing /></ErrorBoundary>, document.querySelector("#root"));