import React, { useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import Spinner from "../layout/Spinner";
import Repos from "../repos/Repos";
import GithubContext from "../../contexts/github/githubContext";
import AuthContext from "../../contexts/auth/authContext";

const UserPage = () => {
  const { loadUser } = useContext(AuthContext);
  const { username } = useParams();
  const { getUser, user, loading, getRepos, repos } = useContext(GithubContext);

  useEffect(() => {
    loadUser();
    getUser(username);
    getRepos(username);
    //eslint-disable-next-line
  }, []);

  if (loading) return <Spinner />;

  return (
    user && (
      <div>
        <Link to='/' className='btn btn-light'>
          Back To Search
        </Link>
        Hireable:{" "}
        {user.hireable ? (
          <i className='fas fa-check text-success'></i>
        ) : (
          <i className='fas fa-times-circle text-danger' />
        )}
        <div className='card grid-2'>
          <div className='all-center'>
            <img
              src={user.avatar_url}
              className='round-img'
              alt=''
              style={{ width: "150px" }}
            />
            <h1>{user.name}</h1>
            <p>Location: {user.location} </p>
          </div>
          <div>
            {user.bio && (
              <div>
                <h3>Bio</h3>
                <p>{user.bio}</p>
              </div>
            )}
            <a href={user.html_url} className='btn btn-dark my-1'>
              Visit Github Profile
            </a>
            <ul>
              <li>
                {user.login && (
                  <div>
                    <strong>Username: </strong>
                    {user.login}
                  </div>
                )}
              </li>
              <li>
                {user.login && (
                  <div>
                    <strong>Company: </strong>
                    {user.company}
                  </div>
                )}
              </li>
              <li>
                {user.login && (
                  <div>
                    <strong>Website: </strong>
                    {user.blog}
                  </div>
                )}
              </li>
            </ul>
          </div>
        </div>
        <div>
          <div className='card text-center'>
            <div className='badge badge-primary'>
              Followers: {user.followers}
            </div>
            <div className='badge badge-success'>
              Following: {user.following}
            </div>
            <div className='badge badge-light'>
              Public Repos: {user.public_repos}
            </div>
            <div className='badge badge-dark'>
              Public Gists: {user.public_gists}
            </div>
          </div>
        </div>
        <div className='text-center'>
          <Repos repos={repos} />
        </div>
      </div>
    )
  );
};
export default UserPage;
