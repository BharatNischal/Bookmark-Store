import React, { useState, useContext } from 'react';
import axios from 'axios';
import { RouteComponentProps } from 'react-router-dom';
import { UserContext } from '../contexts/curUser';

const LogIn: React.FC<RouteComponentProps> = ({ history }) => {
  const [username, setUsername] = useState('');
  const [err, setErr] = useState('');
  const [password, setPassword] = useState('');
  const [reset, setResest] = useState(false);
  const [btnclick, setBtnclick] = useState(false);
  const { setUser } = useContext(UserContext);

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    setErr('');
    const userData = { username, password };
    if (reset) {
      axios.post('/api/forget', { username })
        .then((res) => {
          if (res.data.success) {
            setErr('Check your mail');
            setUsername('');
            setBtnclick(false);
          } else {
            setErr(res.data.msg);
            setBtnclick(false);
          }
        })
        .catch((error) => {
          setErr(error.msg);
          setBtnclick(false);
        });
    } else if (password !== '') {
      setPassword('');
      setUsername('');
      axios.post('/api/login', { ...userData })
        .then((res) => {
          if (res.data.success) {
            console.log('sign up successfully', res.data.user);
            setUser({ login: true, username: res.data.user.username, name: res.data.user.name });
            setBtnclick(false);
            history.push('/');
          } else console.log(res);
          setBtnclick(false);
          setErr('invalid Username or password');
        })
        .catch((error) => {
          console.error(error.message);
          setBtnclick(false);
          setErr('Server error');
        });
    }
  };

  let button;
  if (!btnclick) {
    button = (
      <button type="submit" className="btn btn-lg text-white rounded" style={{ backgroundColor: '#6c7ae0' }} onClick={() => { setBtnclick(true); }}>
        {reset ? 'Reset' : 'Log In'}
        {' '}
      </button>
    );
  } else {
    button = (
      <button type="submit" className="btn btn-lg text-white rounded" style={{ backgroundColor: '#6c7ae0' }}>
        <img src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/35771931234507.564a1d2403b3a.gif" className="loader" alt="loader" />
      </button>
    );
  }

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-sm-2 col-lg-4" />
        <div className="col-sm-8 col-lg-4 shadow rounded">
          <br />
          <h1 className="text-center" style={{ color: '#6c7ae0' }}>{reset ? 'Reset' : 'Log In'}</h1>
          <form onSubmit={submitForm}>
            <div className="form-group">
              <input type="email" className="form-control form-control-lg" name="username" id="username" value={username} onChange={(e) => { setUsername(e.target.value); }} placeholder="Email" required />
            </div>
            <div className="form-group">
              <input type="password" className={reset ? 'd-none' : 'form-control form-control-lg'} name="password" id="password" value={password} onChange={(e) => { setPassword(e.target.value); }} placeholder="Password" />
            </div>
            <a className="pointer text-primary float-right btn" onClick={() => { setResest(!reset); }}>{reset ? 'Log In' : 'Forgot Password'}</a>
            <div className="form-group row">
              {button}
            </div>
          </form>
          <h6 className="text-danger text-center">{err}</h6>
          <br />
        </div>
        <div className="col-sm-2 col-lg-4" />
      </div>
    </div>
  );
};

export default LogIn;
