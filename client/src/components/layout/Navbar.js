import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../contexts/auth/authContext";
import GithubContext from "../../contexts/github/githubContext";
import PropTypes from "prop-types";

const Navbar = ({ name, icon }) => {
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const { clearState } = useContext(GithubContext);

  const onLogout = () => {
    logout();
    clearState();
  };

  return (
    <nav className='navbar bg-primary'>
      <h3>
        <i className={icon}></i> {name}
      </h3>
      {isAuthenticated ? (
        <ul>
          <li className='m-1'>
            <h4>Hello {user && user.name}</h4>
          </li>
          <li className='m-1'>
            <Link to='/login' onClick={onLogout}>
              <i className='fas fa-sign-out-alt'></i> Logout
            </Link>
          </li>
        </ul>
      ) : (
        notAuthenticated
      )}
    </nav>
  );
};

const notAuthenticated = (
  <ul>
    <li className='m-1'>
      <Link to='/register'>Register</Link>
    </li>
    <li className='m-1'>
      <Link to='/login'>Login</Link>
    </li>
  </ul>
);

Navbar.defaultProps = {
  name: "Github Search",
  icon: "fab fa-github",
};

Navbar.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

export default Navbar;
