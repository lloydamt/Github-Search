import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const UserItem = ({ user: { avatar_url, login } }) => {
  return (
    <div className='card text-center'>
      <img
        src={avatar_url}
        className='round-img'
        style={{ width: "60px" }}
        alt='avatar'
      />
      <h3>{login}</h3>
      <div>
        <Link to={`/users/${login}`} className='btn btn-dark btn-sm my-1'>
          More
        </Link>
      </div>
    </div>
  );
};

UserItem.propTypes = {
  user: PropTypes.object.isRequired,
};

export default UserItem;
