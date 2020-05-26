import React, {useEffect,useState,useContext} from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import Dashboard from './components/dashboard';
import ResetPassword from "./components/resetPassword";
import SignIn from './components/signin';
import LogIn from './components/login';
import Navbar from './components/navbar';
import UserContextProvider from "./contexts/curUser";
import BookmarkContextProvider from "./contexts/bookmark";
import Footer from "./components/footer";
import axios from 'axios';
import './App.css';

function App() {
  axios.defaults.withCredentials = true;
  const [search,setSearch] = useState(false);
  return (
    <BrowserRouter>
      <UserContextProvider>
        <BookmarkContextProvider>
          <div style={{minHeight:"100vh"}}>
          <Navbar clearSearch={setSearch}/>
          <Switch>
            <Route exact path="/"
              render={(props) => <Dashboard {...props} clearSearch={setSearch} search={search} />}
            />
            <Route path="/signup" exact component={SignIn} />
            <Route path="/login" exact component={LogIn} />
            <Route path="/reset/:token" exact component={ResetPassword}/>
          </Switch>
          </div>
          <Footer />
        </BookmarkContextProvider>
      </UserContextProvider>
    </BrowserRouter>
  );
}

export default App;
