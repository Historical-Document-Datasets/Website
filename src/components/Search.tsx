import { Input } from "@/components/ui/input";
import { SearchResult } from "@/utils/types";
import ItemsJS from "itemsjs";
import MiniSearch from "minisearch";
import { SetStateAction, useEffect, useState } from "react";
import ResultCard from "./ResultCard";
import data from "./output.json";

const Search = ({
  results,
  setResults,
  filters,
}: {
  results: SearchResult;
  setResults: (value: object) => void;
  filters: Record<string, string[]>;
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const config = {
      native_search_enabled: false,
      custom_id_field: "id",
      sortings: {
        name_asc: {
          field: "name",
          order: "asc",
        },
      },
      aggregations: {
        language: {
          title: "Languages",
          size: 100,
          conjunction: true,
        },
        format: {
          title: "Image format",
          size: 100,
        },
      },
      searchableFields: ["name"],
    };

    const miniSearch = new MiniSearch({
      fields: ["name"],
    });

    miniSearch.addAll(data);

    // @ts-expect-error Invalid sortings
    const itemsjs = ItemsJS(data, config);

    const search = (query: string, options = {}) => {
      if (query == null) {
        return [];
      }
      if (query.trim().length === 0) {
        return data;
      } else {
        return miniSearch.search(query, options);
      }
    };

    // Search with MiniSearch
    const search_results = search(searchQuery, {
      prefix: true,
      fuzzy: 0.2,
    });

    const filteredResults = itemsjs.search({
      // @ts-expect-error field "ids" is not implemented in @types/itemsjs
      ids: search_results.map((v) => v.id),
      filters: filters,
    });

    setResults(filteredResults);
  }, [searchQuery, filters, setResults]);
  const handleSearchChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="py-6 gap-8">
      <h1 className="text-3xl">Browse datasets</h1>
      <div className="py-2">
        <Input
          type="text"
          placeholder="Type anything to search..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="h-10"
        />
      </div>
      <p className="text-foreground/60 text-sm pb-4">
        {results?.pagination?.total} results found in {results.timings?.total}
        ms.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 items-start ">
        {results.data?.items.length != 0 ? (
          results.data?.items.map((result) => (
            <ResultCard dataset={result} key={result.id} />
          ))
        ) : (
          <p>No results found</p>
        )}
      </div>
    </div>
  );
};

export default Search;
