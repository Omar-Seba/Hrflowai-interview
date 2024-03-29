import React, { useEffect } from "react";
import { JobListing } from "../../types/jobs"; // Import the interfaces from where they are defined
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { MdDragIndicator } from "react-icons/md";
import { FaClock } from "react-icons/fa6";
import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Button } from "../ui/button";
import moment from "moment";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Badge } from "../ui/badge";

interface JobCardProps {
  job: JobListing;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const { attributes, listeners, transform, transition, setNodeRef } =
    useSortable({ id: job.id });

  const [favorite, setFavorite] = React.useState<boolean>(false);
  const style = { transition, transform: CSS.Transform.toString(transform) };

  const formatDateToNow = (date: string) => {
    return moment(date).fromNow();
  };

  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true, // Optional: set to false for 24-hour format
    };
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  const findTagValue = (tagName: string) => {
    const tag = job.tags.find((tag) => tag.name.toLowerCase() === tagName);
    return tag ? tag.value : "";
  };

  const [accordionState, setAccordionState] = React.useState<boolean>(true);

  useEffect(() => {}, [accordionState]);
  return (
    <Accordion
      onValueChange={() => setAccordionState(!accordionState)}
      type="single"
      collapsible
    >
      <Card ref={setNodeRef} style={style} className="w-full border-cyan-400">
        <AccordionItem value="item-1">
          <CardHeader className="h-30">
            <div className="flex flex-row justify-between">
              <CardTitle className="flex">
                {" "}
                <p className="text-2xl md:text-2xl">{job.name}</p>
                <div
                  onMouseDown={() => {
                    setFavorite(!favorite);
                  }}
                  className="mt-1 ml-3 "
                >
                  {favorite ? (
                    <GoHeartFill size={20} color="#FF5252" />
                  ) : (
                    <GoHeart size={20} className="hover:text-[#FF5252]" />
                  )}
                </div>
              </CardTitle>
              <MdDragIndicator
                className="hover:text-cyan-500"
                {...attributes}
                {...listeners}
                size={26}
              ></MdDragIndicator>
            </div>
            <h1 className="italic text-gray-500  text-md md:text-xl">
              {findTagValue("company")} - {job.location.text}
              {findTagValue("category") ? ` - ${findTagValue("category")}` : ""}
            </h1>
          </CardHeader>
          <AccordionContent>
            <CardContent className="md:text-lg">
              {job.summary && (
                <p className="mb-2 ">
                  <strong>Summary:</strong> <br />
                  <p className="text-justify whitespace-pre-line">
                    {job.summary}
                  </p>
                </p>
              )}
              <p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <strong>Skills:</strong>
                  {job.skills
                    .sort((a, b) => {
                      return b.name.length - a.name.length;
                    })
                    .map((skill, key) => {
                      return (
                        <Badge key={key} className="bg-cyan-500">
                          {skill.name}
                        </Badge>
                      );
                    })}
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  <strong>Tags:</strong>
                  {job.tags.map((tag, key) => {
                    return (
                      <Badge key={key} variant={"secondary"}>
                        {tag.value}
                      </Badge>
                    );
                  })}
                </div>
              </p>
            </CardContent>
          </AccordionContent>
          <CardFooter className="flex justify-between py-3 rounded-b-xl bg-slate-100 h-14">
            <div className="flex gap-2">
              <AccordionTrigger>
                <Button className="h-9 bg-cyan-500 hover:no-underline">
                  {accordionState ? "View details" : "Hide details"}
                </Button>
              </AccordionTrigger>
              <Button className="mt-4 h-9 hover:text-white bg-cyan-500">
                Apply
              </Button>
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <h1 className="flex flex-row text-sm md:text-lg hover:text-cyan-500">
                    <FaClock
                      size={16}
                      className="inline-block mr-2 mt-0.5 align-bottom md:mt-1"
                    />
                    {formatDateToNow(job.created_at)}
                  </h1>
                </TooltipTrigger>
                <TooltipContent>
                  <h1>{formatDate(job.created_at)}</h1>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardFooter>
        </AccordionItem>
      </Card>
    </Accordion>
  );
};
export default JobCard;
