import { Check, Clipboard } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

export default function CopyToClipboard({ text }: { text: string }) {
  const [isCopied, setIsCopied] = useState(false);

  return (
    <Button
      className="absolute right-2 top-2 z-0"
      variant={"outline"}
      size={"icon_sm"}
      title="Copy to clipboard"
      onClick={() => {
        navigator.clipboard.writeText(text);
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
  );
}
