import { SearchAction, SearchState } from "@/utils/types";

import useSWRImmutable from "swr/immutable";

import { Error, Loader } from "@/components/Loaders";
import Search from "@/components/Search";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { fetcher } from "@/utils/helpers";
import { ArrowUp } from "lucide-react";
import { Reducer, useEffect, useReducer } from "react";
import { useSearchParams } from "react-router-dom";

export default function Browse() {
  const searchState: SearchState = {
    query: "",
    sort: "none",
    perPage: 20,
    results: {},
    filters: {},
    conjunction: {},
    page: 1,
  };

  const filterValues = (object: object, payload: object) => {
    return Object.fromEntries(
      Object.entries(object).filter(([_]) => _ !== Object.keys(payload)[0])
    );
  };

  const reducer: Reducer<SearchState, SearchAction> = (
    state: SearchState,
    action: SearchAction
  ) => {
    switch (action.type) {
      case "SET_QUERY":
        return { ...state, query: action.payload };
      case "SET_SORT":
        return { ...state, sort: action.payload };
      case "SET_PER_PAGE":
        return { ...state, perPage: action.payload };
      case "SET_RESULTS":
        return { ...state, results: action.payload };
      case "SET_FILTERS": {
        // if filter is empty, remove it from the filters object
        if (
          Object.values(action.payload).length != 0 &&
          Object.values(action.payload)[0].length === 0
        ) {
          const newFilters = filterValues(state.filters, action.payload);
          return { ...state, filters: newFilters };
        }

        return { ...state, filters: { ...state.filters, ...action.payload } };
      }
      case "SET_CONJUNCTION":
        // if conjunction for a filter is false, remove it from the conjunction object
        if (
          Object.values(action.payload).length != 0 &&
          Object.values(action.payload)[0] === false
        ) {
          const newConjunction = filterValues(
            state.conjunction,
            action.payload
          );
          return { ...state, conjunction: newConjunction };
        }
        return {
          ...state,
          conjunction: { ...state.conjunction, ...action.payload },
        };
      case "SET_PAGE":
        return { ...state, page: action.payload };
      case "CLEAR_FILTERS":
        return { ...state, filters: {}, conjunction: {} };
      default:
        throw new TypeError("Invalid action type");
    }
  };

  const [state, dispatch] = useReducer(reducer, searchState);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const query = searchParams.get("query") || "";
    const page = parseInt(searchParams.get("page") || "1") || 1; // TODO: add validation

    let sort = searchParams.get("sort") as "name_asc" | "name_desc" | "none";
    if (sort === null) {
      sort = "none";
    }
    let perPage = parseInt(searchParams.get("perPage") || "20"); // TODO: add "all"
    const possibleValues = [10, 20, 30, 50];
    if (!possibleValues.includes(perPage)) {
      perPage = 20;
    }

    let filters = {};
    try {
      filters = JSON.parse(searchParams.get("filters") || "{}");
    } catch (e) {
      console.error(e);
    }

    let conjunction = {};
    try {
      conjunction = JSON.parse(searchParams.get("conjunction") || "{}");
    } catch (e) {
      console.log(e);
    }

    dispatch({ type: "SET_QUERY", payload: query });
    dispatch({ type: "SET_PAGE", payload: page });
    dispatch({ type: "SET_SORT", payload: sort });
    dispatch({ type: "SET_PER_PAGE", payload: perPage });
    dispatch({ type: "SET_FILTERS", payload: filters });
    dispatch({ type: "SET_CONJUNCTION", payload: conjunction });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const params: {
      query?: string;
      page?: string;
      sort?: "name_asc" | "name_desc" | "none";
      perPage?: string;
      filters?: string;
      conjunction?: string;
    } = {};

    if (state.query !== "") {
      params.query = state.query;
    }

    if (state.page !== 1) {
      params.page = state.page.toString();
    }

    if (state.sort !== "none") {
      params.sort = state.sort;
    }

    if (state.perPage !== 20) {
      params.perPage = state.perPage.toString();
    }

    if (Object.keys(state.filters).length > 0) {
      params.filters = JSON.stringify(state.filters);
    }

    if (Object.keys(state.conjunction).length > 0) {
      params.conjunction = JSON.stringify(state.conjunction);
    }

    setSearchParams(params);
  }, [
    state.page,
    state.query,
    state.sort,
    state.perPage,
    state.filters,
    state.conjunction,
    setSearchParams,
  ]);

  const {
    data = [],
    error,
    isLoading = true,
  } = useSWRImmutable(import.meta.env.VITE_CATALOG_URL, fetcher);

  if (error) return <Error />;

  if (isLoading) return <Loader />;

  return (
    <div className="flex h-full">
      <Sidebar mobile={false} state={state} dispatch={dispatch} />

      <div className="flex-1">
        <Search state={state} dispatch={dispatch} data={data} />
      </div>
      <div className="fixed bottom-8 right-8">
        <Button
          variant="outline"
          size={"icon"}
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          title="Scroll to top"
        >
          <ArrowUp className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
