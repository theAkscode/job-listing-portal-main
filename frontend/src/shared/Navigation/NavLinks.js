import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { AuthContext } from '../context/auth-context';

import Button from '../FormElems/Button';

const NavNavLinks = () =>{

    const auth=useContext(AuthContext);

    return (
        <div className='d-flex justify-content-end col-9 nav nav-pills'>
            <NavLink to='/' className='nav-link'>Home</NavLink>
            <NavLink to='/jobs' className='nav-link'>Jobs</NavLink>
            {auth.isLoggedIn && auth.userType==='Employee' &&
                <NavLink to={`/profile/${auth.userTypeId}`} className='nav-link'>Profile</NavLink>
            }
            {auth.isLoggedIn && auth.userType==='Employer' &&
                <NavLink to='/job/new' className='nav-link'>New Job</NavLink>
            }
            {!auth.isLoggedIn &&
                <NavLink to='/auth' className='nav-link'>Login</NavLink>
            }
            {auth.isLoggedIn &&
                <Button to='/' className='btn-outline-danger mx-2' onClick={auth.logout}>Logout</Button>
            }
        </div>
    )
}

export default NavNavLinks;