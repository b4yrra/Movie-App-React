import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type PaginationBarProps = {
  currentPage: number;
  totalPages: number;
};

export const PaginationBar = ({
  currentPage,
  totalPages,
}: PaginationBarProps) => {
  const pages = Array(totalPages)
    .fill(0)
    .map((_, index) => index + 1);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={currentPage > 1 ? `?page=${currentPage - 1}` : "#"}
            aria-disabled={currentPage <= 1}
          />
        </PaginationItem>

        {pages.map((pageNum, index) => {
          if (pageNum + 3 < currentPage) return null;
          if (pageNum - 3 > currentPage) return null;

          return (
            <PaginationItem key={index}>
              <PaginationLink
                href={`?page=${pageNum}`}
                isActive={pageNum === currentPage}
              >
                {pageNum}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        {currentPage + 3 < totalPages && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationNext
            href={currentPage < totalPages ? `?page=${currentPage + 1}` : "#"}
            aria-disabled={currentPage >= totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
