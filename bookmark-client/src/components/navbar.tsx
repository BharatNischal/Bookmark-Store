import React, { useContext, useState } from 'react';
import { withRouter } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../contexts/curUser';
import SearchIcon from '@material-ui/icons/Search';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
import { BookmarkContext } from '../contexts/bookmark';
import { AppBar, createStyles, InputBase, makeStyles, Toolbar, Typography, alpha } from '@material-ui/core';

interface NavbarProps extends RouteComponentProps {
  clearSearch: (val: boolean) => void;
}

const useStyles = makeStyles((theme) =>
  createStyles({
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
    navContent: {
      display: 'flex',
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center'
    }
  }),
);

const Navbar: React.FC<NavbarProps> = ({ clearSearch, history }) => {
  const { user } = useContext(UserContext);
  const { setBookmarks } = useContext(BookmarkContext);
  const [title, setTitle] = useState('');
  const classes = useStyles();

  const refresh = () => {
    axios.get('/api/bookmark/')
      .then((res) => {
        setBookmarks(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
    setTitle('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios.post('/api/bookmark/search', { title })
      .then((res) => {
        setBookmarks(res.data);
        clearSearch(true);
      })
      .catch((err) => {
        console.log(err.message);
      });
    setTitle('');
  };

  return (
    // <nav className="navbar navbar-expand-lg">
    //   <div className="container">
    //     <a className="navbar-brand text-primary pointer" onClick={() => { refresh(); history.push('/'); }}>Bookmark Store</a>
    //     <button className="navbar-toggler custom-toggler" type="button" data-toggle="collapse" data-target="#nvbCollapse" aria-controls="nvbCollapse">
    //       <span className="navbar-toggler-icon" />
    //     </button>
    //     <div className="collapse navbar-collapse" id="nvbCollapse">
    //       <ul className="navbar-nav ml-auto">
    //         { user.login
    //           ? (
    //             <>
    //               <form className="form-inline my-2 my-lg-0" id="search" onSubmit={handleSubmit}>
    //                 <input
    //                   value={title}
    //                   onChange={(e) => { setTitle(e.target.value); }}
    //                   name="titleSearch"
    //                   type="search"
    //                   placeholder="Search Text/Title/Url"
    //                   aria-label="Search"
    //                   style={{
    //                     background: 'inherit', border: 'none', borderBottom: '2px solid black', outline: 'none', color: '#007bff',
    //                   }}
    //                 />
    //                 <button
    //                   type="submit"
    //                   style={{
    //                     backgroundColor: 'transparent', border: 'none', margin: 'none', outline: 'none',
    //                   }}
    //                 >
    //                   <i className="fa fa-search" aria-hidden="true" style={{ cursor: 'pointer', color: '#007bff' }} />
    //                 </button>
    //               </form>
    //               <SignedInLinks user={user} />
    //             </>
    //           )
    //           : <SignedOutLinks />}
    //       </ul>
    //     </div>
    //   </div>
    // </nav>
    <AppBar position="static">
      <Toolbar variant="dense">
        <Typography variant="h6" color="inherit">
          Bookmark Store
        </Typography>
        <div className={classes.navContent}>
        {user.login
          ? (
            <>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ 'aria-label': 'search' }}
                />
              </div>
              <SignedInLinks user={user} />
            </>
          )
          : <SignedOutLinks />}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default withRouter(Navbar);
