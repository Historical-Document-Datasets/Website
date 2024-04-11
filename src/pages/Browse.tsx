import Search from "@/components/Search";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SearchResult } from "@/utils/types";
import { CircleAlert, Filter, LoaderCircle } from "lucide-react";

import useSWRImmutable from "swr/immutable";

import { useState } from "react";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Browse() {
  const [results, setResults] = useState<SearchResult>({});
  const [filters, setFilters] = useState<Record<string, string[]>>({});
  const [conjunction, setConjunction] = useState<Record<string, boolean>>({});
  const [page, setPage] = useState(1);

  const {
    data = [],
    error,
    isLoading = true,
  } = useSWRImmutable(
    "https://raw.githubusercontent.com/Historical-Document-Datasets/Catalog/main/catalog.json",
    fetcher
  );

  if (error)
    return (
      <div className="flex items-center pt-6 flex-col">
        <div className="w-full rounded-lg border px-4 py-3 text-sm flex items-center justify-between border-destructive/50 dark:border-destructive max-w-screen-sm">
          <div className="flex gap-2 items-center text-destructive">
            <CircleAlert strokeWidth={1.5} />
            <div>
              <h5 className="font-medium leading-none tracking-tight mb-1">
                Uh oh!
              </h5>
              <p className="text-sm leading-none">
                An error occurred while fetching the data. Please try again
                later.
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="h-7"
            onClick={() => window.location.reload()}
          >
            Retry
          </Button>
        </div>
      </div>
    );

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-full">
        <div className="flex items-center gap-1 text-muted-foreground">
          <LoaderCircle className="animate-spin w-4 h-4" />
          <h2>Loading...</h2>
        </div>
      </div>
    );

  return (
    <div className="flex">
      <Sidebar
        mobile={false}
        results={results}
        filters={filters}
        setFilters={setFilters}
        conjunction={conjunction}
        setConjunction={setConjunction}
        setPage={setPage}
      />
      <Sheet>
        <SheetTrigger asChild>
          <Button className="mr-4 mt-6 md:hidden" variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side={"left"}>
          <Sidebar
            mobile={true}
            results={results}
            filters={filters}
            setFilters={setFilters}
            conjunction={conjunction}
            setConjunction={setConjunction}
            setPage={setPage}
          />
        </SheetContent>
      </Sheet>

      <div className="flex-1">
        <Search
          results={results}
          setResults={setResults}
          filters={filters}
          conjunction={conjunction}
          page={page}
          setPage={setPage}
          data={data}
        />
      </div>
    </div>
  );
}
