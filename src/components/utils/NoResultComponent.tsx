import React from "react";
import noResult from "../../assets/empty-inbox-outline.svg";
import { Button } from "../ui/button";

interface NoResultComponentProps {
  title: string;
  description?: string;
}

const NoResultComponent: React.FC<NoResultComponentProps> = ({
  title,
  description,
}) => {
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
        {title}
      </h1>
      <p className="max-w-md mx-10 mt-3 text-center text-gray-500 md:mx-9 md:text-xl dark:text-gray-400">
        {description}
      </p>
    </div>
  );
};

export default NoResultComponent;
