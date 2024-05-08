import { SearchAction, SearchState } from "@/utils/types";

import useSWRImmutable from "swr/immutable";

import { Error, Loader } from "@/components/Loaders";
import Search from "@/components/Search";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { fetcher } from "@/utils/helpers";
import { Filter } from "lucide-react";
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
      default:
        throw new TypeError("Invalid action type");
    }
  };

  const [state, dispatch] = useReducer(reducer, searchState);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const query = searchParams.get("query") || "";
    const page = parseInt(searchParams.get("page") || "1");
    let sort = searchParams.get("sort") as "name_asc" | "name_desc" | "none";
    if (sort === null) {
      sort = "none";
    }
    const perPage = parseInt(searchParams.get("perPage") || "20");
    const filters = JSON.parse(searchParams.get("filters") || "{}");
    const conjunction = JSON.parse(searchParams.get("conjunction") || "{}");

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
  } = useSWRImmutable(
    "https://raw.githubusercontent.com/Historical-Document-Datasets/Catalog/main/catalog.json",
    fetcher
  );

  if (error) return <Error />;

  if (isLoading) return <Loader />;

  return (
    <div className="flex h-full">
      <Sidebar mobile={false} state={state} dispatch={dispatch} />
      <Sheet>
        <SheetTrigger asChild>
          <Button className="mr-4 mt-6 md:hidden" variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side={"left"}>
          <Sidebar mobile={true} state={state} dispatch={dispatch} />
        </SheetContent>
      </Sheet>

      <div className="flex-1">
        <Search state={state} dispatch={dispatch} data={data} />
      </div>
    </div>
  );
}
