import { JobListing } from "../../types/jobs";

export const mockJobs: JobListing[] = [
  {
    id: 1,
    key: "job1",
    reference: null,
    board_key: "board1",
    sections: [],
    board: null,
    name: "Software Engineer",
    url: null,
    picture: null,
    summary: "Job summary for Software Engineer",
    location: { text: "Location 1", lat: 0, lng: 0, gmaps: null, fields: [] },
    archive: null,
    archived_at: null,
    updated_at: "2021-01-01T00:00:00Z",
    created_at: "2021-01-01T00:00:00Z",
    culture: null,
    responsibilities: null,
    requirements: null,
    benefits: null,
    interviews: null,
    skills: [],
    languages: [],
    certifications: [],
    courses: [],
    tasks: [],
    interests: [],
    tags: [{ name: "Engineering", value: "Engineering" }],
    metadatas: [],
    ranges_float: [],
    ranges_date: [],
  },
  {
    id: 2,
    key: "job2",
    reference: null,
    board_key: "board2",
    sections: [],
    board: null,
    name: "Product Manager",
    url: null,
    picture: null,
    summary: "Job summary for Product Manager",
    location: { text: "Location 2", lat: 0, lng: 0, gmaps: null, fields: [] },
    archive: null,
    archived_at: null,
    updated_at: "2021-06-01T00:00:00Z",
    created_at: "2021-06-01T00:00:00Z",
    culture: null,
    responsibilities: null,
    requirements: null,
    benefits: null,
    interviews: null,
    skills: [],
    languages: [],
    certifications: [],
    courses: [],
    tasks: [],
    interests: [],
    tags: [{ name: "Product", value: "Product" }],
    metadatas: [],
    ranges_float: [],
    ranges_date: [],
  },
  {
    id: 3,
    key: "job3",
    reference: null,
    board_key: "board3",
    sections: [],
    board: null,
    name: "Data Analyst",
    url: null,
    picture: null,
    summary: "Job summary for Data Analyst",
    location: { text: "Location 3", lat: 0, lng: 0, gmaps: null, fields: [] },
    archive: null,
    archived_at: null,
    updated_at: "2021-09-01T00:00:00Z",
    created_at: "2021-09-01T00:00:00Z",
    culture: null,
    responsibilities: null,
    requirements: null,
    benefits: null,
    interviews: null,
    skills: [],
    languages: [],
    certifications: [],
    courses: [],
    tasks: [],
    interests: [],
    tags: [{ name: "Data", value: "Data" }],
    metadatas: [],
    ranges_float: [],
    ranges_date: [],
  },
];