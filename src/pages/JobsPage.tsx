/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import JobsList from "../components/JobsList";
import { JobListing, JobsResponse } from "../types/jobs";
import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { useLocalStorage } from "../utils/LocalStorage";
import { StoredKeys } from "../utils/LocalStorage";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { boardKeys, options } from "../lib/apiKeys";
import MyPaginationComponent from "../components/MyPaginationComponent";
import Header from "../components/Header";
import SkeletonForLoading from "./../components/SkeletonForLoading";
import NoResultComponent from "./../components/NoResultComponent";
import { toast } from "../components/ui/use-toast";
import ToastError from "../components/TostError";
import { handleError } from "../lib/handlingErrors";
import ToastSuccess from "../components/TostSuccess";

function JobsPage() {
  const [isLoading, setLoading] = useState(false);
  const [meta, setMeta] = useState();
  const [jobsPerPage, setJobsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [jobs, setJobs] = useState<JobListing[]>([]);
  const [filtered, setFiltered] = useState<JobListing[]>([]);
  const [selectedCategory, setSelectedCategory] = useLocalStorage(
    StoredKeys.SelectedCategory,
    ""
  );
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
    setSortCriteria(value);
  };

  const handleCategoryChange = (value: string) => {
    if (value === selectedCategory) return setSelectedCategory(""); // Toggle category
    setSelectedCategory(value);
  };

  const clearAllFilters = () => {
    setSelectedCategory("");
    setSortCriteria("");
    setSearchTerm("");
  };

  const reitriveJobBoard = async () => {
    let isResponseError = false;
    try {
      setLoading(true);
      const boardKeysParam = encodeURIComponent(JSON.stringify(boardKeys));

      const url = `https://api.hrflow.ai/v1/jobs/searching?board_keys=${boardKeysParam}&limit=${jobsPerPage}&page=${currentPage}`;

      const response = await fetch(url, options);
      if (!response.ok) {
        isResponseError = true;
        console.log(response);
        toast({
          variant: "error",
          duration: 5000,
          action: (
            <ToastError
              title={"Error code: " + response.status}
              message={handleError(response.status)}
            />
          ),
        });
        throw new Error(`HTTP error! Status: ${response.status}`);
      } else {
        toast({
          variant: "success",
          duration: 2000,
          action: (
            <ToastSuccess
              title={"Success"}
              message="Jobs have been fetched correctly"
            />
          ),
        });
      }
      const result: JobsResponse = await response.json();
      setJobs(result.data.jobs);
      setMeta(result.meta);
      setFiltered(result.data.jobs);
    } catch (err) {
      if (!isResponseError)
        toast({
          variant: "error",
          duration: 5000,
          action: <ToastError title={"Bad request"} />,
        });
      console.error(`HTTP error! Status: ${err}`);
    }
    setLoading(false);
  };

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setSelectedCategory("");

    setFiltered((filtred) => {
      const oldIndex = filtred.findIndex((job) => job.id === active.id);
      const newIndex = filtred.findIndex((job) => job.id === over.id);
      return arrayMove(filtred, oldIndex, newIndex);
    });
  };

  useEffect(() => {
    if (!jobs) return;
    let filtered = [...jobs]; // Create a new array from jobs

    if (searchTerm) {
      filtered = filtered.filter((job) =>
        job.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter((job) =>
        job.tags.some((tag) => tag.value === selectedCategory)
      );
    }

    switch (sortCriteria) {
      case "name":
        filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "creationDate":
        filtered = filtered.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        break;
      case "category":
        filtered = filtered.sort((a, b) =>
          (a.tags[0]?.value || "").localeCompare(b.tags[0]?.value || "")
        );
        break;
      default:
        break;
    }

    setFiltered(filtered);
    setLoading(false);
  }, [searchTerm, selectedCategory, sortCriteria, jobs]);

  useEffect(() => {
    reitriveJobBoard();
  }, [jobsPerPage, currentPage]);

  return (
    <div className="flex flex-col gap-6 p-4 md:mx-32 lg:mx-64 md:p-6 dark:bg-green-800">
      <Header
        searchTerm={searchTerm}
        sortCriteria={sortCriteria}
        selectedCategory={selectedCategory}
        handleSearchChange={handleSearchChange}
        handleSortChange={handleSortChange}
        handleCategoryChange={handleCategoryChange}
        clearAllFilters={clearAllFilters}
      />
      {isLoading ? (
        <SkeletonForLoading numberOfJobs={jobsPerPage} />
      ) : filtered.length === 0 && !isLoading ? (
        <NoResultComponent />
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
