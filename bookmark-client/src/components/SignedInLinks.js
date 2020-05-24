import React,{useContext} from 'react';
import {withRouter} from "react-router";
import axios from "axios";
import {UserContext} from "../contexts/curUser";
import {BookmarkContext} from "../contexts/bookmark";

const SignedInLinks = (props)=>{

  const {setUser} = useContext(UserContext);
  const {setBookmarks} = useContext(BookmarkContext);

  const handleLogout = (e)=>{
    axios.get("/api/logout")
      .then(res=>{
        console.log(res);
        if(res.data && res.data.success){
          console.log("logged Out successfully");
          setUser({login:false,name:"",username:""});
          setBookmarks([]);
          props.history.push("/login");
        }
      })
      .catch(err=>{
        console.log(err.message);
      })
  }

  return ([
    <li className="nav-item pl-1">
      <a className="nav-link text-primary pointer">{`Welcome ${props.user.name}`}</a>
    </li>,
    <li className="nav-item pl-1">
      <a className="nav-link text-primary pointer" onClick={handleLogout}>Log Out</a>
    </li>
  ]);
}

export default withRouter(SignedInLinks);
