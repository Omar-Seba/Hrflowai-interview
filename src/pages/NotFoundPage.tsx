import { Button } from "../components/ui/button";
import React from "react";
import errorImage from "./../assets/404-not-found.svg";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <img
        alt="404"
        className="mx-auto overflow-hidden scale-75 aspect-video rounded-xl"
        height="550"
        src={errorImage}
        width="550"
      />
      <h1 className="text-2xl font-bold tracking-tighter sm:text-5xl md:text-5xl lg:text-5xl">
        404 Not Found
      </h1>
      <p className="max-w-md mt-3 text-gray-500 md:text-xl dark:text-gray-400">
        Sorry, we couldn't find the page you're looking for.
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

export default NotFoundPage;
