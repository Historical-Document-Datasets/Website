import { Input } from "@/components/ui/input";
import {
  Dataset,
  SearchAction,
  SearchActionTypes,
  SearchState,
} from "@/utils/types";
import ItemsJS from "itemsjs";
import MiniSearch from "minisearch";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import ResultCard from "./ResultCard";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import Pagination from "./Pagination";

const Search = ({
  state,
  dispatch,
  data,
}: {
  state: SearchState;
  dispatch: Dispatch<SearchAction>;
  data: Dataset[] | [];
}) => {
  const [perPage, setPerPage] = useState(20);
  const [sort, setSort] = useState("");

  const [searchQuery, setSearchQuery] = useState("");

  const { results, filters, conjunction, page } = state;

  useEffect(() => {
    const config = {
      native_search_enabled: false,
      custom_id_field: "id",
      sortings: {
        name_asc: {
          field: "name",
          order: "asc",
        },
        name_desc: {
          field: "name",
          order: "desc",
        },
      },
      aggregations: {
        language: {
          title: "Language",
          size: 100,
          conjunction: conjunction?.language || false,
        },
        task: {
          title: "Task",
          size: 100,
          conjunction: conjunction?.task || false,
        },
        format: {
          title: "Image format",
          size: 100,
          conjunction: conjunction?.format || false,
        },
        mode: {
          title: "Color mode",
          size: 100,
          conjunction: conjunction?.mode || false,
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
      page: page,
      per_page: perPage,
      sort: sort as "name_asc" | "name_desc",
      // @ts-expect-error field "ids" is not implemented in @types/itemsjs
      ids: search_results.map((v) => v.id),
      filters: filters,
    });

    dispatch({ type: SearchActionTypes.SET_RESULTS, payload: filteredResults });
  }, [searchQuery, filters, conjunction, page, perPage, sort, data, dispatch]);

  const handleSearchChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setSearchQuery(e.target.value);
    dispatch({ type: SearchActionTypes.SET_PAGE, payload: 1 });
  };

  return (
    <div className="py-6 gap-8">
      <h1 className="text-3xl">Browse datasets</h1>
      <div className="py-2 flex gap-x-4 gap-y-2 flex-wrap lg:flex-nowrap">
        <Input
          type="text"
          placeholder="Type anything to search..."
          value={searchQuery}
          onChange={handleSearchChange}
          autoFocus
          className="h-10"
        />
        <div className="flex gap-4 justify-end items-center lg:shrink-0">
          <span className="text-sm shrink-0">Sort by</span>
          <Select
            defaultValue="none"
            onValueChange={(value) => {
              setSort(value);
            }}
          >
            <SelectTrigger className="min-w-32">
              <SelectValue placeholder="none" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">No sorting</SelectItem>
              <SelectItem value="name_asc">Name (asc)</SelectItem>
              <SelectItem value="name_desc">Name (desc)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-4 justify-end items-center lg:shrink-0">
          <span className="text-sm">Results per page</span>
          <Select
            defaultValue="20"
            onValueChange={(value) => {
              setPerPage(parseInt(value));
              dispatch({ type: SearchActionTypes.SET_PAGE, payload: 1 });
            }}
          >
            <SelectTrigger className="w-24 shrink-0">
              <SelectValue placeholder="30" />
            </SelectTrigger>
            <SelectContent className="max-w-24 min-w-0">
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="30">30</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem
                value={results?.pagination?.total.toString() || "all"}
              >
                <b>All ({results?.pagination?.total})</b>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex justify-between items-center pb-2">
        <p className="text-foreground/60 text-sm shrink-0">
          {results?.pagination?.total} results found in {results.timings?.total}
          ms &mdash; Showing {results?.data?.items.length} results
        </p>
        <Pagination
          page={page}
          setPage={(value) => {
            dispatch({ type: SearchActionTypes.SET_PAGE, payload: value });
          }}
          total={results?.pagination?.total}
          perPage={perPage}
        />
      </div>

      {results.data?.items.length != 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 items-start ">
            {results.data?.items.map((result) => (
              <ResultCard dataset={result} key={result.id} />
            ))}
          </div>

          <div className="pt-4 flex justify-center">
            <Pagination
              page={page}
              setPage={(value) => {
                dispatch({ type: SearchActionTypes.SET_PAGE, payload: value });
              }}
              total={results?.pagination?.total}
              perPage={perPage}
            />
          </div>
        </>
      ) : (
        <p>No results found</p>
      )}
    </div>
  );
};

export default Search;
