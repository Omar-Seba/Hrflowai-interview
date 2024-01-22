import React from "react";
import noResult from "../assets/empty-inbox-outline.svg";
import { Button } from "./ui/button";

const NoResultComponent: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center md:mt-20">
      <img
        alt="404"
        className="mx-auto overflow-hidden scale-75 aspect-video rounded-xl"
        height="550"
        src={noResult}
        width="550"
      />
      <h1 className="text-2xl font-semibold tracking-tighter sm:text-5xl md:text-4xl lg:text-4xl">
        Oops... No results found
      </h1>
      <p className="max-w-md mx-10 mt-3 text-center text-gray-500 md:mx-9 md:text-xl dark:text-gray-400">
        No jobs found with the given search criteria. Please try again with
        different keywords.
      </p>
      <Button
        onClick={() => {
          window.location.href = "/";
        }}
        className="mt-3 bg-cyan-500"
      >
        Return to Homepage
      </Button>
    </div>
  );
};

export default NoResultComponent;
