import React, { useEffect } from "react";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/JobsContainer.js";
import Loader from "./Loader.js";
import PageBtnContainer from './PageBtnContainer'
import Job from "./Job.js";
import Alert from "./Alert.js"

function JobsContainer() {
  const {
    getJobs,
    jobs,
    isLoading,
    page,
    totalJobs,
    search,
    searchType,
    searchStatus,
    sort,
    numOfPages,
    showAlert,
  } = useAppContext();

  useEffect(() => {
    getJobs();
  }, [ search, searchType, searchStatus, sort, page ]);


  if (isLoading) {
    return <Loader center />;
  }
  if (jobs.length === 0) {
    // console.log(jobs.length)
    return (
      <Wrapper>
        <h2>No Jobs to display</h2>
      </Wrapper>
    );
  }
  console.log(totalJobs);

  return (
    <Wrapper>
      <h5>
        {totalJobs} job{jobs.length > 1 && "s"} found
      </h5>
      {showAlert && <Alert />}
      <div className="jobs">
        {jobs.map((job) => {
          return <Job key={job._id} {...job} />;
        })}
      </div>
      {numOfPages >1 && <PageBtnContainer/>}
    </Wrapper>
  );
}

export default JobsContainer;
