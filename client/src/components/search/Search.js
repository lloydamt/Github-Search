import React, { useState, useContext } from "react";
import GithubContext from "../../contexts/github/githubContext";
import AlertContext from "../../contexts/alert/alertContext";

const Search = () => {
  const { searchUsers, users, clearUsers } = useContext(GithubContext);
  const { setAlert, removeAlert } = useContext(AlertContext);
  const [input, setInput] = useState("");

  const onInputChange = (e) => {
    setInput(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (input === "") {
      setAlert("Please enter something", "light");
    } else if (input.length > 0) {
      removeAlert();
      searchUsers(input);
    }
  };

  const clearClick = () => {
    clearUsers();
    setInput("");
  };
  return (
    <div className='container'>
      <form onSubmit={onSubmit}>
        <input
          type='text'
          name='search'
          placeholder='Search...'
          value={input}
          onChange={onInputChange}
        />
        <input
          type='submit'
          value='Submit'
          className='btn btn-block btn-dark'
        />
      </form>
      {users.length > 0 && (
        <input
          type='button'
          value='Clear'
          className='btn btn-block btn-light'
          onClick={clearClick}
        />
      )}
    </div>
  );
};

export default Search;
