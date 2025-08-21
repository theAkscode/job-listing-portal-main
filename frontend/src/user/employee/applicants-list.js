import React, { useEffect, useState } from 'react';

import Applicants from './applicants';



const ApplicantList = (props) =>{
  const {jobId}=props;

  const [applicantList,setApplicantList]=useState();

  useEffect(()=>{
    const getEmpList = async () =>{
      try{
        const res = await fetch(`http://localhost:5000/api/employee/job/${jobId}`);
        const data=await res.json()
        setApplicantList(data)
      } catch(err){
        console.log(err);
      }
    }
    getEmpList()
  },[jobId])

  if(!applicantList){
    return <h3>No Applicants so far</h3>
  }
  return (
    <table className='table table-hover'>
      <thead>
        <tr>
          <td>Name</td>
          <td>Email</td>
          <td>Location</td>
        </tr>
      </thead>
      <tbody>
          {applicantList.map(a=>
            <Applicants key={a._id} applicant={a}/>
          )}
      </tbody>
    </table>
  )

}

export default ApplicantList;