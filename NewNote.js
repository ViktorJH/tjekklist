import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';

const styles = {
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
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
  }



  handleChange = (event) => {
    this.setState({ value: event.target.value });
  }

  handleSubmit = (event) => {
    const value = this.state.value;
    this.setState({ value: '' });
    this.props.createNote(value);
    event.preventDefault();
  }

  render() {
  const { classes } = this.props;

  return (
    <form onSubmit={this.handleSubmit}>
      <Paper className={classes.root} elevation={1}>
        <InputBase className={classes.input} value={this.state.value} onChange={this.handleChange}  placeholder="Add a new note" />
        <Divider className={classes.divider} />
        <IconButton  type="submit" color="primary" className={classes.iconButton} aria-label="Directions">
          <AddIcon />
        </IconButton>
      </Paper>
    </form>
  );
}

}

NewNote.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NewNote);
