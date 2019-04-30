import React, { Component } from 'react';
import Note from './Note';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';


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

  render() {
    const noteElements = this.state.notes.map((ele, index) =>
    <React.Fragment key={index}>
        <Note 
          object={ele} 
          deleteNote={() => this.deleteNote(ele.id)} 
           />
        <Divider />
    </React.Fragment>
    );

    return (
      <div>
        {this.state.notes 
        ? <List>
            {noteElements}
          </List>
        : <div>No notes...</div> 
        }
      </div>
    );
  }
}

export default NoteList