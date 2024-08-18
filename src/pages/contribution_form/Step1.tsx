import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import SyntaxHighlighter from "react-syntax-highlighter";
import { stringify } from "yaml";
import { z } from "zod";

import CopyToClipboard from "@/components/CopyToClipboard";
import { SelectInput, TextInput } from "@/components/FormInputs";
import { Error, Loader } from "@/components/Loaders";
import { MinimalTiptapEditor } from "@/components/minimal-tiptap";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { fetcher } from "@/utils/helpers";
import { Step1FormSchema } from "@/utils/types";
import { updateInfo } from "@/utils/updateActions";
import { useStateMachine } from "little-state-machine";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useSWRImmutable from "swr/immutable";

export default function Step1() {
  const [output, setOutput] = useState<string | null>(null);
  const navigate = useNavigate();
  const { actions, state } = useStateMachine({ updateInfo });

  const {
    data,
    error,
    isLoading = true,
  } = useSWRImmutable(import.meta.env.VITE_CATALOG_URL + `/values/`, fetcher);

  const form = useForm<z.infer<typeof Step1FormSchema>>({
    resolver: zodResolver(Step1FormSchema),
    defaultValues: {
      name: "",
      languages: [],
      tasks: [""],
      formats: [],
      modes: [],
      statistics: "",
      class: "",
      document_type: "",
      resolution: "",
      reference: "",
      description: "",
    },
  });

  useEffect(() => {
    if (state.information) {
      form.reset(state.information);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) return <Loader />;

  if (error) return <Error />;

  function onSubmit(submit_data: z.infer<typeof Step1FormSchema>) {
    setOutput(stringify(submit_data));
    actions.updateInfo(submit_data);
    navigate("2");
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-x-4">
            <TextInput
              form={form}
              name="name"
              label="Name"
              placeholder="HTR Benchmarks"
            />
            <SelectInput
              form={form}
              name="languages"
              label="Languages"
              placeholder="French, Latin, Arabic..."
              options={data["language"].sort()}
            />
            <SelectInput
              form={form}
              name="tasks"
              label="Tasks"
              placeholder="Handwritten text recognition..."
              options={data["task"].sort()}
            />
            <div className="grid grid-cols-2 gap-x-4">
              <SelectInput
                form={form}
                name="formats"
                label="Image formats"
                placeholder="PNG, SVG, JPEG..."
                options={data["format"].sort()}
              />
              <SelectInput
                form={form}
                name="modes"
                label="Color modes"
                placeholder="RGB, Grayscale..."
                options={data["mode"].sort()}
              />
            </div>
            <div className="grid grid-cols-2 gap-x-4">
              <TextInput
                form={form}
                name="statistics"
                label="Statistics"
                placeholder="1000 images, 5000 lines..."
              />
              <TextInput
                form={form}
                name="class"
                label="Class"
                placeholder="Public, Private..."
              />
            </div>
            <TextInput
              form={form}
              name="document_type"
              label="Document type"
              placeholder="Printed, Handwritten..."
            />
            <TextInput
              form={form}
              name="resolution"
              label="Resolution"
              placeholder="300 DPI..."
            />
            <TextInput
              form={form}
              name="reference"
              label="Reference"
              placeholder="https://example.com"
            />
          </div>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Description</FormLabel>
                <FormControl>
                  <MinimalTiptapEditor
                    {...field}
                    onValueChange={field.onChange}
                    value={form.getValues("description")}
                    outputValue="html"
                    className={cn("w-full", {
                      "border-red-500 focus-within:border-red-500":
                        form.formState.errors.description,
                    })}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="mt-4 w-full">
            Get formatted data
          </Button>
        </form>
      </Form>
      {output && (
        <div>
          <h2 className="text-xl font-medium mt-4 mb-2">Formatted output</h2>
          <div className="relative">
            <CopyToClipboard text={output} />
            <SyntaxHighlighter
              language="yaml"
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
