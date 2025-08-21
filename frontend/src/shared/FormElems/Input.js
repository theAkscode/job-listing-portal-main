import React from 'react';

const Input = (props) =>{
    const id = `${props.name}-${Math.random()}`;
    return (
        <div className='form-floating mb-3'>
            <input
                className={`form-control shadow-none  ${props.classnames}`} 
                id={id}
                type={props.type} 
                name={props.name}
                value={props.value}
                required={props.required}
                placeholder={props.placeholder || 'enter here'}
                minLength={props.min}
                maxLength={props.max}
                onChange={props.onChange}
            />
            <label className='form-label' htmlFor={id}>{props.label}</label>
            <div className='invalid-feedback'>{props.invalid}</div>
        </div>
    )
}

export default Input;