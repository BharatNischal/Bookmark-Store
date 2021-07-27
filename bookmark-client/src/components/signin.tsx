import React, { useState, useContext } from 'react';
import axios from 'axios';
// eslint-disable-next-line import/no-extraneous-dependencies
import { RouteComponentProps } from 'react-router';
import { UserContext } from '../contexts/curUser';

const SignIn: React.FC<RouteComponentProps> = ({ history }) => {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const { setUser } = useContext(UserContext);

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    setErr('');
    const userData = { username, name, password };
    if (username && password) {
      setPassword('');
      setUsername('');
      setName('');
      axios.post('/api/register', { ...userData })
        .then((res) => {
          if (res.data.success) {
            console.log('sign up successfully', res);
            const { username, name } = res.data.user;
            setUser({ username, name, login: true });
            history.push('/');
          } else {
            setErr(res.data.err);
          }
        })
        .catch((error) => {
          console.log(error);
          setErr('Server Error');
        });
    }
  };

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-sm-2 col-lg-4" />
        <div className="col-sm-8 col-lg-4 shadow rounded">
          <br />
          <h1 className="text-center" style={{ color: '#6c7ae0' }}>Sign Up</h1>
          <form onSubmit={submitForm}>
            <div className="form-group">
              <input type="email" className="form-control form-control-lg" name="username" id="username" value={username} onChange={(e) => { setUsername(e.target.value); }} placeholder="Email" />
            </div>
            <div className="form-group">
              <input type="email" className="form-control form-control-lg" name="name" id="name" value={name} onChange={(e) => { setName(e.target.value); }} placeholder="Name" />
            </div>
            <div className="form-group">
              <input type="password" className="form-control form-control-lg" name="password" id="password" value={password} onChange={(e) => { setPassword(e.target.value); }} placeholder="Password" />
            </div>
            <div className="row justify-content-center">
              <button type="button" className="btn btn-lg text-white rounded" style={{ backgroundColor: '#6c7ae0' }}>Sign Up </button>
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

export default SignIn;
