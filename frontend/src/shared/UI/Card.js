import React,{useContext, useEffect, useState} from 'react';
import { NavLink, useParams } from 'react-router-dom';

import ArrowNav from '../Util/ArrowNav';
import Button from '../FormElems/Button';
import { AuthContext } from '../context/auth-context';

import './Card.css';

const Card = (props) =>{

    const auth=useContext(AuthContext);
    const {jobId}=useParams();

    const [didApply,setDidApply]=useState(false);
    
    useEffect(()=>{
        const applied = async () =>{
            try {
                const response = await fetch(`http://localhost:5000/api/jobs/${auth.userTypeId}/applied`);
                const data = await response.json();
                const job = data.filter(job => job._id === jobId);
                if(job[0].applicants.includes(auth.userTypeId)){
                    setDidApply(true);
                }
            } catch (err) {
                
            }
         }
         if(auth.userType==='Employee'){
            applied()
         }
    })

    const apply = async () =>{
        try{
            await fetch(`http://localhost:5000/api/jobs/${jobId}/apply`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({employeeId:auth.userTypeId})
            });
            setDidApply(true)
        } catch(err){
            console.log(err);
        } 
    }

    const applyBtn = (
        auth.userType==='Employee' &&
        <Button type='button' className={`btn ${didApply ? 'btn-primary' : 'btn-success'}`} onClick={apply} disabled={didApply} >{didApply ? 'Applied' : 'Apply'}</Button> 
        
    )

    return (
        <div className={`card ${props.classnames}`}>
            {props.header && 
                <div className='card-header bg-transparent border-0 d-flex justify-content-between align-items-center'>
                    <h4><ArrowNav dir={-1}/>{props.header}</h4>
                    {auth.isLoggedIn ? 
                        applyBtn
                        :
                        <NavLink to='/auth' className='btn btn-outline-primary' >Login to Apply</NavLink>
                    }
                </div>
            }
            <div className='card-body'>
                {props.title && 
                    <div className='header d-flex'>
                        {props.company && <b className='border border-3 fs-1 me-3 rounded'>{props.company[0]}</b>}
                        <div className='card-title'>
                            <h5>{props.title}</h5>
                            <p className='text-muted'>{props.company}</p>
                        </div>
                    </div>
                }
                <p className='card-text'>{props.text}</p>
                {props.children}
            </div>
            {props.footer && <div className='card-footer bg-transparent text-muted'>{props.footer}</div>}
        </div>
    )
}

export default Card;