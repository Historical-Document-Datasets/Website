import { Aggregation, SearchAction, SearchState } from "@/utils/types";
import { ArrowLeftFromLine, ArrowRightFromLine, FilterX } from "lucide-react";
import { Dispatch, useState } from "react";
import { FilterBox } from "./Filterbox";
import { Button } from "./ui/button";

export default function Sidebar({
  mobile,
  state,
  dispatch,
}: {
  mobile: boolean;
  state: SearchState;
  dispatch: Dispatch<SearchAction>;
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const { results } = state;

  return (
    <div
      className={
        !mobile
          ? isCollapsed
            ? "pt-6 w-13"
            : "pt-6 border-r border-border/80 mr-8 hidden md:block md:w-1/3 lg:w-1/5 lg:min-w-64 sticky top-0 h-screen"
          : ""
      }
    >
      <div className="flex justify-between pr-6 pb-2">
        <h2 className={isCollapsed ? "hidden" : "text-2xl font-semibold"}>
          Filters
        </h2>
        {!mobile ? (
          <Button
            variant="outline"
            size="icon"
            onClick={toggleCollapse}
            title={isCollapsed ? "Expand" : "Collapse"}
          >
            {isCollapsed ? (
              <ArrowRightFromLine className="h-4 w-4" />
            ) : (
              <ArrowLeftFromLine className="h-4 w-4" />
            )}
          </Button>
        ) : (
          <></>
        )}
      </div>
      <div className={isCollapsed ? "hidden" : "pr-6"}>
        <div className="flex flex-col gap-4">
          {Object.values(results?.data?.aggregations || {}).map(
            (aggregation: Aggregation) => (
              <FilterBox
                key={aggregation.name}
                aggregation={aggregation}
                state={state}
                dispatch={dispatch}
              />
            )
          )}
        </div>

        <Button
          variant="outline"
          className="w-full mt-8"
          onClick={() => dispatch({ type: "CLEAR_FILTERS" })}
        >
          <FilterX className="h-4 w-4 mr-2" />
          Clear filters
        </Button>
      </div>
    </div>
  );
}
