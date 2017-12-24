import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import * as firebase from "firebase";

export default class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			loggedIn: false
		}
	}

	componentWillMount() {
		const config = {
	    apiKey: "AIzaSyA0bFN95y_z2Iejpghl9kV-fAs6Fwz2D6Q",
	    authDomain: "powerup-iyv.firebaseapp.com",
	    databaseURL: "https://powerup-iyv.firebaseio.com",
	    projectId: "powerup-iyv",
	    storageBucket: "powerup-iyv.appspot.com",
	    messagingSenderId: "931653556275"
	  };
	  firebase.initializeApp(config);
	}

	logInWithEmailPassword = () => {
		firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(
			(data) => {
				console.log(data);
			}
		).catch(
			(error) => {
			  // Handle Errors here.
			  var errorCode = error.code;
			  var errorMessage = error.message;
				console.log(errorCode);
				console.log(errorMessage);
			  // ...
			}
		);
	}

	logInWithGoogle = () => {

		console.log("in login function");

		var provider = new firebase.auth.GoogleAuthProvider();
		console.log("1");
		firebase.auth().signInWithPopup(provider).then(function(result) {
			console.log("success");
	  // This gives you a Google Access Token. You can use it to access the Google API.
		  var token = result.credential.accessToken;
		  // The signed-in user info.
		  var user = result.user;
			this.setState({
				user: result.user
			});
		  // ...
		}).catch(function(error) {
			console.log("error");
			console.log(error);
		  // Handle Errors here.
		  var errorCode = error.code;
		  var errorMessage = error.message;
		  // The email of the user's account used.
		  var email = error.email;
		  // The firebase.auth.AuthCredential type that was used.
		  var credential = error.credential;
		  // ...
		});
	}

  render() {
		if (this.state.loggedIn) {
			return (
				<View style={styles.container}>
	        <Text>Logged in to app</Text>
	      </View>
			);
		}
    return (
      <View style={styles.container}>
				<TextInput
					 style={{height: 40}}
					 placeholder="Type here email!"
					 onChangeText={(text) => this.setState({
						 email: text})}
				 />
				 <TextInput
					 style={{height: 40}}
					 placeholder="Type here password!"
					 onChangeText={(text) => this.setState({
						 password: text})}
				 />
				<Button
				  onPress={this.logInWithEmailPassword}
				  title="Press Me"
				/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
