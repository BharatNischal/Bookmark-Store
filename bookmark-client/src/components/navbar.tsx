import React, { useContext, useState } from 'react';
import { withRouter } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../contexts/curUser';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
import { BookmarkContext } from '../contexts/bookmark';

interface NavbarProps extends RouteComponentProps {
  clearSearch: (val: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ clearSearch, history }) => {
  const { user } = useContext(UserContext);
  const { setBookmarks } = useContext(BookmarkContext);
  const [title, setTitle] = useState('');

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
    <nav className="navbar navbar-expand-lg">
      <div className="container">
        <a className="navbar-brand text-primary pointer" onClick={() => { refresh(); history.push('/'); }}>Bookmark Store</a>
        <button className="navbar-toggler custom-toggler" type="button" data-toggle="collapse" data-target="#nvbCollapse" aria-controls="nvbCollapse">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="nvbCollapse">
          <ul className="navbar-nav ml-auto">
            { user.login
              ? (
                <>
                  <form className="form-inline my-2 my-lg-0" id="search" onSubmit={handleSubmit}>
                    <input
                      value={title}
                      onChange={(e) => { setTitle(e.target.value); }}
                      name="titleSearch"
                      type="search"
                      placeholder="Search Text/Title/Url"
                      aria-label="Search"
                      style={{
                        background: 'inherit', border: 'none', borderBottom: '2px solid black', outline: 'none', color: '#007bff',
                      }}
                    />
                    <button
                      type="submit"
                      style={{
                        backgroundColor: 'transparent', border: 'none', margin: 'none', outline: 'none',
                      }}
                    >
                      <i className="fa fa-search" aria-hidden="true" style={{ cursor: 'pointer', color: '#007bff' }} />
                    </button>
                  </form>
                  <SignedInLinks user={user} />
                </>
              )
              : <SignedOutLinks />}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default withRouter(Navbar);
