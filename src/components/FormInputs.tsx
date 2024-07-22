import { FormSchemaType } from "@/utils/types";
import { Control } from "react-hook-form";
import { FancyMultiSelect } from "./MutliSelect";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

export const TextInput = ({
  control,
  name,
  label,
  placeholder,
  description,
}: {
  control: Control<FormSchemaType>;
  name: keyof FormSchemaType;
  label: string;
  placeholder: string;
  description?: string;
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input placeholder={placeholder} {...field} />
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export const SelectInput = ({
  control,
  name,
  label,
  placeholder,
  description,
  options,
}: {
  control: Control<FormSchemaType>;
  name: keyof FormSchemaType;
  label: string;
  placeholder: string;
  description?: string;
  options: string[];
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <FancyMultiSelect
              values={options}
              placeholder={placeholder}
              {...field}
            />
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
