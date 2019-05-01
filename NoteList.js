import React, { Component } from 'react';
import Note from './Note';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import { CSSTransition, TransitionGroup, } from 'react-transition-group';

import './style.css';

class NoteList extends Component {
  constructor() {
    super();
    this.state = {
      notes: [],
    };
    this.getNotes = this.getNotes.bind(this);
  }

  componentDidMount(){
    this.getNotes();
  }
 
  componentWillUnmount(){
    this.unsubscribe();
  }

  getNotes = () => {
    const db = this.props.firestore;
    const colRef = db.collection("users").doc(this.props.uid)
    .collection("notes");

    let notes = [];
    const that = this;

    // Realtime updates listener
    this.unsubscribe = colRef.orderBy("timestamp", "asc")
    .onSnapshot(function(querySnapshot) {
        var notes = [];
        querySnapshot.forEach(function(doc) {
            notes.push(
              { id: doc.id,
                body: doc.data().body}
                );
        });
        that.setState({ notes })
    });
  }

  deleteNote = (id) => {
    const r = window.confirm("Are you sure you want to delete this item?"); 
    if(r == true){
      const db = this.props.firestore;
      const docRef = db.collection("users")
        .doc(this.props.uid)
        .collection("notes").doc(id);

      docRef.delete().then(function() {
        // console.log("Document successfully deleted!");
      }).catch(function(error) {
        console.error("Error removing document: ", error);
      });
    }
  }

  render() {
    const noteElements = this.state.notes.map((ele, index) =>
    <CSSTransition key={index} timeout={200} classNames="item" >
      <React.Fragment>
        <Note 
          object={ele} 
          deleteNote={() => this.deleteNote(ele.id)} 
          />
        <Divider />
      </React.Fragment>
    </CSSTransition>
    );
    
    if(this.state.notes.length < 1){
      noteElements = 
      <CSSTransition key={1} timeout={200} classNames="item" >
      <React.Fragment>
        <Note object={{body: 'No notes...'}}  deleteNote={null}  />
      </React.Fragment>
    </CSSTransition>
    }

    return (
      <Paper>
        <List disablePadding>
          <TransitionGroup>
            {noteElements}
         </TransitionGroup>
        </List>
      </Paper>
    );
  }
}

export default NoteList
