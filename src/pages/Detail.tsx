import LatexRenderer from "@/components/LatexRenderer";
import { Error, Loader } from "@/components/Loaders";
import { Property } from "@/components/ResultCard";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetcher, textFetcher } from "@/utils/helpers";
import { Dataset } from "@/utils/types";
import { Cite } from "@citation-js/core";
import "@citation-js/plugin-bibtex";
import "@citation-js/plugin-csl";
import { Check, Clipboard, Undo2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useSWRImmutable from "swr/immutable";

export default function Detail() {
  const { name } = useParams();
  const [bibCitation, setBibCitation] = useState<string | undefined>();
  const [apaCitation, setApaCitation] = useState<string | undefined>();
  const [apaLink, setApaLink] = useState<string | undefined>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [bibEntries, setBibEntries] = useState<any[] | undefined>();

  const [isCopied, setIsCopied] = useState(false);

  const {
    data = {} as Dataset,
    error,
    isLoading = true,
  } = useSWRImmutable(
    import.meta.env.VITE_CATALOG_URL + `/detail/${name}`,
    fetcher
  );

  const { data: bibData } = useSWRImmutable(
    import.meta.env.VITE_CATALOG_URL + `/detail/${name}/bib`,
    textFetcher
  );

  useEffect(() => {
    if (bibData == "No reference found") {
      setBibCitation(undefined);
      setApaCitation(undefined);
      return;
    } else {
      Cite.async(bibData).then(
        // FIXME: any
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (entries: any) => {
          setBibEntries(entries.data);
          const entryData = entries.data.find(
            (entry: { [key: string]: string }) =>
              entry["citation-key"] === data.reference
          );

          if (entryData) {
            const entry = new Cite(entryData);

            setBibCitation(entry.format("bibtex").replace(/\n$/, ""));

            const formatted = entry.format("bibliography", {
              template: "apa",
              lang: "en-US",
            });

            const apaLinkRegex = /(https?:\/\/[^\s]+)/g;
            const apaLinkMatch = apaLinkRegex.exec(formatted);

            setApaCitation(formatted.replace(apaLinkRegex, ""));
            setApaLink(apaLinkMatch ? apaLinkMatch[1] : undefined);
          }
        }
      );
    }
  }, [bibData, data.reference]);

  if (isLoading) return <Loader />;

  if (error?.status == 404) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-4xl font-bold mb-2">404: Not Found</h1>
        <p className="text-lg mb-4">The requested item could not be found.</p>
        <Link to="/browse/">
          <Button variant={"outline"}>Go Home</Button>
        </Link>
      </div>
    );
  }

  if (error) return <Error />;

  return (
    <div className="flex flex-wrap gap-6 justify-between pt-5">
      <div className="flex-1 mb-4">
        <div className="flex gap-4 items-start">
          <Link to="/browse">
            <Button variant="outline" size={"icon"} className="rounded-full">
              <Undo2 size={16} />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold mb-3">{data.name}</h1>
        </div>

        <div className="flex gap-4 flex-wrap">
          <div className="border rounded-xl p-4 w-full md:w-auto">
            <h4 className="font-medium">Stats:</h4>
            <LatexRenderer latex={data.statistics} className="text-gray-600" />
          </div>
          <div className="border rounded-xl p-4 w-full md:w-auto">
            <h4 className="font-medium">Class:</h4>
            <LatexRenderer latex={data.class} className="text-gray-600" />
          </div>
          <div className="border rounded-xl p-4 w-full md:w-auto">
            <h4 className="font-medium">Document type:</h4>
            <LatexRenderer
              latex={data.document_type}
              className="text-gray-600"
            />
          </div>
        </div>
        <Separator className="my-4" />
        <div>
          <h3 className="text-lg font-medium mb-2">Description</h3>
          <p className="text-gray-600 text-justify">
            <LatexRenderer latex={data.description} />
          </p>
        </div>
        <Separator className="my-4" />
        <div>
          <h4 className="text-lg font-medium">Bibliography</h4>

          {bibCitation && apaCitation ? (
            <Tabs defaultValue="bibtex">
              <TabsList className="mt-2 grid w-full grid-cols-2">
                <TabsTrigger value="bibtex">BibTeX</TabsTrigger>
                <TabsTrigger value="apa">APA</TabsTrigger>
              </TabsList>
              <TabsContent value="bibtex">
                <div className="bg-[#ddd] p-2 rounded-md relative">
                  <Button
                    className="absolute right-2 top-2"
                    variant={"outline"}
                    size={"icon_sm"}
                    title="Copy to clipboard"
                    onClick={() => {
                      navigator.clipboard.writeText(bibCitation);
                      setIsCopied(true);
                      setTimeout(() => {
                        setIsCopied(false);
                      }, 2000);
                    }}
                  >
                    {isCopied ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Clipboard className="h-4 w-4" />
                    )}
                  </Button>
                  <span className="whitespace-pre-wrap </div>font-mono text-sm">
                    {bibCitation.split("\n").map((line, i, arr) => (
                      <React.Fragment key={i}>
                        {line}
                        {i < arr.length - 1 && <br />}
                      </React.Fragment>
                    ))}
                  </span>
                </div>
              </TabsContent>
              <TabsContent value="apa">
                <p>
                  {apaCitation}
                  <a
                    href={apaLink}
                    target="_blank"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    {apaLink}
                  </a>
                </p>
              </TabsContent>
            </Tabs>
          ) : (
            <p className="text-gray-600">No reference found</p>
          )}
        </div>
        <h4 className="text-lg font-medium mt-4">All references</h4>
        <ol className="grid grid-cols-2 gap-2 list-decimal">
          {bibEntries?.map((ref, i) => (
            <li
              key={i}
              id={(i + 1).toString()}
              className="p-2 rounded-md font-mono text-xs"
            >
              {new Cite(ref).format("bibliography", {
                template: "apa",
                lang: "en-US",
              })}
            </li>
          ))}
        </ol>
      </div>
      <div className="w-full sm:w-1/3 xl:w-1/4">
        <div className="border rounded-lg p-4">
          <h2 className="text-xl font-bold mb-2">Tags</h2>
          <div className="flex gap-2 flex-col">
            <Property property={data.language} name="Languages" color="blue" />
            <Property property={data.task} name="Tasks" color="red" />
            <Property
              property={data.format}
              name="Image formats"
              color="green"
            />
            <Property property={data.mode} name="Color modes" color="yellow" />
          </div>
        </div>
      </div>
    </div>
  );
}
