import { CircleAlert, LoaderCircle } from "lucide-react";
import { Button } from "./ui/button";

export const Error = () => {
  return (
    <div className="flex items-center pt-6 flex-col">
      <div className="w-full rounded-lg border px-4 py-3 text-sm flex items-center justify-between border-destructive/50 dark:border-destructive max-w-screen-sm">
        <div className="flex gap-2 items-center text-destructive">
          <CircleAlert strokeWidth={1.5} />
          <div>
            <h5 className="font-medium leading-none tracking-tight mb-1">
              Uh oh!
            </h5>
            <p className="text-sm leading-none">
              An error occurred while fetching the data. Please try again later.
            </p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="h-7"
          onClick={() => window.location.reload()}
        >
          Retry
        </Button>
      </div>
    </div>
  );
};

export const Loader = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="flex items-center gap-1 text-muted-foreground">
        <LoaderCircle className="animate-spin w-4 h-4" />
        <h2>Loading...</h2>
      </div>
    </div>
  );
};
