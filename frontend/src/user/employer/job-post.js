import React, { useContext, useState } from 'react';
import Input from '../../shared/FormElems/Input';
import Button from '../../shared/FormElems/Button';

import {AuthContext} from '../../shared/context/auth-context';

const JobPost = () => {

    const auth=useContext(AuthContext);
  
    const [formData, setFormData] = useState({
        title: '',
        company: '',
        type: '',
        experience: '',
        education: '',
        salary: '',
        location: '',
        description: '',
        skills: [''],
        roles: ['']
    });

    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };


    const handleAddSkill = () => {
        setFormData((prevData) => ({
            ...prevData,
            skills: [...prevData.skills, '']
        }));
    };

    const handleSkillChange = (index, value) => {
        const newSkills = [...formData.skills];
        newSkills[index] = value;
        setFormData((prevData) => ({
            ...prevData,
            skills: newSkills
        }));
    };


    const handleAddResponsibility = () => {
        setFormData((prevData) => ({
            ...prevData,
            roles: [...prevData.roles, '']
        }));
    };

    const handleResponsibilityChange = (index, value) => {
        const newRoles = [...formData.roles];
        newRoles[index] = value;
        setFormData((prevData) => ({
            ...prevData,
            roles: newRoles
        }));
    };

    const postHandler = async event =>{
        event.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/api/jobs/${auth.userTypeId}/new`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Failed to post the job');
            }
        } catch (err) {
            console.error('Error posting job:', err);
        }
        
    }

    return (
        <div className='container-lg col-lg-8'>
            <div className='m-3 p-3 shadow rounded'>
                <h2 className='text-center'>Post a Job</h2>
                <form onSubmit={postHandler}>
                    <div className='row'>
                        <div className='col-sm-6'>
                            <Input
                                label='Job Title'
                                type='input'
                                name='title'
                                value={formData.title}
                                required='required'
                                onChange={handleChange}
                            />
                        </div>
                        <div className='col-sm-6'>
                            <Input
                                label='Company'
                                type='input'
                                name='company'
                                required='required'
                                value={formData.company}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='col-sm-6'>
                            <Input
                                label='Type'
                                type='input'
                                name='type'
                                required='required'
                                value={formData.type}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='col-sm-6'>
                            <Input
                                label='Required Experience'
                                type='input'
                                name='experience'
                                required='required'
                                value={formData.experience}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='col-sm-6'>
                            <Input
                                label='Minimum Education'
                                type='input'
                                name='education'
                                required='required'
                                value={formData.education}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='col-sm-6'>
                            <Input
                                label='Salary'
                                type='input'
                                required='required'
                                name='salary'
                                value={formData.salary}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <Input
                                label='Location'
                                type='input'
                                name='location'
                                required='required'
                                value={formData.location}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <Input
                                label='Description'
                                type='input'
                                name='description'
                                required='required'
                                value={formData.description}
                                onChange={handleChange}
                            />
                        </div>

                        <div className='row'>
                            <div className='col-10'>
                                {formData.skills.map((skill, index) => (
                                    <Input
                                        key={index}
                                        label={`Skill ${index + 1}`}
                                        type='input'
                                        required='required'
                                        value={skill}
                                        onChange={(e) => handleSkillChange(index, e.target.value)}
                                    />
                                ))}
                            </div>
                            <div className='col-2 pt-3'>
                                <i className='bi bi-plus-circle' onClick={handleAddSkill} style={{ cursor: 'pointer' }}></i>
                            </div>
                        </div>

                        <div className='row'>
                            <div className='col-10'>
                                {formData.roles.map((role, index) => (
                                    <Input
                                        key={index}
                                        label={`Responsibility ${index + 1}`}
                                        type='input'
                                        required='required'
                                        value={role}
                                        onChange={(e) => handleResponsibilityChange(index, e.target.value)}
                                    />
                                ))}
                            </div>
                            <div className='col-2 pt-3'>
                                <i className='bi bi-plus-circle' onClick={handleAddResponsibility} style={{ cursor: 'pointer' }}></i>
                            </div>
                        </div>
                    </div>
                    <Button type='submit' className='btn-primary'>Post Job</Button>
                </form>
            </div>
        </div>
    );
}

export default JobPost;
