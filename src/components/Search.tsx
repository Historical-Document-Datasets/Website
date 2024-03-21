import { Input } from "@/components/ui/input";
import { Dataset } from "@/utils/types";
import ItemsJS from "itemsjs";
import MiniSearch from "minisearch";
import { SetStateAction, useEffect, useState } from "react";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters] = useState([]);
  const [results, setResults] = useState<{
    timings?: { total: number };
    data?: { items: Dataset[] };
  }>({});

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
      per_page: 3,
      ids: search_results.map((v) => v.id), //TODO: Fix Typescript error
      filters: {},
    });

    setResults(filteredResults);
  }, [searchQuery, filters]);

  const handleSearchChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="py-6 gap-8">
      <h1 className="text-3xl">Browse datasets</h1>
      <div className="py-2">
        <div className="grid grid-cols-7 gap-4">
          <Input
            type="text"
            placeholder="Type anything to search..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="h-10 col-span-6"
          />
        </div>
      </div>
      <p className="text-foreground/60 text-sm pb-4">
        {results.data?.items.length} results found in {results.timings?.total}{" "}
        ms.
      </p>
      {results.data?.items.length != 0 ? (
        results.data?.items.map((result) => (
          <p key={result.name}>
            {result.name} - {result.document_type}
          </p>
        ))
      ) : (
        <p>No results found</p>
      )}
    </div>
  );
};

export default Search;
