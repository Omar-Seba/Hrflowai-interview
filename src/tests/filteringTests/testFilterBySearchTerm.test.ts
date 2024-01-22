import { filterBySearchTerm } from "../../components/utils/filtering/filter";
import { mockJobs } from "../testingData/dataForTesting";

describe("filterBySearchTerm", () => {
  test("should filter jobs by name", () => {
    const searchTerm = "software";
    const filteredJobs = filterBySearchTerm(mockJobs, searchTerm);
    expect(filteredJobs).toEqual([mockJobs[0]]);
  });

  test("should return all jobs when search term is empty", () => {
    const searchTerm = "";
    const filteredJobs = filterBySearchTerm(mockJobs, searchTerm);
    expect(filteredJobs).toEqual(mockJobs);
  });
});
