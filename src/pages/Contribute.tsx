import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import SyntaxHighlighter from "react-syntax-highlighter";
import { stringify } from "yaml";
import { z } from "zod";

import CopyToClipboard from "@/components/CopyToClipboard";
import { SelectInput, TextInput } from "@/components/FormInputs";
import { Error, Loader } from "@/components/Loaders";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { fetcher } from "@/utils/helpers";
import { FormSchema } from "@/utils/types";
import { useState } from "react";
import useSWRImmutable from "swr/immutable";

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
          <div className="grid grid-cols-2 gap-4">
            <TextInput
              control={form.control}
              name="name"
              label="Name"
              placeholder="HTR Benchmarks"
            />
            <SelectInput
              control={form.control}
              name="languages"
              label="Languages"
              placeholder="French, Latin, Arabic..."
              options={data["language"].sort()}
            />
          </div>
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
