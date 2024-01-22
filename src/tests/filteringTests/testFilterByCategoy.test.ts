import { filterBySelectedCategories } from "../../components/utils/filtering/filter";
import { mockJobs } from "../testingData/dataForTesting";

describe("filterBySelectedCategory", () => {
  test("should filter jobs by selected category", () => {
    const selectedCategory = ["Product"];
    const filteredJobs = filterBySelectedCategories(mockJobs, selectedCategory);
    expect(filteredJobs).toEqual([mockJobs[1]]);
  });

  test("should return all jobs when no category is selected", () => {
    const selectedCategory: string[] = [];
    const filteredJobs = filterBySelectedCategories(mockJobs, selectedCategory);
    expect(filteredJobs).toEqual(mockJobs);
  });
});
