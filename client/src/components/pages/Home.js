import React, { useEffect, useContext } from "react";
import Search from "../search/Search";
import Users from "../users/Users";

import AuthContext from "../../contexts/auth/authContext";

const Home = () => {
  const { loadUser } = useContext(AuthContext);

  useEffect(() => {
    loadUser();
    //eslint-disable-next-line
  }, []);

  return (
    <>
      <Search />
      <Users />
    </>
  );
};

export default Home;
