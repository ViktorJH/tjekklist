import React, { Component } from 'react';
import { render } from 'react-dom';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/app'
import 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CssBaseline from '@material-ui/core/CssBaseline';


import Hello from './Hello';
import NoteList from './NoteList';
import NewNote from './NewNote';
import './style.css';

// Initialize Firebase
const config = {
  apiKey: "AIzaSyB1CdWKheGfIDKCMPRNI2sY4OZJKGtj17c",
  authDomain: "tjekklist.firebaseapp.com",
  databaseURL: "https://tjekklist.firebaseio.com",
  projectId: "tjekklist",
  storageBucket: "tjekklist.appspot.com",
  messagingSenderId: "1047831251481"
};

if (!firebase.apps.length) {
   firebase.initializeApp(config);
}



class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      name: 'there',
      value: '',
      colRef: null, // To detach column listener
    };
  }

  // Configure FirebaseUI.
  uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => false
    }
  };

  componentWillMount(){
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
        (user) => this.setState({ user })
    );
  }

  // Make sure we un-register Firebase observers when the component unmounts.
  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  }

  handleSubmit = (event) => {
    const that = this;
    const db = firebase.firestore();
    const value = this.state.value;
    this.setState({ value: '' });
    // Add a new document in collection "cities"
    db.collection("users").doc(this.state.user.uid).collection("notes").add({
        body: value,
        timestamp: Date.now()
    })
    .then(function() {
        // Do something after adding
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });

    event.preventDefault();
  }

  loginWithGoogle = () => {
    let provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then( result => {
    }).catch( error => {
			console.warn('error logging in', error);
		})
  }

  render() {
    return (
      <React.Fragment>
      <CssBaseline />
      <div style={{maxWidth: '800px', margin: '0 auto'}}>
        <Hello name={this.state.user ? this.state.user.displayName : 'there'} />

        {this.state.user 
        ? <div>
            <Button variant="outlined" color="primary" onClick={() => firebase.auth().signOut()}>
              Sign-out
            </Button>
            <NewNote handleChange={this.handleChange} />
            <form onSubmit={this.handleSubmit}>
              <TextField
                id="outlined-with-placeholder"
                placeholder="Note"
                label="Note"
                value={this.state.value} 
                onChange={this.handleChange}
                margin="normal"
                variant="outlined"
              />
              <Button 
              variant="outlined" 
              color="primary" 
              type="submit">Add</Button>
              </form>

              <NoteList 
              uid={this.state.user.uid}
              firestore={firebase.firestore()}/>
          </div>
        : <div>
            <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()}/>
          </div>
        }
      </div>
      </React.Fragment>
    );
  }
}

render(<App />, document.getElementById('root'));
