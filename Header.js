import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import StyleIcon from '@material-ui/icons/Style';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
}; 

class Header extends Component {

  render(){
  const { classes } = this.props;
  return (
    <div className={classes.root}>
      <AppBar position="static" color="default" style={{ background: 'transparent', boxShadow: 'none', margin: '2rem 0 2rem 0'}}>
        <Toolbar>
          <Typography variant="h3" color="inherit" className={classes.grow}>
            <StyleIcon  fontSize="large" />
            TJEKKLIST
          </Typography>
          {this.props.handleSignout ? <Button onClick={this.props.handleSignout}  variant="outlined" >Sign-out</Button> : ''}
        </Toolbar>
      </AppBar>
    </div>
  );
}


}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Header);
