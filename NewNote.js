import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import AddIcon from '@material-ui/icons/Add';

const styles = {
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 800,
    maxWidth: '100%'
  },
  input: {
    marginLeft: 8,
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4,
  },
};


class NewNote extends Component {

  constructor() {
    super();
    this.state = {
      value: ''
    };

    const { classes } = this.props;
  }



handleChange = (event) => {
  this.setState({ value: event.target.value });
}

  render() {
    const { classes } = this.props;

  return (
    <Paper className={classes.root} elevation={1}>
      <InputBase className={classes.input} onChange={this.handleChange}  placeholder="Add a new note" />
      <Divider className={classes.divider} />
      <IconButton color="primary" className={classes.iconButton} aria-label="Directions">
        <AddIcon />
      </IconButton>
    </Paper>
  );
}

}

NewNote.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NewNote);