import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { ChevronDown, ChevronUp } from "lucide-react";

import { Checkbox } from "@/components/ui/checkbox";
import { Aggregation, Bucket } from "@/utils/types";
import { useState } from "react";
import { Badge } from "./ui/badge";

export function FilterBox({ aggregation }: { aggregation: Aggregation }) {
  const [open, setOpen] = useState(false);
  const [selected, setselected] = useState<Bucket[]>([]);
  const buckets = aggregation.buckets;

  const removeItem = (bucket: Bucket) => {
    setselected((prevSelected) =>
      prevSelected.filter((prevBucket) => prevBucket !== bucket)
    );
  };

  const handleSelect = (checked: string | boolean, bucket: Bucket) => {
    if (checked) {
      setselected((prevSelected) => [...prevSelected, bucket]);
    } else {
      removeItem(bucket);
    }
  };

  return (
    <div>
      <h3 className="font-lg font-medium pb-1">{aggregation.title}</h3>
      <div className="pr-6">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <div className="w-full px-2 py-2 rounded-md border cursor-pointer flex justify-between items-center">
              <div className="flex flex-wrap gap-1">
                {selected.length > 0 ? (
                  <>
                    {selected.map((bucket) => (
                      <Badge
                        variant={"outline"}
                        className="font-medium"
                        onClick={(event) => {
                          event.stopPropagation();
                          removeItem(bucket);
                        }}
                        key={bucket.key}
                      >
                        <span className="pr-1">{bucket.key}</span> ×
                      </Badge>
                    ))}
                  </>
                ) : (
                  <p className="pl-1">
                    Select {aggregation.title.toLowerCase()}
                  </p>
                )}
              </div>
              {open ? (
                <ChevronUp className="h-4" />
              ) : (
                <ChevronDown className="h-4" />
              )}
            </div>
          </PopoverTrigger>
          <PopoverContent className="p-0 w-58" side="right" align="start">
            <Command>
              <CommandInput placeholder="Search languages..." />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup>
                  {buckets.map((bucket) => (
                    <CommandItem key={bucket.key} value={bucket.key}>
                      <Checkbox
                        id={bucket.key}
                        checked={selected?.includes(bucket)}
                        onCheckedChange={(checked) => {
                          handleSelect(checked, bucket);
                        }}
                        className="mr-2"
                      />
                      <label htmlFor={bucket.key} className="cursor-pointer">
                        {bucket.key} ({bucket.doc_count})
                      </label>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
