import React, { Component } from 'react';
import { render } from 'react-dom';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/app'
import 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

import CssBaseline from '@material-ui/core/CssBaseline';

import Header from './Header'
import Hello from './Hello';
import NoteList from './NoteList';
import NewNote from './NewNote';

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
      value: '',
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
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
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
    // Add a new document
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

  createNote = (value) => {
    const that = this;
    const db = firebase.firestore();
    
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

  handleSignout = () => {
    firebase.auth().signOut();
  }

  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <div style={{maxWidth: '500px', margin: '0 auto'}}>
          <Header handleSignout={this.state.user ? this.handleSignout : null}/>

          {this.state.user 
          ? 
          // Logged in
          <main>
            <NewNote createNote={this.createNote} />
            <NoteList 
            uid={this.state.user.uid}
            firestore={firebase.firestore()}/>
          </main>
          : 
          // Signed out
          <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()}/>
          }
        </div>
      </React.Fragment>
    );
  }
}

render(<App />, document.getElementById('root'));
