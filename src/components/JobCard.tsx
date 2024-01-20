import React, { useEffect } from "react";
import { JobListing, Tags } from "../types/jobs"; // Import the interfaces from where they are defined
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { MdDragIndicator } from "react-icons/md";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./../components/ui/accordion";
import { Button } from "./ui/button";

interface JobCardProps {
  job: JobListing;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const { attributes, listeners, transform, transition, setNodeRef } =
    useSortable({ id: job.id });

  const style = { transition, transform: CSS.Transform.toString(transform) };

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
      <Card
        ref={setNodeRef}
        style={style}
        className="w-full border-b-2 border-cyan-400"
      >
        <AccordionItem value="item-1">
          <CardHeader className="h-30">
            <div className="flex flex-row justify-between">
              <CardTitle> {job.name}</CardTitle>
              <MdDragIndicator
                className=""
                {...attributes}
                {...listeners}
                size={26}
              ></MdDragIndicator>
            </div>
            <h1 className="text-xl italic font-medium">
              {findTagValue("company")}
            </h1>
          </CardHeader>
          <AccordionContent>
            <CardContent>
              <p>
                <strong>Location:</strong> {job.location.text}
              </p>
              <p>
                <strong>Created At:</strong> {formatDate(job.created_at)}
              </p>

              <p className="text-justify">
                <strong>Summary:</strong> {job.summary}
              </p>
              <p>
                <strong>Skills:</strong>{" "}
                {job.skills.map((skill) => skill.name).join(", ")}
              </p>
              <p>
                <strong>Tags:</strong>
                {job.tags.map((tag) => {
                  return (
                    <div>
                      <strong>{tag.name}</strong>: {tag.value}
                    </div>
                  );
                })}
              </p>
            </CardContent>
          </AccordionContent>
          <CardFooter className="flex flex-row-reverse justify-between py-3 bg-gray-200 h-14">
            <AccordionTrigger>
              <Button className="h-8">
                {accordionState ? "View details" : "Hide"}
              </Button>
            </AccordionTrigger>
          </CardFooter>
        </AccordionItem>
      </Card>
    </Accordion>
  );
};
export default JobCard;
