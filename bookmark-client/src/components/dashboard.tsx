import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { RouteComponentProps } from 'react-router-dom';
import BookmarkList from './BookmarkList';
import { UserContext } from '../contexts/curUser';
import { BookmarkContext } from '../contexts/bookmark';

interface DashboardProps extends RouteComponentProps {
  search: string;
  clearSearch: (data: boolean) => void
}

const Dashboard: React.FC<DashboardProps> = ({
  search, history, clearSearch,
}) => {
  const { setUser } = useContext(UserContext);
  const { bookmarks, setBookmarks } = useContext(BookmarkContext);
  const [form, setForm] = useState(false);
  const [formData, setFormData] = useState({ title: '', url: '', selection: '' });

  const fetchBookmarks = async () => {
    const response = await axios.get('/api/bookmark/');
    if (response.data) {
      setBookmarks(response.data);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get('/api/user');
      if (response.data && response.data.user) {
        setUser({
          login: true, username: response.data.user.username, name: response.data.user.name,
        });
      } else {
        history.push('/login');
      }
    };
    fetchUser();
    fetchBookmarks();
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios.post('/api/bookmark', { ...formData })
      .then(() => {
        setBookmarks([
          ...bookmarks, { ...formData, _id: String(Date.now()), created_date: new Date() },
        ]);
        setForm(false);
        setFormData({ title: '', url: '', selection: '' });
      })
      .catch(() => {
        setForm(false);
        setFormData({ title: '', url: '', selection: '' });
      });
  };

  const [modal, setModal] = useState({ url: '', selection: '', title: '' });

  const formdata = form ? (
    <form className="form mb-4" onSubmit={handleFormSubmit}>
      <div className="row">
        <div className="form-group col-6 col-md-3">
          <input type="text" className="form-control" value={formData.title} onChange={(e) => { setFormData({ ...formData, title: e.target.value }); }} id="title" placeholder="Title" />
        </div>
        <div className="form-group col-6 col-md-3">
          <input type="url" className="form-control" value={formData.url} onChange={(e) => { setFormData({ ...formData, url: e.target.value }); }} id="url" placeholder="url" />
        </div>
        <div className="form-group col-6 col-md-3">
          <input type="text" className="form-control" value={formData.selection} onChange={(e) => { setFormData({ ...formData, selection: e.target.value }); }} id="selectedText" placeholder="Text" />
        </div>
        <div className="form-group col-6 col-3">
          <button type="submit" className="btn btn-primary text-white">Insert</button>
        </div>
      </div>
    </form>
  ) : null;

  const clearSearchBtn = search ? (
    <p className="text-center text-danger pointer" onClick={() => { fetchBookmarks(); clearSearch(false); }}>
      <i className="fa fa-close" />
      {' '}
      Clear Search
    </p>
  ) : null;

  return (
    <div className="container">
      <div className="text-center">
        <h1 style={{ color: '#6c7ae0' }}>BookMark Store</h1>
      </div>
      {clearSearchBtn}
      <br />
      {(bookmarks && bookmarks.length > 0) ? (
        <>
          <div>
            <table className="table table-responsive table-bordered shadow" id="style-4" style={{ borderRadius: '15px', maxHeight: '80vh' }}>
              <thead className="text-white text-center w-100">
                <tr>
                  <th scope="col" style={{ position: 'sticky', top: '0', backgroundColor: '#6c7ae0' }}>Title</th>
                  <th scope="col" style={{ position: 'sticky', top: '0', backgroundColor: '#6c7ae0' }}>Website Url</th>
                  <th scope="col" style={{ position: 'sticky', top: '0', backgroundColor: '#6c7ae0' }}>Selected Text</th>
                </tr>
              </thead>
              <tbody>
                <BookmarkList enableModal={setModal} />
              </tbody>
            </table>
          </div>
          <div className={form ? 'd-none row justify-content-center' : 'row justify-content-center'} style={{ position: 'relative', top: '-30px', zIndex: 2 }}>
            <button className="btn btn-lg text-white rounded-pill" onClick={() => { setForm(true); }} style={{ backgroundColor: '#6c7ae0' }}>New Bookmark </button>
          </div>
          {formdata}
          <div className="modal fade" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered">
              <div className="modal-content" style={{ borderRadius: '15px' }}>
                <div className="modal-header" style={{ backgroundColor: '#6c7ae0' }}>
                  <h5 className="modal-title text-white" id="exampleModalLabel">{modal.title}</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div
                  className="modal-body"
                  style={{
                    padding: '10px', position: 'relative', height: '300px', overflowY: 'scroll',
                  }}
                >
                  {modal.selection}
                </div>
                <div className="modal-footer">
                  <a href={modal.url} target="_blank" rel="noreferrer">Visit Site</a>
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>

        </>
      ) : (
        <div>
          <img src="https://itinerantnotes.com/blog/images/empty.gif" className="img-fluid mx-auto d-block" alt="" />
          <h5 className="text-center text-primary">1. Select text and right click 2. Press add to Bookmark store 3. Save your bookmarks </h5>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
