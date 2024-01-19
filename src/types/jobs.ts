export interface JobListing {
  id: number;
  key: string;
  reference: string | null;
  board_key: string;
  sections: Section[];
  board: Board | null;
  name: string;
  url: string | null;
  picture: string | null;
  summary: string;
  location: Location;
  archive: string | null;
  archived_at: string | null;
  updated_at: string;
  created_at: string;
  culture: string | null;
  responsibilities: string | null;
  requirements: string | null;
  benefits: string | null;
  interviews: string | null;
  skills: Skills[];
  languages: Languages[];
  certifications: Certifications[];
  courses: Courses[];
  tasks: Task[];
  interests: Interests[];
  tags: Tags[];
  metadatas: Metadatas[];
  ranges_float: RangesFloat[];
  ranges_date: RangesDate[];
}

export interface Board {
  key: string;
  name: string;
  type: string;
  subtype: string;
  environment: string;
}

export interface Location {
  text: string;
  lat: number;
  lng: number;
  gmaps: string | null;
  fields: string[];
}

export interface Section {
  name: string;
  title: string;
  description: string;
}

export interface Skills {
  name: string;
  value: string | null;
  type: string;
}

export interface Languages {
  name: string;
  value: string | null;
}

export interface Certifications {
  name: string;
  value: string | null;
  type: string | null;
}

// no need for now cause not available in the interview example
export interface Courses {
  name: string;
  value: string | null;
}

export interface Task {
  name: string;
  value: string | null;
  type: string | null;
}

// no need for now cause not available in the interview example
export interface Interests {
  name: string;
  value: string | null;
}

export interface Tags {
  name: string;
  value: string | null;
}

// no need for now cause not available in the interview example
export interface Metadatas {
  name: string;
  value: string | null;
}

// no need for now cause not available in the interview example
export interface RangesFloat {
  name: string | null;
  value_min: number | null;
  value_max: number | null;
  unit: string | null;
}

export interface RangesDate {
  name: string | null;
  value_min: string; // datetime ISO 8601
  value_max: string; // datetime ISO 8601
}

export interface Jobs {
  jobs: JobListing[];
}

export interface JobsResponse {
  data: Jobs;
  meta: any;
  message: string;
  code: number;
}
