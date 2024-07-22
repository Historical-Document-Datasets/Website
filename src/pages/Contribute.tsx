import { zodResolver } from "@hookform/resolvers/zod";
import { Control, useForm } from "react-hook-form";
import SyntaxHighlighter from "react-syntax-highlighter";
import { stringify } from "yaml";
import { z } from "zod";

import CopyToClipboard from "@/components/CopyToClipboard";
import { Error, Loader } from "@/components/Loaders";
import { FancyMultiSelect } from "@/components/MutliSelect";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { fetcher } from "@/utils/helpers";
import { useState } from "react";
import useSWRImmutable from "swr/immutable";

const FormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  languages: z.array(z.string()).nonempty("At least one language is required."),
});

type FormSchemaType = z.infer<typeof FormSchema>;

const TextInput = ({
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

const SelectInput = ({
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

function InputForm() {
  const [output, setOutput] = useState<string | null>(null);

  const {
    data,
    error,
    isLoading = true,
  } = useSWRImmutable(import.meta.env.VITE_CATALOG_URL + `/values/`, fetcher);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
    },
  });

  if (isLoading) return <Loader />;

  if (error) return <Error />;

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setOutput(stringify(data));
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="">
          <SelectInput
            control={form.control}
            name="languages"
            label="Languages"
            placeholder="French, Latin, Arabic..."
            options={data["language"].sort()}
          />
          <TextInput
            control={form.control}
            name="name"
            label="Name"
            placeholder="HTR Benchmarks"
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
      {output && (
        <div>
          <h2 className="text-xl font-medium mt-4 mb-2">Formatted output</h2>
          <div className="relative">
            <CopyToClipboard text={output} />
            <SyntaxHighlighter
              language="yaml"
              showLineNumber={true}
              className="border rounded-md z-10"
            >
              {output}
            </SyntaxHighlighter>
          </div>
        </div>
      )}
    </>
  );
}

export default function Contribute() {
  return (
    <div>
      <h1>Contribute</h1>
      <InputForm />
    </div>
  );
}
