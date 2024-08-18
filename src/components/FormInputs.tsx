import { FormSchemaType } from "@/utils/types";
import { UseFormReturn } from "react-hook-form";
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
  form,
  name,
  label,
  placeholder,
  description,
}: {
  form: UseFormReturn<FormSchemaType>;
  name: keyof FormSchemaType;
  label: string;
  placeholder: string;
  description?: string;
}) => {
  return (
    <FormField
      control={form.control}
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
  form,
  name,
  label,
  placeholder,
  description,
  options,
}: {
  form: UseFormReturn<FormSchemaType>;
  name: keyof FormSchemaType;
  label: string;
  placeholder: string;
  description?: string;
  options: string[];
}) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <FancyMultiSelect
              field={name}
              values={options}
              defaults={(form.getValues(name) as string[]) || [""]}
              form={form}
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
