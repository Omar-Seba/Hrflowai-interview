/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import JobsList from "../components/jobs/JobsList";
import { JobListing } from "../types/jobs";
import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { useLocalStorage, useLocalStorageT } from "../utils/LocalStorage";
import { StoredKeys } from "../utils/LocalStorage";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { boardKeys, options } from "../lib/apiOptions";
import MyPaginationComponent from "../components/utils/MyPaginationComponent";
import JobsListHeader from "../components/jobs/JobsListHeader";
import SkeletonForLoading from "../components/utils/SkeletonForLoading";
import NoResultComponent from "../components/utils/NoResultComponent";
import {
  filterBySearchTerm,
  filterBySelectedCategories,
  sortJobs,
} from "../components/utils/filtering/filter";
import { buildApiUrl, handleApiResponse, toastError } from "../lib/apiCall";

function JobsPage() {
  const [isLoading, setLoading] = useState(false);
  const [meta, setMeta] = useState();
  const [jobsPerPage, setJobsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [jobs, setJobs] = useState<JobListing[]>([]);
  const [filtered, setFiltered] = useState<JobListing[]>([]);
  const [selectedCategories, setSelectedCategories] = useLocalStorageT<
    string[]
  >(StoredKeys.SelectedCategory, []);
  const [sortCriteria, setSortCriteria] = useLocalStorage(
    StoredKeys.SortCriteria,
    ""
  );
  const [searchTerm, setSearchTerm] = useLocalStorage(
    StoredKeys.SearchTerm,
    ""
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  const handleSortChange = (value: string) => {
    if (value === sortCriteria) setSortCriteria("");
    else setSortCriteria(value);
  };

  const handleCategoryChange = (values: string[]) => {
    setSelectedCategories(values);
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSortCriteria("");
    setSearchTerm("");
  };

  const reitriveJobBoard = async () => {
    try {
      setLoading(true);
      const url = buildApiUrl(boardKeys, jobsPerPage, currentPage);
      const response = await fetch(url, options);
      const result = await handleApiResponse(response);
      setJobs(result.data.jobs);
      setMeta(result.meta);
      setFiltered(result.data.jobs);
    } catch (err) {
      if (err instanceof Error && err.message.startsWith("HTTP error!")) {
        // Error already handled in handleApiResponse
      } else {
        toastError(500);
        console.error(`Error: ${err}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setSortCriteria(""); // Reset sort criteria when drag and drop

    setFiltered((filtred) => {
      const oldIndex = filtred.findIndex((job) => job.id === active.id);
      const newIndex = filtred.findIndex((job) => job.id === over.id);
      return arrayMove(filtred, oldIndex, newIndex);
    });
  };

  useEffect(() => {
    if (!jobs) return;
    let filtered = [...jobs]; // Create a new array from jobs

    filtered = filterBySearchTerm(filtered, searchTerm);
    filtered = filterBySelectedCategories(filtered, selectedCategories);
    filtered = sortJobs(filtered, sortCriteria);

    setFiltered(filtered);
    setLoading(false);
  }, [searchTerm, selectedCategories, sortCriteria, jobs]);

  useEffect(() => {
    reitriveJobBoard();
  }, [jobsPerPage, currentPage]);

  return (
    <div className="flex flex-col gap-6 p-4 md:mx-32 lg:mx-64 md:p-6 dark:bg-green-800">
      <JobsListHeader
        searchTerm={searchTerm}
        sortCriteria={sortCriteria}
        selectedCategories={selectedCategories}
        handleSearchChange={handleSearchChange}
        handleSortChange={handleSortChange}
        handleCategoryChange={handleCategoryChange}
        clearAllFilters={clearAllFilters}
      />
      {isLoading ? (
        <SkeletonForLoading numberOfJobs={jobsPerPage} />
      ) : filtered.length === 0 && !isLoading ? (
        <NoResultComponent
          title={"Oops... No results found"}
          description="No jobs found with the given search criteria. Please try again with
        different keywords or criterias."
        />
      ) : (
        <>
          <DndContext
            modifiers={[restrictToVerticalAxis]}
            collisionDetection={closestCenter}
            onDragEnd={onDragEnd}
          >
            <SortableContext
              items={filtered}
              strategy={verticalListSortingStrategy}
            >
              <JobsList jobs={filtered} />
            </SortableContext>
          </DndContext>
          <MyPaginationComponent
            jobsPerPage={jobsPerPage}
            setjobsPerPage={setJobsPerPage}
            meta={meta}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </>
      )}
    </div>
  );
}

export default JobsPage;
