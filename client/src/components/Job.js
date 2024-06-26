import React from 'react';
import moment from 'moment'
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/appContext';
import Wrapper from '../assets/wrappers/Job';
import JobInfo from './JobInfo';


function Job({ 
  _id,
  company,
  position,
  status,
  jobType,
  jobLocation,
  createdAt,
}) {

  let date = moment(createdAt);
  date = date.format('MM-DD-YYYY')

  const {setEditJob, deleteJob} = useAppContext();


  return (
    <Wrapper>
      <header>
        <div className="main-icon">
          {company.charAt(0)}
        </div>
        <div className="info">
          <h5>{position}</h5>
          <h5>{company}</h5>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <JobInfo icon={<FaLocationArrow />} text={jobLocation}/>
          <JobInfo icon={<FaCalendarAlt/>} text={date}/>
          <JobInfo icon={<FaBriefcase />} text={jobType}/>
          <div className={`status ${status}`}>{status}</div>
        </div>
        <footer>
          <div className="actions">
            <Link to="/add-job" className='btn edit-btn' onClick={()=>setEditJob(_id)}>Edit</Link>
            <button className="btn delete-btn" onClick={()=>deleteJob(_id)}>delete</button>
          </div>
        </footer>
      </div>
    </Wrapper>
  )
}

export default Job