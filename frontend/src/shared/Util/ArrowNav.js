import {Link,useNavigate } from 'react-router-dom';

const ArrowNav = (props) =>{
    const navigate=useNavigate();

    return (
        <Link className='bi bi-chevron-left text-dark me-3' onClick={()=>navigate(props.dir)}></Link>
    )
}

export default ArrowNav;