import React from "react";
// import JobCard from './JobCard';
import { JobListing } from "../types/jobs"; // Import the interfaces
import JobCard from "./JobCard";

interface JobsListProps {
  jobs: JobListing[] | undefined;
}

const JobsList: React.FC<JobsListProps> = ({ jobs }) => {
  if (!jobs) return <div>nothing here ...</div>;

  return (
    <>
      <div className="jobs-list">
        {jobs.map((job: JobListing) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </>
  );
};

export default JobsList;
