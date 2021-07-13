import React from "react";
import Moment from "react-moment";

const Experience = ({ experience }) => {
  const tableBody = experience.map((exp) => (
    <tr key={exp._id}>
      <td>{exp.company}</td>
      <td>{exp.title}</td>
      <td>{/* <Moment format='DD/MM/YYYY'>{exp.from}</Moment> */}</td>
      <td>
        {exp._id}
        <button className='btn btn-sm btn-danger'>Delete</button>
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
            <th scope='col'>Years</th>
            <th />
          </tr>
        </thead>
        <tbody className='h6 align-baseline'>{tableBody}</tbody>
      </table>
    </section>
  );
};

export default Experience;
