import { Dataset } from "@/utils/types";
import { PencilLine, Send } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

function Property({ property, name }: { property: string[]; name: string }) {
  return (
    <div>
      <h4 className="pb-1 font-medium">{name}</h4>
      <div className="flex gap-1">
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
      <div className="pb-2">
        <h3 className="font-semibold text-xl">{dataset.name}</h3>
        <p className="text-muted-foreground text-sm">{dataset.task}</p>
      </div>
      <div className="flex gap-4 flex-wrap">
        <Property property={dataset.languages} name="Languages" />
        <Property property={dataset.image_format} name="Image formats" />
        <Property property={dataset.color_mode} name="Color modes" />
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
