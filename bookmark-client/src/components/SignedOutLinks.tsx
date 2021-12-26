import React from 'react';
import { withRouter } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import VpnKeyOutlinedIcon from '@material-ui/icons/VpnKeyOutlined';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import { Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  white: {
    color: '#fff',
  },
}));

const SignedOutLinks: React.FC<RouteComponentProps> = ({ history }) => {
  const classes = useStyles();

  return (
    <>
      <Button
        className={classes.white}
        startIcon={<AddBoxOutlinedIcon />}
        onClick={() => history.push('/signup')}
      >
        Sign Up
      </Button>
      <Button
        className={classes.white}
        startIcon={<VpnKeyOutlinedIcon />}
        onClick={() => history.push('/login')}
      >
        Login
      </Button>
    </>
  );
}

export default withRouter(SignedOutLinks);
