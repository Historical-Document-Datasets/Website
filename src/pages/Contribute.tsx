import { zodResolver } from "@hookform/resolvers/zod";
import { Control, useForm } from "react-hook-form";
import SyntaxHighlighter from "react-syntax-highlighter";
import { stringify } from "yaml";
import { z } from "zod";

import CopyToClipboard from "@/components/CopyToClipboard";
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
import { useState } from "react";

const FormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
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
  description: string;
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

function InputForm() {
  const [output, setOutput] = useState<string | null>(null);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setOutput(stringify(data));
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6"
        >
          <TextInput
            control={form.control}
            name="name"
            label="Name"
            placeholder="HTR Benchmarks"
            description="The name of the dataset you are adding."
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
