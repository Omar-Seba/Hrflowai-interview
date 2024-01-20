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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@radix-ui/react-select";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Link, BriefcaseIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@radix-ui/react-dropdown-menu";

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
      {/* <div>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="category-dropdown"
        ></select>
        <input
          type="text"
          placeholder="Search jobs by name..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="ml-5 border-2 border-transparent input border-b-neutral-500" // Add Tailwind CSS classes as needed
        />
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
      </div> */}
      <header className="flex items-center justify-between h-20 px-4 md:px-6">
        <Link className="flex items-center" href="#">
          <BriefcaseIcon className="w-6 h-6" />
          <span className="sr-only">Job Portal</span>
        </Link>
        <div className="flex-1 mx-6">
          <form className="flex items-center">
            <Input
              className="flex-1"
              placeholder="Search jobs..."
              type="search"
            />
          </form>
        </div>
        <div className="flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Location</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuRadioGroup value="all">
                <DropdownMenuRadioItem value="all">All</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="san-francisco">
                  San Francisco
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="new-york">
                  New York
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="london">
                  London
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Category</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuRadioGroup value="all">
                <DropdownMenuRadioItem value="all">All</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="engineering">
                  Engineering
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="design">
                  Design
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="product">
                  Product
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
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
