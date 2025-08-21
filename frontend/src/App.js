import React,{useState,useCallback, useEffect} from 'react'
import {Routes,Route, Navigate, useLocation} from 'react-router-dom';

import NavMain from './shared/Navigation/navMain';
import CommonDashboard from './shared/Dashboard/commonDashboard';
import AuthDashboard from './shared/Dashboard/AuthDashboard';
import Jobs from './user/employer/Jobs';
import JobPost from './user/employer/job-post';
import JobDetails from './user/shared/job-details';
import Profile from './user/employee/Profile';
import Auth from './user/shared/Auth';
import { AuthContext } from './shared/context/auth-context';
import { AnimatePresence } from 'framer-motion';
import Animation from './shared/Util/Animation';
import EmployeeDetails from './user/employee/emp-details';

const App = () => {
  const isAuth=localStorage.getItem('isAuth');

  const [isLoggedIn, setIsLoggedIn] = useState(isAuth);

  const userType=localStorage.getItem('userType');
  const userTypeId=localStorage.getItem('userTypeId');

  const login = useCallback(()=>{
    setIsLoggedIn(true);
    localStorage.setItem('isAuth',true);
  },[])

  const logout = useCallback(()=>{
    setIsLoggedIn(false);
    localStorage.removeItem('isAuth');
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    localStorage.removeItem('userTypeId');
  },[])

  const [jobs,setJobs]=useState([]);
  const [filteredJobs,setFilteredJobs]=useState([]);

  useEffect(()=>{
      const fetchJobs=async ()=>{
          if(userType==='Employee'){
              try{
                  const res=await fetch(`http://localhost:5000/api/jobs/${userTypeId}/applied`);                    
                  const data=await res.json();
                  setFilteredJobs(data);
              } catch(err){
                  console.log(err);
              }
          } else if(userType==='Employer'){
              try{
                  const res=await fetch(`http://localhost:5000/api/jobs/${userTypeId}/posted`);
                  const data=await res.json();
                  setFilteredJobs(data);
              } catch(err){
                  console.log(err);
              }
          }
          const res=await fetch('http://localhost:5000/api/jobs');
          const data=await res.json();
          setJobs(data);
      }
      fetchJobs();
        
  },[userType,userTypeId])

  let routes;

  if (isLoggedIn){
    if(userType==='Employee'){
      routes = (
        <React.Fragment>
          <Route path='/' element={<Animation><AuthDashboard jobs={jobs} filtered={filteredJobs}/></Animation>} />
          <Route path='/profile/:employeeId' element={<Animation><Profile /></Animation>} />
          <Route path='/jobs' element={<Jobs jobs={jobs}/>} />
          <Route path='/jobs/:employeeId/applied' element={<Jobs jobs={filteredJobs}/> } />
        </React.Fragment>
      )
    } else if (userType==='Employer') {
      routes = (
        <React.Fragment>
          <Route path='/' element={<Animation><AuthDashboard jobs={jobs} filtered={filteredJobs}/></Animation>} />
          <Route path='/jobs' element={<Jobs jobs={jobs}/>} />
          <Route path='/job/new' element={<Animation><JobPost/></Animation>} />
          <Route path='/jobs/:employerId/posted' element={<Jobs jobs={filteredJobs}/> } />
          <Route path='/employee/:employeeId' element={<EmployeeDetails/>} />
        </React.Fragment>
      )
    }
  } else{
    routes = (
      <React.Fragment>
        <Route path='/' element={<Animation><CommonDashboard jobs={jobs}/></Animation>} />
        <Route path='/jobs' element={<Jobs jobs={jobs}/>} />
        <Route path='/auth' element={<Animation><Auth /></Animation>} />
      </React.Fragment>
    )
  }

  const location=useLocation();

  return (
    <AuthContext.Provider value={{isLoggedIn,userType,userTypeId,login,logout}} >
        <NavMain />
        <main>
          <AnimatePresence mode='wait'>
            <Routes key={location.pathname} location={location}>
              <Route path='/jobs/:jobId' element={<Animation><JobDetails jobs={jobs} /></Animation>} />
              {routes}
              <Route path='*' element={<Navigate to={'/'} />} />
            </Routes>
          </AnimatePresence>
        </main>
    </AuthContext.Provider>
  );
}

export default App;
