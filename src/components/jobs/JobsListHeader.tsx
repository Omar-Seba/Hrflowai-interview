import React from "react";
import { FaSearch } from "react-icons/fa";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { TbFilterOff } from "react-icons/tb";

import { Criterias, Categories } from "../../utils/LocalStorage";
import { Tooltip, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import myImage from "../../assets/logo-with-title.png";
interface JobsListHeaderProps {
  searchTerm: string;
  sortCriteria: string;
  selectedCategories: string[];
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSortChange: (value: string) => void;
  handleCategoryChange: (value: string[]) => void;
  clearAllFilters: () => void;
}

const JobsListHeader: React.FC<JobsListHeaderProps> = ({
  searchTerm,
  sortCriteria,
  selectedCategories,
  handleSearchChange,
  handleSortChange,
  handleCategoryChange,
  clearAllFilters,
}) => {
  const handleCategoryChangeLocally = (category: string, checked: boolean) => {
    if (checked) {
      handleCategoryChange([...selectedCategories, category]);
    } else {
      handleCategoryChange(
        selectedCategories.filter((c: string) => c !== category)
      );
    }
  };

  return (
    <header className="flex flex-col p-4 2xl:flex-row md:items-center md:justify-between dark:bg-gray-800">
      <div className="flex items-center justify-between mb-4 xl:mb-0">
        <img alt="Logo" className="w-auto h-14" src={myImage} />
      </div>
      <div className="xl:flex xl:space-x-4">
        <div className="relative w-full xl:w-80">
          <form className="flex items-center ">
            {searchTerm === "" && (
              <FaSearch className="absolute right-2.5 top-3 h-4 w-4 hover:text-cyan-500 text-gray-500 dark:text-gray-400" />
            )}
            <Input
              className="flex-1 hvoer:border-cyan-500 placeholder:hover:text-cyan-500"
              placeholder="Search jobs..."
              type="search"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </form>
        </div>
        <div className="grid grid-cols-1 gap-1 mt-4 md:grid-cols-3 md:gap-6 xl:mt-0 xl:grid-cols-[auto_auto_auto] xl:gap-4 xl:justify-end">
          <div className="w-full mb-4 md:mb-0 xl:mb-0 ">
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="w-40 md:w-auto">
                <Button variant="outline" className="hover:text-cyan-500">
                  Sort by
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                {Object.values(Criterias).map((criteria) => (
                  <DropdownMenuCheckboxItem
                    key={criteria}
                    checked={sortCriteria === criteria}
                    onCheckedChange={() => handleSortChange(criteria)}
                  >
                    {criteria}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="mb-4 md:mb-0 xl:mb-0">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="hover:text-cyan-500">
                  Select Categories
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                {Object.values(Categories).map((category) => (
                  <DropdownMenuCheckboxItem
                    key={category}
                    checked={selectedCategories.includes(category)}
                    onCheckedChange={(checked) =>
                      handleCategoryChangeLocally(category, checked)
                    }
                  >
                    {category}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="mb-4 md:mb-0 xl:mb-0">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Button
                    className="flex flex-row hover:text-cyan-600"
                    variant={"outline"}
                    onClick={clearAllFilters}
                  >
                    clear all filters
                    <TbFilterOff size={23} className="ml-2" />
                  </Button>
                </TooltipTrigger>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
    </header>
  );
};

export default JobsListHeader;
