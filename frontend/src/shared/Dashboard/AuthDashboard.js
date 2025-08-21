import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../context/auth-context';
import JobItemList from '../../user/employer/job-item-list';

import Card from '../UI/Card';
import Button from '../FormElems/Button';

const AuthDashboard = (props) =>{

    const auth=useContext(AuthContext);

    return (
        <div className='p-3 m-3'>
            <h1 className='text-center mb-3'>Welcome to your Dashboard</h1>
            <p className='text-center text-muted'> Here's what you can do </p>
            {auth.userType==='Employee' && 
                <>
                    <Card classnames='p-3 mb-3 shadow-sm bg-dark text-white'>
                        <h2>Find Your Next Career Move</h2>
                        <p className='text-white-75'>Discover thousands of job opportunities tailored to your skills and aspirations. Connect with top employers and take the next step in your career journey.</p>
                        <Link to='/jobs'><Button className='btn btn-outline-primary'>Explore Jobs</Button></Link>
                    </Card>
                    <Card classnames='p-3 mb-3 shadow-sm'>
                        <h2>Freelancers, Your Next Project Awaits</h2>
                        <p>Connect with clients, showcase your skills, and secure projects that match your expertise. Your freelance career starts here.</p>
                        <Link to='/jobs'><Button className='btn btn-outline-primary'>Apply now</Button></Link>
                    </Card>
                </>
            }
            {auth.userType === 'Employer' &&
                <>
                    <Card classnames='p-3 mb-3 shadow-sm bg-dark text-white'>
                        <h2>Build Your Dream Team Today</h2>
                        <p className='text-white-75'>Access a vast pool of skilled professionals ready to contribute to your company’s success. Streamline your hiring process and find the right talent faster.</p>
                        <Link to='/job/new'><Button className='btn btn-outline-primary'>Post Jobs</Button></Link>
                    </Card>
                    <Card classnames='p-3 mb-3 shadow-sm'>
                        <h2>Hire the Best Talent</h2>
                        <p className='text-muted'>Post your job openings and find the perfect candidates from our extensive network of professionals. Simplify your hiring process with our advanced tools.</p>
                        <Link to={`/jobs/${auth.userTypeId}/posted`}><Button className='btn btn-outline-primary'>Start Hiring</Button></Link>
                    </Card>
                </>
            }
           <div className='shadow p-3 mb-3'>
    {Array.isArray(props.filtered) && props.filtered.length > 0 ? (
        <>
            <h3 className='mb-3'>Here are your {auth.userType==='Employee' ? 'applied' : 'posted'} jobs</h3>
            <div className='row row-cols-1 row-cols-md-2'>
                <JobItemList jobs={props.filtered.slice(0,4)}/>
            </div>
        </>
    ) : (
        <h3>You haven't {auth.userType==='Employee' ? 'applied to' : 'posted'} any jobs yet </h3>
    )}
</div>

            <div className='shadow p-3 mb-3'>
                <h3 className='mb-3'>Latest Jobs</h3>
                <div className='row row-cols-1 row-cols-md-2'>
                    <JobItemList jobs={props.jobs? props.jobs.slice(0,4) : []}/>
                </div>
            </div>
        </div>
    )
}

export default AuthDashboard;