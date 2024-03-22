"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
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

import { Checkbox } from "@/components/ui/checkbox";
type Property = {
  value: string;
  label: string;
};

const languages: Property[] = [
  {
    value: "fra",
    label: "French",
  },
  {
    value: "eng",
    label: "English",
  },
  {
    value: "lat",
    label: "Latin",
  },
  {
    value: "ger",
    label: "German",
  },
  {
    value: "csharp",
    label: "C#",
  },
];

export function FilterBox() {
  const [open, setOpen] = React.useState(false);
  const [selected, setselected] = React.useState<Property[]>([]);

  const handleSelect = (checked: string | boolean, value: string) => {
    if (!checked) {
      setselected((prevselected) =>
        prevselected.filter(
          (selectedLanguage) => selectedLanguage.value !== value
        )
      );
    } else {
      setselected((prevselected) =>
        [
          ...prevselected,
          languages.find((lang) => lang.value === value) || {
            value: "",
            label: "",
          },
        ].filter((language): language is Property => language !== null)
      );
    }
  };

  return (
    <div className="flex items-center space-x-4">
      <p className="text-sm text-muted-foreground">Languages</p>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-[150px] justify-start">
            {selected.length > 0 ? (
              <>
                {selected.map((language, index) => (
                  <span key={language.value}>
                    {language.label}
                    {index !== selected.length - 1 && ", "}
                  </span>
                ))}
              </>
            ) : (
              <>+ Select languages</>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 w-58" side="right" align="start">
          <Command>
            <CommandInput placeholder="Search languages..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {languages.map((language) => (
                  <CommandItem
                    key={language.value}
                    value={language.label}
                    className="space-x-2"
                  >
                    <Checkbox
                      id={language.value}
                      checked={selected?.includes(language)}
                      onCheckedChange={(checked) => {
                        handleSelect(checked, language.value);
                      }}
                    />
                    <label htmlFor={language.value} className="cursor-pointer">
                      {language.label}
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
