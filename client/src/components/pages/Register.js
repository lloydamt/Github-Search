import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../contexts/auth/authContext";
import AlertContext from "../../contexts/alert/alertContext";

const Register = () => {
  const navigate = useNavigate();
  const { register, isAuthenticated, loadUser, error, clearError } =
    useContext(AuthContext);
  const { setAlert } = useContext(AlertContext);

  const [state, setInput] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { name, email, password, confirmPassword } = state;

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

  const onChange = (e) => {
    const { name, value } = e.target;
    setInput({
      ...state,
      [name]: value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setAlert("Passwords do not match", "light");
    } else {
      register(state);
      setInput({ name: "", email: "", password: "", confirmPassword: "" });
    }
  };

  return (
    <div className='container'>
      <div className='form-container'>
        <h1>
          <span className='text-primary'>Register</span> User
        </h1>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <input
              type='text'
              name='name'
              value={name}
              onChange={onChange}
              placeholder='Name'
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='email'
              name='email'
              value={email}
              onChange={onChange}
              placeholder='Email'
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              name='password'
              value={password}
              onChange={onChange}
              placeholder='Password'
              minLength='6'
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              name='confirmPassword'
              value={confirmPassword}
              onChange={onChange}
              placeholder='Confirm Password'
              minLength='6'
              required
            />
          </div>
          <input
            type='submit'
            value='Register'
            className='btn btn-lg btn-block bg-dark'
          />
        </form>
      </div>
    </div>
  );
};

export default Register;
