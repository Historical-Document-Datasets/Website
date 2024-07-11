import { Dataset } from "@/utils/types";
import { Link } from "react-router-dom";
import { Badge } from "./ui/badge";

export function Property({
  property,
  name,
  color,
}: {
  property: string[];
  name: string;
  color: "blue" | "green" | "red" | "yellow";
}) {
  return (
    <div>
      <h4 className="pb-1 font-medium">{name}</h4>
      <div className="flex flex-wrap gap-1">
        {property.map((property) => (
          <Badge key={property} variant={color}>
            {property}
          </Badge>
        ))}
      </div>
    </div>
  );
}

export default function ResultCard({ dataset }: { dataset: Dataset }) {
  return (
    <Link
      to={`/browse/${dataset.name.replace(" ", "_")}`}
      className="p-4 border rounded-xl hover:bg-secondary/50"
      title={`Open detail for ${dataset.name}`}
    >
      <div className="flex justify-between items-start">
        <h3 className="font-semibold text-xl">{dataset.name}</h3>
      </div>
      <div className="flex gap-x-4 gap-y-2 flex-wrap">
        <Property property={dataset.language} name="Languages" color="blue" />
        <Property property={dataset.task} name="Tasks" color="red" />
        <Property
          property={dataset.format}
          name="Image formats"
          color="green"
        />
        <Property property={dataset.mode} name="Color modes" color="yellow" />
        <div>
          <h4 className="font-medium">Document Type</h4>
          <p className="text-sm">{dataset.document_type}</p>
        </div>
      </div>
      {/* <Separator className="my-4" />
      <div className="flex gap-2 flex-wrap">
        <Button size={"sm"} variant={"outline"}>
          <PencilLine className="mr-2 h-4 w-4" /> Suggest an edit
        </Button>
      </div> */}
    </Link>
  );
}
