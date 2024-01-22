import React from "react";
import { Card, CardHeader, CardFooter } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

interface SkeletonForLoadingProps {
  numberOfJobs: number;
}

const SkeletonForLoading: React.FC<SkeletonForLoadingProps> = ({
  numberOfJobs,
}) => {
  // Render skeleton loading components based on the number of jobs
  const skeletonItems = Array.from({ length: numberOfJobs }, (_, index) => (
    <div key={index} className="skeleton-item">
      <Card className="w-full border-b-2">
        <CardHeader className="h-30">
          <div className="flex flex-row justify-between">
            <Skeleton className="w-1/2 h-6" />
            <Skeleton className="w-6 h-6" />
          </div>
          <Skeleton className="w-1/3 h-6 mt-2" />{" "}
        </CardHeader>

        <CardFooter className="flex flex-row justify-between py-3 bg-gray-100 h-14">
          <Skeleton className="w-24 h-8" />
          <div className="flex flex-row">
            <Skeleton className="w-4 h-4 mr-2" />
            <Skeleton className="w-20 h-4" />
          </div>
        </CardFooter>
      </Card>
    </div>
  ));

  return <div className="skeleton-container">{skeletonItems}</div>;
};

export default SkeletonForLoading;
