import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div
      className={isCollapsed ? "w-13" : "w-1/5 border-r border-border/80 mr-8"}
    >
      <div className="py-6 flex justify-between pr-6">
        <h2 className={isCollapsed ? "hidden" : "text-xl font-semibold"}>
          Filters
        </h2>
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
      </div>
    </div>
  );
}
