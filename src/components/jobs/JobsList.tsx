import React from "react";
import { JobListing } from "../../types/jobs";
import JobCard from "./JobCard";

interface JobsListProps {
  jobs: JobListing[];
}

const JobsList: React.FC<JobsListProps> = ({ jobs }) => {
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
