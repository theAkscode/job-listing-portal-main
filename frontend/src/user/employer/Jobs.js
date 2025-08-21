import React, { useContext} from 'react';

import { Link, useLocation } from 'react-router-dom';

import { AuthContext } from '../../shared/context/auth-context';
import JobItemList from '../../user/employer/job-item-list';
import Button from '../../shared/FormElems/Button';
import Animation from '../../shared/Util/Animation';

import './Jobs.css';

const Jobs = (props) =>{
    const auth=useContext(AuthContext);
    const location = useLocation();

    const globalActive = location.pathname === '/jobs'
    const appliedActive = location.pathname.startsWith(`/jobs/${auth.userTypeId}`);

    return (
        <div className=' m-3 p-3 shadow'>
            {!auth.isLoggedIn && <h3>Explore Jobs</h3>}
            {auth.isLoggedIn &&
                <ul className='nav'>
                    <Link to='/jobs'>
                        <Button className={`job-section-btn ${globalActive ? 'active' : ''}`} dataBsToggle='tab' ariaSelected={globalActive ? 'true' : 'false'} >Browse Jobs</Button>
                    </Link>
                    <Link to={`/jobs/${auth.userTypeId}/${auth.userType==='Employee' ? 'applied':'posted'}` }>
                        <Button className={`job-section-btn ${appliedActive ? 'active' : ''}`} dataBsToggle='tab' ariaSelected={appliedActive ? 'true' : 'false'}>
                            {auth.userType==='Employee' ? 'Applied Jobs' : 'Posted Jobs'}
                        </Button>
                    </Link>
                </ul>
            }
            <Animation>
                {props.jobs && 
                    <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 mt-3'>
                        <JobItemList jobs={props.jobs} applied={props.applied}/>
                    </div>
                }
            </Animation>
        </div>
    )
}

export default Jobs;