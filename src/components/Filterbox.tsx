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

import { ChevronDown, ChevronUp, CircleHelp } from "lucide-react";

import { Checkbox } from "@/components/ui/checkbox";
import {
  Aggregation,
  SearchAction,
  SearchActionTypes,
  SearchState,
} from "@/utils/types";
import { Dispatch, useState } from "react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function FilterBox({
  aggregation,
  state,
  dispatch,
}: {
  aggregation: Aggregation;
  state: SearchState;
  dispatch: Dispatch<SearchAction>;
}) {
  const [open, setOpen] = useState(false);
  const buckets = aggregation.buckets;
  const { filters, conjunction } = state;

  const selectedItems = filters[aggregation.name] || [];

  const removeItem = (bucket_key: string) => {
    dispatch({
      type: SearchActionTypes.SET_FILTERS,
      payload: {
        [aggregation.name]: (filters[aggregation.name] || []).filter(
          (value) => value !== bucket_key
        ),
      },
    });
  };

  const handleSelect = (checked: string | boolean, bucket_key: string) => {
    dispatch({
      type: SearchActionTypes.SET_PAGE,
      payload: 1,
    });

    if (checked) {
      dispatch({
        type: SearchActionTypes.SET_FILTERS,
        payload: {
          [aggregation.name]: [
            ...(filters[aggregation.name] || []),
            bucket_key,
          ],
        },
      });
    } else {
      removeItem(bucket_key);
    }
  };

  return (
    <div>
      <div className="flex justify-between pb-1">
        <h3 className="font-lg font-medium">{aggregation.title}</h3>
        <div className="flex items-center space-x-1">
          <Switch
            id="airplane-mode"
            disabled={selectedItems.length !== 0}
            checked={conjunction[aggregation.name] || false}
            onCheckedChange={(checked) => {
              dispatch({
                type: SearchActionTypes.SET_CONJUNCTION,
                payload: {
                  [aggregation.name]: checked,
                },
              });
            }}
          />
          <Label
            className="text-xs flex gap-2 items-center"
            htmlFor="airplane-mode"
          >
            <span>Conjunction</span>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <CircleHelp size={14} />
                </TooltipTrigger>
                <TooltipContent>
                  Whether the filters should be AND / OR. <br /> To avoid any
                  bugs, changing this setting is disabled after selecting any
                  filters.
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Label>
        </div>
      </div>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div className="w-full px-2 py-2 rounded-md border cursor-pointer flex justify-between items-center">
            <div className="flex flex-wrap gap-1">
              {selectedItems.length > 0 ? (
                <>
                  {selectedItems.map((key) => (
                    <Badge
                      variant={"outline"}
                      className="font-medium"
                      onClick={(event) => {
                        event.stopPropagation();
                        removeItem(key);
                      }}
                      key={key}
                    >
                      <span className="pr-1">{key}</span> ×
                    </Badge>
                  ))}
                </>
              ) : (
                <p className="pl-1">Select {aggregation.title.toLowerCase()}</p>
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
                      checked={selectedItems.includes(bucket.key)}
                      onCheckedChange={(checked) =>
                        handleSelect(checked, bucket.key)
                      }
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
  );
}
