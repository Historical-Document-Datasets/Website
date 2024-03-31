import Search from "@/components/Search";
import Sidebar from "@/components/Sidebar";
import { SearchResult } from "@/utils/types";
import { useState } from "react";

export default function Browse() {
  const [results, setResults] = useState<SearchResult>({});

  return (
    <div className="flex">
      <Sidebar results={results} />
      <div className="flex-1">
        <Search results={results} setResults={setResults} />
      </div>
    </div>
  );
}
