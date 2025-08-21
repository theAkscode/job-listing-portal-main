import React from 'react';
import {Link} from 'react-router-dom';

import TimeAgo from '../../shared/Util/TimeAgo';
import Number from '../../shared/Util/Number';

import Card from '../../shared/UI/Card';

const JobItem = (props) =>{

    const {job}=props;

    const timeAgo=<TimeAgo date={new Date(job.posted)} />

    const applicantsCount = job.applicants ? job.applicants.length : 0;

    return ( 
        <Link to={`/jobs/${job._id}`} className='text-dark text-decoration-none'>
            <Card
                classnames="mb-4"
                title={job.title}
                company={job.company}
                footer={timeAgo}>
                <p className='bi bi-person-fill mb-1'><Number num={applicantsCount}/> {applicantsCount===1 ? 'Person Applied':'People Applied'}</p>
                <p className='bi bi-clock mb-1'> {job.type}</p>
                <p className='bi bi-geo-alt mb-1'> {job.location.length>1 ? `${job.location.length} locations`:job.location }</p>
            </Card>
        </Link>
        
    )
}

export default JobItem;