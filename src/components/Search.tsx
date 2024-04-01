import { Input } from "@/components/ui/input";
import { SearchResult } from "@/utils/types";
import ItemsJS from "itemsjs";
import MiniSearch from "minisearch";
import { SetStateAction, useEffect, useState } from "react";
import ResultCard from "./ResultCard";

const Search = ({
  results,
  setResults,
}: {
  results: SearchResult;
  setResults: (value: object) => void;
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters] = useState([]);

  useEffect(() => {
    const items = [
      {
        id: 1,
        name: "ICDAR 2021 HDC",
        languages: ["Latin"],
        image_format: ["TIFF", "PNG"],
        color_mode: ["Color", "Grayscale"],
        document_type: "Handwritten and printed page images in Latin",
        task: "Font/script, date, and location classification",
      },
      {
        id: 2,
        name: "BIR Database",
        languages: ["French", "Latin", "Other"],
        image_format: ["JPG"],
        color_mode: ["Color"],
        document_type:
          "Printed pages from sale catalogues and exhibitions from the 19th and 20th centuries",
        task: "Style classification Word detection",
      },
      {
        id: 3,
        name: "Test",
        languages: ["English", "Italian"],
        image_format: ["SVG"],
        color_mode: ["Color"],
        document_type:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        task: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      },
      {
        id: 4,
        name: "Test2",
        languages: ["English", "Italian"],
        image_format: ["SVG"],
        color_mode: ["Color"],
        document_type:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        task: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      },
    ];

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
        languages: {
          title: "Languages",
          size: 10,
          conjunction: false,
        },
        image_format: {
          title: "Image format",
          size: 10,
        },
      },
      searchableFields: ["name"],
    };

    const miniSearch = new MiniSearch({
      fields: ["name"],
    });

    miniSearch.addAll(items);

    const itemsjs = ItemsJS(items, config); //TODO: Fix Typescript error

    const search = (query: string, options = {}) => {
      if (query == null) {
        return [];
      }
      if (query.trim().length === 0) {
        return items;
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
      ids: search_results.map((v) => v.id), //TODO: Fix Typescript error
      filters: {},
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
        {results.data?.items.length} results found in {results.timings?.total}
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
