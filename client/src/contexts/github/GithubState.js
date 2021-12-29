import { useReducer } from "react";
import GithubContext from "./githubContext";
import githubReducer from "./githubReducer";
import axios from "axios";
import {
  SEARCH_USERS,
  CLEAR_USERS,
  GET_USER,
  GET_REPOS,
  CLEAR_STATE,
  SET_LOADING,
  CLEAR_LOADING,
} from "../Types";

const GithubState = (props) => {
  const initialState = {
    users: [],
    loading: false,
    repos: [],
    user: null,
  };

  const [state, dispatch] = useReducer(githubReducer, initialState);

  // Functions
  const searchUsers = async (input) => {
    dispatch({ type: SET_LOADING });
    const res = await axios.get(`/api/search/${input}`);
    dispatch({ type: SEARCH_USERS, payload: res.data });
  };

  const getUser = async (username) => {
    setLoading();
    const res = await axios.get(`/api/users/${username}`);
    dispatch({ type: GET_USER, payload: res.data });
  };

  const getRepos = async (username) => {
    setLoading();
    const res = await axios.get(`/api/repos/${username}`);
    dispatch({ type: GET_REPOS, payload: res.data });
  };

  const setLoading = () => {
    dispatch({ type: SET_LOADING });
  };

  const clearLoading = () => {
    dispatch({ type: CLEAR_LOADING });
  };

  const clearUsers = () => {
    dispatch({ type: CLEAR_USERS });
  };

  const clearState = () => {
    dispatch({ type: CLEAR_STATE });
  };

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        loading: state.loading,
        repos: state.repos,
        searchUsers,
        clearUsers,
        getUser,
        clearLoading,
        getRepos,
        clearState,
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;
