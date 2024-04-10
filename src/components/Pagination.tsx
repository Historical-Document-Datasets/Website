import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Button } from "./ui/button";

export default function Pagination({
  page,
  setPage,
  total,
  perPage,
}: {
  page: number;
  setPage: (value: number) => void;
  total: number | undefined;
  perPage: number;
}) {
  return (
    <div className="flex gap-8">
      <div className="flex w-[100px] items-center justify-center text-sm font-medium">
        Page {page} of {Math.ceil((total ?? 0) / perPage)}
      </div>
      <div className="flex gap-2">
        <Button
          variant="outline"
          className="h-8 w-8 p-0"
          onClick={() => setPage(1)}
          disabled={page === 1}
        >
          <span className="sr-only">Go to first page</span>
          <ChevronsLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          className="h-8 w-8 p-0"
          onClick={() => setPage(Math.max(page - 1, 1))}
          disabled={page === 1}
        >
          <span className="sr-only">Go to previous page</span>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          className="h-8 w-8 p-0"
          onClick={() => setPage(page + 1)}
          disabled={page === Math.ceil((total ?? 0) / perPage)}
        >
          <span className="sr-only">Go to next page</span>
          <ChevronRight className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          className="h-8 w-8 p-0"
          onClick={() => setPage(Math.ceil((total ?? 0) / perPage))}
          disabled={page === Math.ceil((total ?? 0) / perPage)}
        >
          <span className="sr-only">Go to next page</span>
          <ChevronsRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
