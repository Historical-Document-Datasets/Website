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
    results: {},
    filters: {},
    conjunction: {},
    page: 1,
  };

  const reducer: Reducer<SearchState, SearchAction> = (
    state: SearchState,
    action: SearchAction
  ) => {
    switch (action.type) {
      case "SET_QUERY":
        return { ...state, query: action.payload };
      case "SET_RESULTS":
        return { ...state, results: action.payload };
      case "SET_FILTERS":
        return { ...state, filters: { ...state.filters, ...action.payload } };
      case "SET_CONJUNCTION":
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

    dispatch({ type: "SET_QUERY", payload: query });
    dispatch({ type: "SET_PAGE", payload: page });
  }, []);

  useEffect(() => {
    const params: { query?: string; page?: string } = {};

    if (state.query !== "") {
      params.query = state.query;
    }

    if (state.page !== 1) {
      params.page = state.page.toString();
    }

    setSearchParams(params);
  }, [state.page, state.query, setSearchParams]);

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
