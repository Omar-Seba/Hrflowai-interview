import { JobListing } from "@/types/jobs";

export const filterBySearchTerm = (
  jobs: JobListing[],
  searchTerm: string
): JobListing[] => {
  if (!searchTerm) return jobs;
  return jobs.filter((job) =>
    job.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

export const filterBySelectedCategory = (
  jobs: JobListing[],
  selectedCategory: string
): JobListing[] => {
  if (!selectedCategory) return jobs;
  return jobs.filter((job) =>
    job.tags.some((tag) => tag.value === selectedCategory)
  );
};

export const sortJobs = (
  jobs: JobListing[],
  sortCriteria: string
): JobListing[] => {
  // Create a copy of the jobs array
  const sortedJobs = [...jobs];

  switch (sortCriteria) {
    case "name":
      return sortedJobs.sort((a, b) => a.name.localeCompare(b.name));
    case "creationDate":
      return sortedJobs.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    case "category":
      return sortedJobs.sort((a, b) =>
        (a.tags[0]?.value || "").localeCompare(b.tags[0]?.value || "")
      );
    default:
      return sortedJobs;
  }
};
