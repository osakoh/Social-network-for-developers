import React, { useContext } from "react";
import Moment from "react-moment";
import profileContext from "../context/Profile/profileContext";
import { RiDeleteBack2Line } from "react-icons/ri";

const Education = ({ education }) => {
  // init profile context
  const profileCtx = useContext(profileContext);

  // handles deleting of education
  const onDeleteClickHander = (eduId) => {
    profileCtx.deleteEducation(eduId);
  };

  const tableBody = education.map((edu) => (
    <tr key={edu._id}>
      <td>{edu.school}</td>
      <td>{edu.degree}</td>
      <td>
        <Moment format='DD/MMM/YYYY'>{edu.from}</Moment>
      </td>
      <td>
        {edu.to === null ? (
          "Current"
        ) : (
          <Moment format='DD/MMM/YYYY'>{edu.to}</Moment>
        )}
      </td>
      <td>
        <button
          className='btn btn-sm btn-danger'
          onClick={() => onDeleteClickHander(edu._id)}
        >
          <RiDeleteBack2Line style={{ fontSize: "1.30em" }} />
        </button>
      </td>
    </tr>
  ));

  return (
    <section className='container-fluid table-responsive'>
      <h4 className='mt-3 mb-2 text-center card-header rounded-3'>
        Education Credentials
      </h4>
      <table className='table table-hover table-sm'>
        <thead className='lead'>
          <tr>
            <th scope='col'>School</th>
            <th scope='col'>Degree</th>
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

export default Education;
