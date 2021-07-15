import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className='mt-5 text-center'>
      <h1 className='display-5'>Page Not Found</h1>
      <p>Sorry, this user does not exist</p>
      <p>
        Click <Link to='/dashboard'>here</Link> to return to homepage
      </p>
    </div>
  );
};

export default NotFound;
