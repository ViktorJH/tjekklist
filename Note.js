import React, { Component } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
 
class Note extends Component {
  render() {
    return (
      <ListItem key="this.props.object.id">
        <ListItemText
          primary={this.props.object.body}
        />
        {this.props.deleteNote ?  
        <ListItemSecondaryAction>
          <IconButton aria-label="Delete" onClick={this.props.deleteNote}>
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
        : null}

      </ListItem>
    );
  }
}

export default Note
