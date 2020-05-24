import React from 'react';
import {withRouter} from 'react-router'

const SignedOutLinks = (props)=>{
  return ([
      <li className="nav-item pl-1">
        <a className="nav-link text-primary pointer" onClick={()=>{props.history.push('/signup')}}>Sign Up</a>
      </li>,
      <li className="nav-item pl-1">
        <a className="nav-link text-primary pointer" onClick={()=>{props.history.push('/login')}}>Log In</a>
      </li>
    ]);
}

export default withRouter(SignedOutLinks);
