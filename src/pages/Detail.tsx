import { Error, Loader } from "@/components/Loaders";
import { Property } from "@/components/ResultCard";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { fetcher } from "@/utils/helpers";
import { Dataset } from "@/utils/types";
import { Undo2 } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import useSWRImmutable from "swr/immutable";

export default function Detail() {
  const {
    data = [],
    error,
    isLoading = true,
  } = useSWRImmutable(
    "https://raw.githubusercontent.com/Historical-Document-Datasets/Catalog/main/catalog.json",
    fetcher
  );

  const { id } = useParams();

  if (error) return <Error />;
  if (isLoading) return <Loader />;

  const dataset: Dataset = data.find((item: Dataset) => item.id === id);
  console.log(dataset);

  if (dataset === undefined) {
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

  return (
    <div className="flex flex-wrap gap-6 justify-between pt-5">
      <div className="flex-1">
        <div className="flex gap-4 items-start">
          <Link to="/browse">
            <Button variant="outline" size={"icon"} className="rounded-full">
              <Undo2 size={16} />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold mb-3">{dataset.name}</h1>
        </div>

        <div className="flex gap-4 flex-wrap">
          <div className="border rounded-xl p-4 w-full md:w-auto">
            <h4 className="font-medium">Stats:</h4>
            <span className="text-gray-600">{dataset.statistics}</span>
          </div>
          <div className="border rounded-xl p-4 w-full md:w-auto">
            <h4 className="font-medium">Reference:</h4>
            <span className="text-gray-600">{dataset.reference}</span>
          </div>
          <div className="border rounded-xl p-4 w-full md:w-auto">
            <h4 className="font-medium">Class:</h4>
            <span className="text-gray-600">{dataset.class}</span>
          </div>
        </div>
        <Separator className="my-4" />
        <div>
          <h3 className="text-lg font-medium">Description</h3>
          <p className="text-gray-600">{dataset.description}</p>
        </div>
      </div>
      <div className="w-full sm:w-1/3 xl:w-1/4">
        <div className="border rounded-lg p-4">
          <h2 className="text-xl font-bold mb-2">Tags</h2>
          <div className="flex gap-2 flex-col">
            <Property property={dataset.language} name="Languages" />
            <Property property={dataset.task} name="Tasks" />
            <Property property={dataset.format} name="Image formats" />
            <Property property={dataset.mode} name="Color modes" />
          </div>
        </div>
      </div>
    </div>
  );
}
