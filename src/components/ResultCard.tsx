import { Dataset } from "@/utils/types";
import { PencilLine, Send, SquareArrowOutUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

export function Property({
  property,
  name,
}: {
  property: string[];
  name: string;
}) {
  return (
    <div>
      <h4 className="pb-1 font-medium">{name}</h4>
      <div className="flex flex-wrap gap-1">
        {property.map((property) => (
          <Badge key={property} variant={"outline"}>
            {property}
          </Badge>
        ))}
      </div>
    </div>
  );
}

export default function ResultCard({ dataset }: { dataset: Dataset }) {
  return (
    <div className="p-4 border rounded-xl">
      <div className="flex justify-between items-start">
        <h3 className="font-semibold text-xl">{dataset.name}</h3>
        <Link to={`/browse/${dataset.id}`} title="Open detail">
          <Button size={"icon_sm"} variant={"outline"}>
            <SquareArrowOutUpRight size={13} />
          </Button>
        </Link>
      </div>
      <div className="flex gap-x-4 gap-y-2 flex-wrap">
        <Property property={dataset.language} name="Languages" />
        <Property property={dataset.task} name="Tasks" />
        <Property property={dataset.format} name="Image formats" />
        <Property property={dataset.mode} name="Color modes" />
        <div>
          <h4 className="font-medium">Document Type</h4>
          <p className="text-sm">{dataset.document_type}</p>
        </div>
      </div>
      <Separator className="my-4" />
      <div className="flex gap-2 flex-wrap">
        <Button size={"sm"} variant={"outline"}>
          <PencilLine className="mr-2 h-4 w-4" /> Suggest an edit
        </Button>
        <Button size={"sm"} variant={"outline"}>
          <Send className="mr-2 h-4 w-4" /> Share
        </Button>
      </div>
    </div>
  );
}
