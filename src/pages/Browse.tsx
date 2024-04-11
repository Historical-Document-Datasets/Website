import Search from "@/components/Search";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SearchResult } from "@/utils/types";
import { Filter } from "lucide-react";
import useSWR from "swr";

import { useState } from "react";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Browse() {
  const [results, setResults] = useState<SearchResult>({});
  const [filters, setFilters] = useState<Record<string, string[]>>({});
  const [conjunction, setConjunction] = useState<Record<string, boolean>>({});
  const [page, setPage] = useState(1);

  const { data, error, isValidating } = useSWR(
    "https://raw.githubusercontent.com/Historical-Document-Datasets/Catalog/main/catalog.json",
    fetcher
  );

  if (error) return <div>Error</div>;
  if (isValidating) return <div>Loading...</div>;

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
