import React from 'react';

const Button = (props) =>{
    return (
        <button 
            className={`btn shadow-none ${props.className}`}
            type={props.type}
            onClick={props.onClick}
            role={props.role}
            aria-selected={props.ariaSelected}
            data-bs-toggle={props.dataBsToggle}
        >
            {props.children}
        </button>
    )
}

export default Button;