/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import axios from 'axios';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import { alpha, Button, makeStyles } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import { UserContext, UserInterface } from '../contexts/curUser';
import { BookmarkContext } from '../contexts/bookmark';

interface NavLinksProps extends RouteComponentProps {
  user: UserInterface
}

const useStyles = makeStyles((theme) => ({
  white: {
    color: '#fff',
  },
  smallAvatar: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    margin: '0 10px 0 5px',
    backgroundColor: alpha(theme.palette.common.white, 0.15),
  }
}));

const SignedInLinks: React.FC<NavLinksProps> = ({ history, user }) => {
  const { setUser } = useContext(UserContext);
  const { setBookmarks } = useContext(BookmarkContext);
  const classes = useStyles();

  const handleLogout = () => {
    axios.get('/api/logout')
      .then((res) => {
        if (res.data && res.data.success) {
          setUser({ login: false, name: '', username: '' });
          setBookmarks([]);
          history.push('/login');
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <>
      <Avatar className={classes.smallAvatar}>{user.username[0]}</Avatar>
      <Button 
        onClick={handleLogout}
        startIcon={<ExitToAppOutlinedIcon />}
        className={classes.white}
      >
        Logout
      </Button>
    </>
  );
};

export default withRouter(SignedInLinks);
