import React, { useContext } from "react";
import UserItem from "./UserItem";
import Spinner from "../layout/Spinner";
import GithubContext from "../../contexts/github/githubContext";

const Users = () => {
  const { users, loading } = useContext(GithubContext);
  return loading ? (
    <Spinner />
  ) : (
    <div className='container' style={userStyle}>
      {users.map((user) => (
        <div key={user.id}>
          <UserItem user={user} />
        </div>
      ))}
    </div>
  );
};

const userStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gridGap: "1rem",
};

export default Users;
