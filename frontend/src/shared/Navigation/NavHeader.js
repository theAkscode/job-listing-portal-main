import React from 'react';
import {Link} from 'react-router-dom'

import NavLinks from './NavLinks';

const NavHeader = () =>{
    return (
        <div className='p-2 d-flex col-12'> 
            <Link to='/' className='col-3 align-self-center d-flex text-decoration-none text-dark'>
                <span className='px-2'>Job Portal</span>
            </Link>
            <NavLinks />
        </div>
    )
}

export default NavHeader;