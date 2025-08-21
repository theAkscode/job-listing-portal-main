import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Card from '../../shared/UI/Card';
import { useParams } from 'react-router-dom';

const EmployeeDetails = () =>{

    const [emp,setEmp]=useState();

    const {employeeId}=useParams();

    useEffect(()=>{
        const getEmp = async ()=>{
            try{
                const res=await fetch(`http://localhost:5000/api/employee/${employeeId}`);
                const data=await res.json();
                setEmp(data);
            } catch(err){
                console.log(err);
            }
        }
        getEmp();
    },[employeeId])

    if(!emp){
        return (
            <h1 className='text-muted'>...Loading</h1>
        )
    }
    console.log(emp)

    return(
        <div className='container-md col-lg-8'>
        <Card
            classnames="m-3 p-3 shadow"
            header='Applicant Details'
        >
            <div className='px-4 row'>  
                <div className='col-12'>
                    <h4 className='text-muted'>Basic Details</h4>
                    <div>
                        <b>Name</b>
                        <p>{emp.name}</p>
                    </div>
                    <div>
                        <b>Email</b>
                        <p>{emp.email}</p>
                    </div>
                    <div>
                        <b>Location</b>
                        <p>{emp.location}</p>
                    </div>
                </div>
                
                <div className='row mb-3'>
                    <h4 className='text-muted'>Experience</h4>
                    {emp.experience && emp.experience.map((exp,index)=>
                        <div key={index} className='col-4 col-md-3 border rounded p-2'>
                            <div>
                                <b>Company</b>
                                <p>{exp.company}</p>
                            </div>
                            <div>
                                <b>Position</b>
                                <p>{exp.position}</p>
                            </div>
                            <div>
                                <b>Start Date</b>
                                <p>{exp.startDate}</p> 
                            </div>
                            <div>
                                <b>End Date</b>
                                <p>{exp.endDate}</p>
                            </div>
                            <div> 
                                <b>Salary</b>
                                <p>{exp.salary}</p>
                            </div>
                        </div>
                    )}
                </div>
                
                <div className='row mb-3'>
                    <h4 className='text-muted'>Education</h4>
                    {emp.education && emp.education.map((edu,index)=>
                        <div key={index} className='col-4 col-md-3 border rounded p-2'>
                            <div>
                                <b>Institute</b>
                                <p>{edu.institution}</p>
                            </div>
                            <div>
                                <b>Degree</b>
                                <p>{edu.degree}</p>
                            </div>
                            <div> 
                                <b>CGPA</b>
                                <p>{edu.cgpa}</p>
                            </div>
                            <div>
                                <b>Start Date</b>
                                <p>{edu.startDate}</p> 
                            </div>
                            <div>
                                <b>End Date</b>
                                <p>{edu.endDate}</p>
                            </div>
                        </div>
                    )}
                </div>

                <h4 className='text-muted'>Skills</h4>
                <div className='mb-3 row'>
                    {emp.skills && emp.skills.map(skill=><span className='col-2 col-md-1 m-2 badge bg-primary'>{skill}</span>)}
                </div>

                <hr />
                <div className='d-flex'>
                    <h5><Link to={emp.linkedin} target='__blank' className='text-decoration-none me-3'>Linkedin</Link></h5>
                    <h5><Link to={emp.gitHub} target='__blank' className='text-decoration-none text-success'>GitHub</Link></h5>
                </div>
            </div>
        </Card>
        </div>
    )
}

export default EmployeeDetails;