/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import JobsList from "../components/Jobs";
import { JobListing, JobsResponse } from "../types/jobs";
import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { Categories, useLocalStorage } from "../utils/LocalStorage";
import { StoredKeys } from "../utils/LocalStorage";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    "X-API-KEY": "askr_dbfb6f33e7d3c6b6e334b2d420f81465",
    "X-USER-EMAIL": "",
  },
};
const boardKeys = ["887595b735d68f0bc0b0b0535f7d8f7d158a3f4e"]; // Replace with your actual board key

const categories = [
  "AI / Research & Development",
  "Artificial Intelligence",
  "Financial Services",
  "Human Resources",
  "Software Engineering",
];

const JobsPage: React.FC = () => {
  //TODO
  const [isLoading, setLoading] = useState(false);

  const [jobs, setJobs] = useState<JobListing[]>([]);
  const [filtred, setFiltred] = useState<JobListing[]>([]);
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
  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortCriteria(event.target.value);
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCategory(event.target.value);
  };
  const reitriveJobBoard = async () => {
    try {
      const boardKeysParam = encodeURIComponent(JSON.stringify(boardKeys));

      const url = `https://api.hrflow.ai/v1/jobs/searching?board_keys=${boardKeysParam}`;

      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result: JobsResponse = await response.json();
      console.log(result);
      setJobs(result.data.jobs);
      setFiltred(result.data.jobs);
    } catch (err) {
      console.error("Error fetching jobs:", err);
    }
  };
  // const onDragEnd = (result: any) => {
  //   if (!filtred) return;
  //   const { source, destination } = result;

  //   // If dropped outside the list or in the same position, do nothing
  //   if (!destination || destination.index === source.index) {
  //     return;
  //   }

  //   // Create a new array with the same items as the original
  //   const reorderedJobs = Array.from(filtred);

  //   // Remove the dragged item from its original position
  //   const [reorderedItem] = reorderedJobs.splice(source.index, 1);

  //   // Insert the dragged item into its new position
  //   reorderedJobs.splice(destination.index, 0, reorderedItem);

  //   // Update the state with the newly reordered jobs array
  //   setFiltred(reorderedJobs);
  // };
  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id == over.id) return;

    setSelectedCategory("");

    setFiltred((filtred) => {
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

    setFiltred(filtered);
  }, [searchTerm, selectedCategory, sortCriteria, jobs]);

  // Usage in a React component
  useEffect(() => {
    reitriveJobBoard();
  }, []);

  return (
    <div
      className="flex flex-col gap-6 p-4 bg-white md:mx-32 lg:mx-64 md:p-6 dark:bg-green-800"
      // className="flex flex-col m-4"
    >
      <h1 className="text-2xl font-bold text-center text-cyan-600 ">
        HrFlow.ai
      </h1>
      <div>
        <input
          type="text"
          placeholder="Search jobs by name..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="ml-5 border-2 border-transparent input border-b-neutral-500" // Add Tailwind CSS classes as needed
        />
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="category-dropdown"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        Sort by :{" "}
        <select
          value={sortCriteria}
          onChange={handleSortChange}
          className="sort-dropdown"
        >
          {Object.values(Categories).map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <DndContext
        modifiers={[restrictToVerticalAxis]}
        collisionDetection={closestCenter}
        onDragEnd={onDragEnd}
      >
        <SortableContext items={filtred} strategy={verticalListSortingStrategy}>
          <JobsList jobs={filtred} />
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default JobsPage;
