import React, { useContext } from "react";
import Moment from "react-moment";
import profileContext from "../context/Profile/profileContext";
import { RiDeleteBack2Line } from "react-icons/ri";

const Experience = ({ experience }) => {
  // init profile context
  const profileCtx = useContext(profileContext);

  // handles deleting of experience
  const onDeleteClickHander = (expId) => {
    profileCtx.deleteExperience(expId);
  };

  const tableBody = experience.map((exp) => (
    <tr key={exp._id}>
      <td>{exp.company}</td>
      <td>{exp.title}</td>
      <td>
        <Moment format='DD/MMM/YYYY'>{exp.from}</Moment>
      </td>
      <td>
        {exp.to === null ? (
          "Current"
        ) : (
          <Moment format='DD/MMM/YYYY'>{exp.to}</Moment>
        )}
      </td>
      <td>
        <button
          className='btn btn-sm btn-danger'
          onClick={() => onDeleteClickHander(exp._id)}
        >
          <RiDeleteBack2Line style={{ fontSize: "1.30em" }} />
        </button>
      </td>
    </tr>
  ));

  return (
    <section className='container-fluid table-responsive'>
      <h4 className='mt-3 mb-2 text-center card-header rounded-3'>
        Experience Credentials
      </h4>
      <table className='table table-hover table-sm'>
        <thead className='lead'>
          <tr>
            <th scope='col'>Company</th>
            <th scope='col'>Title</th>
            <th scope='col'>From</th>
            <th scope='col'>To</th>
            <th />
          </tr>
        </thead>
        <tbody className='h6 align-baseline'>{tableBody}</tbody>
      </table>
    </section>
  );
};

export default Experience;
