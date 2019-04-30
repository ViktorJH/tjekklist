import React, { Component } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
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
        <ListItemSecondaryAction>
          <IconButton aria-label="Delete"  onClick={this.props.deleteNote}>
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
}

export default Note