import React, { useRef, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Spinner from "../../layout/Spinner";
import githubContext from "../../context/github/githubContext";

// props.match.params.handle
const ProfileGithub = ({ username }) => {
  const gitHubRef = useRef();
  // init useHistory
  // initialise GithubContext
  const githubCtx = useContext(githubContext);
  // destructure from github context
  const {
    getUserRepos,
    getSingleUser,
    repos,
    loading,
    user: { followers, following, public_repos, public_gists },
  } = githubCtx;

  // make request immediately component loads in the DOM
  useEffect(() => {
    // get profile of current user
    if (username) {
      getSingleUser(username);
      getUserRepos(username);
    }

    // eslint-disable-next-line
  }, []);

  let repoItems;
  let badges;
  if (repos === null || loading) {
    repoItems = <Spinner className='container' />;
  } else {
    badges = (
      <div className='mt-2 mb-3'>
        <div className='mb-1 badge bg-primary'>Followers: {followers}</div>
        <div className='mb-1 badge bg-success'>Following: {following}</div>
        <div className='mb-1 badge bg-danger'>Public Repos: {public_repos}</div>
        <div className='mb-1 badge bg-dark'>Public Gists: {public_gists}</div>
      </div>
    );
    repoItems = repos.map((repo) => (
      <div key={repo.id} className='shadow p-3 bg-body rounded mb-3'>
        <div className='row'>
          <div className='col-md-6'>
            <h5>
              <Link to={repo.html_url} className='text-info' target='_blank'>
                {repo.name}
              </Link>
            </h5>
            <p>{repo.description}</p>
          </div>
          <div className='col-md-6'>
            <span className='badge bg-info mb-1 float-end'>
              Stars: {repo.stargazers_count}
            </span>
            <span className='badge bg-secondary mb-1 float-end'>
              Watchers: {repo.watchers_count}
            </span>
            <span className='badge bg-success mb-1 float-end'>
              Forks: {repo.forks_count}
            </span>
          </div>
        </div>
      </div>
    ));
  }

  return (
    <div ref={gitHubRef}>
      <h4>Latest Github Repos</h4>
      {badges}
      {repoItems}
    </div>
  );
};

ProfileGithub.propTypes = {
  username: PropTypes.string.isRequired,
};

export default ProfileGithub;
