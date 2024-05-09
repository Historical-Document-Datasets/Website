import { SearchAction, SearchState } from "@/utils/types";

import useSWRImmutable from "swr/immutable";

import { Error, Loader } from "@/components/Loaders";
import Search from "@/components/Search";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { fetcher } from "@/utils/helpers";
import { Filter } from "lucide-react";
import { Reducer, useReducer } from "react";

export default function Browse() {
  const searchState: SearchState = {
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
