import React from 'react';
import { Link } from 'react-router-dom';

import JobItemList from '../../user/employer/job-item-list';

import Card from '../UI/Card';
import Button from '../FormElems/Button';

const commonDashboard = (props) =>{

    return (
        <div>

            <Card classnames='p-3 m-3 shadow-sm bg-dark text-white'>
                <h2>Find Your Next Career Move</h2>
                <p className='text-white-75'>Discover thousands of job opportunities tailored to your skills and aspirations. Connect with top employers and take the next step in your career journey.</p>
                <Link to='/jobs'><Button className='btn btn-outline-primary'>Explore Jobs</Button></Link>
            </Card>

            <div className='m-3 row row-cols-1 row-cols-md-2'>
                <Card>
                    <h2>Freelancers, Your Next Project Awaits</h2>
                    <p className='text-muted'>Connect with clients, showcase your skills, and secure projects that match your expertise. Your freelance career starts here.</p>
                    <Link to='/auth'><Button className='btn btn-primary'>Sign up now to apply</Button></Link>
                </Card>
                
                <Card>
                    <h2>Hire the Best Talent</h2>
                    <p className='text-muted'>Post your job openings and find the perfect candidates from our extensive network of professionals. Simplify your hiring process with our advanced tools.</p>
                    <Link to='/auth'><Button className='btn btn-primary'>Login to Post a job</Button></Link>
                </Card>
            </div>

            <Card classnames='p-3 m-3'>
                <div className='d-flex justify-content-between'>
                    <h2 className='mb-4'>Here are some popular jobs right now </h2>
                    <Link to='/jobs'><Button className='btn btn-outline-primary'>Find More</Button></Link>
                </div>
                <div className='row row-cols-1 row-cols-md-2'>
                    <JobItemList jobs={props.jobs.slice(0,4) || []}/>
                </div>
            </Card>
        </div>
    )
}

export default commonDashboard;