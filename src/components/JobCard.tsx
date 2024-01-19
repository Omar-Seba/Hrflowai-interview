import React from "react";
import { JobListing } from "../types/jobs"; // Import the interfaces from where they are defined
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface JobCardProps {
  job: JobListing;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const { attributes, listeners, transform, transition, setNodeRef } =
    useSortable({ id: job.id });

  const style = { transition, transform: CSS.Transform.toString(transform) };

  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true, // Optional: set to false for 24-hour format
    };
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };
  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="job-card px-4 py-5 shadow-lg lg:px-8 lg:py-10 rounded-xl flex flex-col m-5"
    >
      <h2 className="font-black text-xl">{job.name}</h2>
      <p>
        <strong>Location:</strong> {job.location.text}
      </p>
      <p>
        <strong>Created At:</strong> {formatDate(job.created_at)}
      </p>

      <p className="text-justify">
        <strong>Summary:</strong> {job.summary}
      </p>
      <p>
        <strong>Skills:</strong>{" "}
        {job.skills.map((skill) => skill.name).join(", ")}
      </p>
      <p>
        <strong>Tags:</strong>
        {job.tags.map((tag) => {
          return (
            <div>
              <strong>{tag.name}</strong>: {tag.value}
            </div>
          );
        })}
      </p>
      {/* Add more fields as needed */}
    </div>
  );
};

export default JobCard;
