/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import axios from 'axios';
import { UserContext, UserInterface } from '../contexts/curUser';
import { BookmarkContext } from '../contexts/bookmark';

interface NavLinksProps extends RouteComponentProps {
  user: UserInterface
}

const SignedInLinks: React.FC<NavLinksProps> = ({ history, user }) => {
  const { setUser } = useContext(UserContext);
  const { setBookmarks } = useContext(BookmarkContext);

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
      <li className="nav-item pl-1">
        <a className="nav-link text-primary pointer">{`Welcome ${user.name}`}</a>
      </li>
      ,
      <li className="nav-item pl-1">
        <a className="nav-link text-primary pointer" role="button" tabIndex={0} onKeyDown={handleLogout} onClick={handleLogout}>Log Out</a>
      </li>
    </>
  );
};

export default withRouter(SignedInLinks);
