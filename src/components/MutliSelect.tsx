import * as React from "react";

import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { FormSchemaType } from "@/utils/types";
import { Command as CommandPrimitive } from "cmdk";
import { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";

export function FancyMultiSelect({
  field,
  values,
  defaults,
  placeholder,
  form,
}: {
  field: keyof FormSchemaType;
  values: string[];
  defaults: string[];
  placeholder: string;
  form: UseFormReturn<FormSchemaType>;
}) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<string[]>(defaults);
  const [inputValue, setInputValue] = React.useState("");

  useEffect(() => {
    form.setValue(field, selected);
  }, [selected]);

  const handleUnselect = React.useCallback((value: string) => {
    setSelected((prev) => prev.filter((s) => s !== value));
  }, []);

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (input) {
        if (e.key === "Delete" || e.key === "Backspace") {
          if (input.value === "") {
            setSelected((prev) => {
              const newSelected = [...prev];
              newSelected.pop();
              return newSelected;
            });
          }
        }
        // This is not a default behaviour of the <input /> field
        if (e.key === "Escape") {
          input.blur();
        }
      }
    },
    []
  );

  const selectables = values.filter((value) => !selected.includes(value));

  return (
    <Command
      onKeyDown={handleKeyDown}
      className="overflow-visible bg-transparent"
    >
      <div className="group flex rounded-md border border-input px-3 py-1 min-h-9 shadow-sm text-sm ring-offset-background focus-within:ring-1 focus-within:ring-ring">
        <div className="flex flex-wrap gap-1 flex-1">
          {selected.map((value) => {
            return (
              <Badge
                key={value}
                variant="secondary"
                onClick={() => handleUnselect(value)}
                className="cursor-pointer"
              >
                {value}
                <button
                  className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleUnselect(value);
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                >
                  ×
                </button>
              </Badge>
            );
          })}
          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder={placeholder}
            className={cn(
              "flex-1 bg-transparent outline-none placeholder:text-muted-foreground",
              selected.length > 0 ? "pl-2" : ""
            )}
          />
        </div>
      </div>
      <div className="relative">
        <CommandList>
          {open && selectables.length > 0 ? (
            <div className="absolute top-0 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in max-h-64 overflow-hidden overflow-y-scroll">
              <CommandGroup className="h-full overflow-auto">
                {selectables.map((value) => {
                  return (
                    <CommandItem
                      key={value}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onSelect={() => {
                        setInputValue("");
                        setSelected((prev) => [...prev, value]);
                      }}
                      className={"cursor-pointer"}
                    >
                      {value}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </div>
          ) : null}
        </CommandList>
      </div>
    </Command>
  );
}
