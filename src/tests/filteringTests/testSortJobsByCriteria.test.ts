import { sortJobs } from "../../components/utils/filtering/filter";
import { mockJobs } from "../testingData/dataForTesting";

describe("sortJobs", () => {
  test("should sort jobs by name", () => {
    const sortCriteria = "name";
    // const sortedJobs = sortJobs(mockJobs, sortCriteria);
    // expect(sortedJobs).toEqual([mockJobs[2], mockJobs[0], mockJobs[1]]);

    const sortedJobs = sortJobs(mockJobs, sortCriteria);

    // Ensure the jobs are sorted by name in ascending order
    expect(sortedJobs).toEqual([mockJobs[2], mockJobs[1], mockJobs[0]]);
  });

  test("should sort jobs by creation date", () => {
    const sortCriteria = "creationDate";
    const sortedJobs = sortJobs(mockJobs, sortCriteria);
    expect(sortedJobs).toEqual([mockJobs[2], mockJobs[1], mockJobs[0]]);
  });
});
