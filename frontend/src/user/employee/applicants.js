import React from 'react';
import {Link} from 'react-router-dom';

const Applicants = (props) =>{
    
    const {applicant}=props;
    return (
        <tr>
            <td><Link to={`/employee/${applicant._id}`} className='text-decoration-none'>{applicant.name}</Link></td>
            <td>{applicant.email}</td>
            <td>{applicant.location}</td>
        </tr>
    )
}

export default Applicants;