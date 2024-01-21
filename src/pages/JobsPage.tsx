/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import JobsList from "../components/JobsList";
import { JobListing, JobsResponse } from "../types/jobs";
import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import { AiOutlineClear } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";

import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { Categories, Criterias, useLocalStorage } from "../utils/LocalStorage";
import { StoredKeys } from "../utils/LocalStorage";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "../components/ui/dropdown-menu";
import { boardKeys, options } from "../lib/apiKeys";
import MyPaginationComponent from "../components/MyPaginationComponent";

const JobsPage: React.FC = () => {
  //TODO
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
    try {
      setLoading(true);
      const boardKeysParam = encodeURIComponent(JSON.stringify(boardKeys));

      const url = `https://api.hrflow.ai/v1/jobs/searching?board_keys=${boardKeysParam}&limit=${jobsPerPage}&page=${currentPage}`;

      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result: JobsResponse = await response.json();
      console.log(result.meta);
      console.log(currentPage);

      setJobs(result.data.jobs);
      setMeta(result.meta);
      setFiltered(result.data.jobs);
    } catch (err) {
      console.error("Error fetching jobs:", err);
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
        // Assuming there is a primary category in tags
        filtered = filtered.sort((a, b) =>
          (a.tags[0]?.value || "").localeCompare(b.tags[0]?.value || "")
        );
        break;
      default:
        break;
    }

    setFiltered(filtered);
  }, [searchTerm, selectedCategory, sortCriteria, jobs]);

  useEffect(() => {
    reitriveJobBoard();
  }, [jobsPerPage, currentPage]);
  // Usage in a React component
  useEffect(() => {
    reitriveJobBoard();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  return (
    <div className="flex flex-col gap-6 p-4 bg-white md:mx-32 lg:mx-64 md:p-6 dark:bg-green-800">
      <header className="flex flex-col p-4 bg-white 2xl:flex-row md:items-center md:justify-between dark:bg-gray-800">
        <div className="flex items-center justify-between mb-4 xl:mb-0">
          <h1 className="flex items-center gap-2 mb-4 text-2xl font-bold text-center 2xl:mb-0 text-cyan-600 ">
            HrFlow.ai
          </h1>
        </div>
        <div className="xl:flex xl:space-x-4">
          <div className="relative w-full xl:w-80">
            <form className="flex items-center ">
              {searchTerm === "" && (
                <FaSearch className="absolute right-2.5 top-3 h-4 w-4 text-gray-500 dark:text-gray-400" />
              )}
              <Input
                className="flex-1"
                placeholder="Search jobs..."
                type="search"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </form>
          </div>
          <div className="flex items-center mt-4 space-x-4 xl:mt-0">
            <Select value={sortCriteria} onValueChange={handleSortChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(Criterias).map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={selectedCategory}
              onValueChange={handleCategoryChange}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(Categories).map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              onClick={clearAllFilters}
              className="ml-4 "
              variant="outline"
            >
              <AiOutlineClear />
            </Button>
          </div>
        </div>
      </header>
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
    </div>
  );
};

export default JobsPage;
