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

export const filterBySelectedCategories = (
  jobs: JobListing[],
  selectedCategories: string[]
): JobListing[] => {
  if (selectedCategories.length === 0) return jobs; // Return all jobs if no categories are selected
  const lowerCaseSelectedCategories = selectedCategories.map((category) =>
    category.toLowerCase()
  );
  return jobs.filter((job) =>
    job.tags.some((tag) =>
      tag.value
        ? lowerCaseSelectedCategories.includes(tag.value.toLocaleLowerCase())
        : false
    )
  );
};
export const sortJobs = (
  jobs: JobListing[],
  sortCriteria: string
): JobListing[] => {
  // Create a copy of the jobs array
  const sortedJobs = [...jobs];

  switch (sortCriteria) {
    case Criterias.Name:
      return sortedJobs.sort((a, b) => a.name.localeCompare(b.name));
    case Criterias.CreationDate:
      return sortedJobs.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    case Criterias.Category:
      return sortedJobs.sort((a, b) => {
        const aCompanyTag = a.tags.find(
          (tag) => tag.name.toLowerCase() === "category"
        );
        const bCompanyTag = b.tags.find(
          (tag) => tag.name.toLowerCase() === "category"
        );
        const aValue = aCompanyTag ? aCompanyTag.value ?? "" : "";
        const bValue = bCompanyTag ? bCompanyTag.value ?? "" : "";
        return aValue.localeCompare(bValue);
      });
    default:
      return sortedJobs;
  }
};
