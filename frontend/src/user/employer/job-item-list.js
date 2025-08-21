import React from 'react';

import JobItem from './job-item';

const JobItemList = (props) =>{
        
    
    return props.jobs.length>0 ? (
        <React.Fragment>
            {props.jobs.map((job)=>(
                <JobItem key={job._id} job={job}/>
            ))}
        </React.Fragment>
    ) : (<div className=' text-muted'>No jobs yet</div>)

}

export default JobItemList;