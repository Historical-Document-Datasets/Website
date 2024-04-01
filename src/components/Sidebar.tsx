import { Aggregation, SearchResult } from "@/utils/types";
import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";
import { useState } from "react";
import { FilterBox } from "./Filterbox";
import { Button } from "./ui/button";

export default function Sidebar({
  mobile,
  results,
}: {
  mobile: boolean;
  results: SearchResult;
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div
      className={
        !mobile
          ? isCollapsed
            ? "pt-6 w-13"
            : "pt-6 border-r border-border/80 mr-8 hidden md:block md:w-1/3 lg:w-1/5 lg:min-w-64"
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
      <div className={isCollapsed ? "hidden" : "flex flex-col gap-4"}>
        {Object.values(results.data?.aggregations || {}).map(
          (aggregation: Aggregation) => (
            <FilterBox key={aggregation.name} aggregation={aggregation} />
          )
        )}
      </div>
    </div>
  );
}
