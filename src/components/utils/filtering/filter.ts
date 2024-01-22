import { JobListing } from "@/types/jobs";
import { Criterias } from "../../../utils/LocalStorage";

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
  console.log(sortCriteria);

  switch (sortCriteria) {
    case Criterias.Name:
      console.log("filterby name");
      return sortedJobs.sort((a, b) => a.name.localeCompare(b.name));
    case Criterias.CreationDate:
      console.log("filterby date");
      return sortedJobs.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    case Criterias.Category:
      console.log("filterby cat");
      return sortedJobs.sort((a, b) => {
        const aCompanyTag = a.tags.find(
          (tag) => tag.name.toLowerCase() === "company"
        );
        const bCompanyTag = b.tags.find(
          (tag) => tag.name.toLowerCase() === "company"
        );
        const aValue = aCompanyTag ? aCompanyTag.value ?? "" : "";
        const bValue = bCompanyTag ? bCompanyTag.value ?? "" : "";
        return aValue.localeCompare(bValue);
      });
    default:
      return sortedJobs;
  }
};
