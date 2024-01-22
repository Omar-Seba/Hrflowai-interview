import React from "react";
import { FaClock, FaSearch } from "react-icons/fa";
import { Input } from "./ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./ui/select";
import { Button } from "./ui/button";
import { TbFilterOff } from "react-icons/tb";

import { Criterias, Categories } from "../utils/LocalStorage";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface HeaderProps {
  searchTerm: string;
  sortCriteria: string;
  selectedCategory: string;
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSortChange: (value: string) => void;
  handleCategoryChange: (value: string) => void;
  clearAllFilters: () => void;
}

const Header: React.FC<HeaderProps> = ({
  searchTerm,
  sortCriteria,
  selectedCategory,
  handleSearchChange,
  handleSortChange,
  handleCategoryChange,
  clearAllFilters,
}) => {
  return (
    <header className="flex flex-col p-4 2xl:flex-row md:items-center md:justify-between dark:bg-gray-800">
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
            <SelectTrigger className="w-[100px] xl:w-[180px]">
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
          <Select value={selectedCategory} onValueChange={handleCategoryChange}>
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
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  className="flex flex-row hover:text-cyan-600"
                  variant={"outline"}
                >
                  clear all filters
                  <TbFilterOff
                    size={23}
                    onClick={clearAllFilters}
                    className="ml-2"
                  />
                </Button>
              </TooltipTrigger>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </header>
  );
};

export default Header;