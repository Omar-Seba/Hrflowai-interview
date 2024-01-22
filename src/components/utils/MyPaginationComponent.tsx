import { useEffect, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
} from "../ui/pagination";
import { Meta } from "@/types/meta";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import ScrollToTopButton from "./ScrollToTopButton";

interface MyPaginationProps {
  meta: Meta | undefined;
  currentPage: number;
  jobsPerPage: number;
  setjobsPerPage: (value: number) => void;
  setCurrentPage: (value: number) => void;
}

const MyPaginationComponent = ({
  meta,
  setCurrentPage,
  currentPage,
  setjobsPerPage,
}: MyPaginationProps) => {
  const [mymeta, setMeta] = useState<Meta>({
    page: 1,
    maxPage: 1,
    count: 1,
    total: 1,
  });

  const renderPageNumbers = () => {
    const pageNumbers = [];

    for (let i = 1; i <= mymeta?.maxPage; i++) {
      pageNumbers.push(
        <PaginationItem
          className="cursor-pointer"
          onClick={() => {
            setCurrentPage(i);
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }}
          key={i}
        >
          <PaginationLink isActive={i === currentPage}>{i}</PaginationLink>
        </PaginationItem>
      );
    }

    return pageNumbers;
  };

  useEffect(() => {
    if (meta) setMeta(meta);
  }, [meta]);

  return (
    <div className="flex flex-row">
      <Select
        value={mymeta.count.toString()}
        onValueChange={(value) => {
          setCurrentPage(1);
          setjobsPerPage(Number(value));
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }}
      >
        <SelectTrigger className="w-20">
          <SelectValue placeholder="10" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="5">5</SelectItem>
          <SelectItem value="10">10</SelectItem>
          <SelectItem value={mymeta.total.toString()}>All</SelectItem>
        </SelectContent>
      </Select>
      <Pagination>
        <PaginationContent>
          {mymeta.page > 1 && (
            <PaginationItem className="cursor-pointer">
              <PaginationPrevious
                onClick={() => {
                  setCurrentPage(mymeta.page--);
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  });
                }}
              />
            </PaginationItem>
          )}
          {renderPageNumbers()}
          {mymeta.page < mymeta.maxPage && (
            <PaginationItem className="cursor-pointer">
              <PaginationNext
                onClick={() => {
                  setCurrentPage(mymeta.page++);
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  });
                }}
              />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
      <ScrollToTopButton />
    </div>
  );
};

export default MyPaginationComponent;
