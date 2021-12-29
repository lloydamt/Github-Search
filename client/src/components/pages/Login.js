import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../contexts/auth/authContext";
import AlertContext from "../../contexts/alert/alertContext";

const Login = () => {
  const navigate = useNavigate();
  const { login, error, clearError, isAuthenticated, loadUser } =
    useContext(AuthContext);
  const { setAlert } = useContext(AlertContext);
  const [state, setInput] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (localStorage.token) {
      loadUser();
    }

    if (error) {
      setAlert(error);
      clearError();
    }

    if (isAuthenticated) {
      navigate("/");
    }
    //eslint-disable-next-line
  }, [isAuthenticated, error]);

  const onInputChange = (e) => {
    setInput({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    login(state);
  };

  const { email, password } = state;

  return (
    <div className='form-container'>
      <h1 className='text-dark'>Login</h1>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <input
            type='email'
            name='email'
            value={email}
            placeholder='Email'
            onChange={onInputChange}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            name='password'
            value={password}
            placeholder='Password'
            onChange={onInputChange}
            required
          />
        </div>
        <input
          type='submit'
          value='Login'
          className='btn btn-lg btn-block bg-dark'
        />
      </form>
    </div>
  );
};

export default Login;
