import React from 'react';
import { withRouter } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';

const SignedOutLinks: React.FC<RouteComponentProps> = ({ history }) => (
  <>
    <li className="nav-item pl-1">
      <a className="nav-link text-primary pointer" onClick={() => { history.push('/signup'); }}>Sign Up</a>
    </li>
    ,
    <li className="nav-item pl-1">
      <a className="nav-link text-primary pointer" onClick={() => { history.push('/login'); }}>Log In</a>
    </li>
  </>
);

export default withRouter(SignedOutLinks);
