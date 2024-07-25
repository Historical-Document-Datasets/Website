import { Keyboard } from "lucide-react";
import { useState } from "react";
import { Keybinds } from "./minimal-tiptap/keybinds";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { KeyCombo, ShortcutsProvider } from "./ui/keyboard";
import { Label } from "./ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

export default function KeyboardShortutsButton() {
  const [isTooltipAllowed, setIsTooltipAllowed] = useState(true);
  return (
    <Dialog onOpenChange={() => setIsTooltipAllowed(false)}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger
            asChild
            onMouseEnter={() => setIsTooltipAllowed(true)}
          >
            <DialogTrigger asChild>
              <Button variant={"outline"} size={"icon_sm"} type="button">
                <Keyboard strokeWidth={1.75} className="size-4" />
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
          {isTooltipAllowed && (
            <TooltipContent>Keyboard Shortcuts</TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Keyboard Shortcuts</DialogTitle>
          <DialogDescription>
            Learn the keyboard shortcuts to navigate the editor.
          </DialogDescription>
        </DialogHeader>
        <ShortcutsProvider os="mac">
          <div className="grid grid-cols-2 gap-x-4 gap-y-3">
            {Object.entries(Keybinds).map(([key, value]) => (
              <div key={key} className="flex justify-between">
                <Label className="text-foreground/70">{value.name}</Label>
                <KeyCombo disableTooltips keyNames={value.keys} />
              </div>
            ))}
          </div>
        </ShortcutsProvider>
      </DialogContent>
    </Dialog>
  );
}
