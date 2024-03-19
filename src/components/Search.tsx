import { Input } from "@/components/ui/input";
import ItemsJS from "itemsjs";
import MiniSearch from "minisearch";
import { useEffect, useState } from "react";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState([]);
  const [results, setResults] = useState({});

  useEffect(() => {
    const items = [
      {
        id: 1,
        name: "ICDAR 2021 HDC",
        languages: ["Latin"],
        image_format: ["TIFF", "JPG"],
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
          title: "image_format",
          size: 10,
        },
      },
      searchableFields: ["name"],
    };

    const miniSearch = new MiniSearch({
      fields: ["name"],
    });

    miniSearch.addAll(items);

    const itemsjs = ItemsJS(items, config);

    // Search with MiniSearch
    const search_results = miniSearch.search(searchQuery, {
      prefix: true,
      fuzzy: 0.2,
    });

    const filteredResults = itemsjs.search({
      per_page: 3,
      ids: search_results.map((v) => v.id),
      filters: {},
    });

    setResults(filteredResults);
  }, [searchQuery, filters]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input
          type="text"
          placeholder="Type anything to search..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      {results.data?.items.length != 0 ? (
        results.data?.items.map((result) => (
          <li key={result.name}>
            {result.name} - {result.document_type}
          </li>
        ))
      ) : (
        <p>Type something to search.</p>
      )}
    </>
  );
};

export default Search;
