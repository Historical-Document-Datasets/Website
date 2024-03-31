import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="pt-6">
      <h1 className="text-3xl text-center">
        Historical Document Datasets — Preview
      </h1>
      <p className="my-4">
        This will be the home page. This is still under construction.
      </p>
      <p className="mb-2">In the meanwile, you can still</p>
      <Link to={"browse/"}>
        <Button variant={"outline"}>
          <ExternalLink className="mr-2 h-4 w-4" />
          Browse preview
        </Button>
      </Link>
    </div>
  );
}
