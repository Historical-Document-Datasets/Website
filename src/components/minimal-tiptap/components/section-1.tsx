import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { KeyCombo } from "@/components/ui/keyboard";
import { cn } from "@/lib/utils";
import { CaretDownIcon, LetterCaseCapitalizeIcon } from "@radix-ui/react-icons";
import type { Editor } from "@tiptap/core";
import type { Level } from "@tiptap/extension-heading";
import { Keybinds } from "../keybinds";
import { DropdownMenuItemClass, activeItemClass } from "../utils";
import { ToolbarButton } from "./toolbar-button";

export default function SectionOne({ editor }: { editor: Editor }) {
  const toggleHeading = (level: Level) => {
    editor.chain().focus().toggleHeading({ level }).run();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <ToolbarButton
          isActive={editor.isActive("heading")}
          tooltip="Text styles"
          aria-label="Text styles"
          className="w-12"
        >
          <LetterCaseCapitalizeIcon className="size-5" />
          <CaretDownIcon className="size-5" />
        </ToolbarButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-full">
        <DropdownMenuItem
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={cn(DropdownMenuItemClass, {
            [activeItemClass]: editor.isActive("paragraph"),
          })}
          aria-label="Normal text"
        >
          <span className="grow">Normal Text</span>
          <KeyCombo keyNames={Keybinds["paragraph"]} />
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => toggleHeading(1)}
          className={cn(DropdownMenuItemClass, {
            [activeItemClass]: editor.isActive("heading", { level: 1 }),
          })}
          aria-label="Heading 1"
        >
          <h1 className="m-0 grow text-3xl font-extrabold">Heading 1</h1>
          <KeyCombo keyNames={Keybinds["heading1"]} />
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => toggleHeading(2)}
          className={cn(DropdownMenuItemClass, {
            [activeItemClass]: editor.isActive("heading", { level: 2 }),
          })}
          aria-label="Heading 2"
        >
          <h2 className="m-0 grow text-xl font-bold">Heading 2</h2>
          <KeyCombo keyNames={Keybinds["heading2"]} />
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => toggleHeading(3)}
          className={cn(DropdownMenuItemClass, {
            [activeItemClass]: editor.isActive("heading", { level: 3 }),
          })}
          aria-label="Heading 3"
        >
          <h3 className="m-0 grow text-lg font-semibold">Heading 3</h3>
          <KeyCombo keyNames={Keybinds["heading3"]} />
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => toggleHeading(4)}
          className={cn(DropdownMenuItemClass, {
            [activeItemClass]: editor.isActive("heading", { level: 4 }),
          })}
          aria-label="Heading 4"
        >
          <h4 className="m-0 grow text-base font-semibold">Heading 4</h4>
          <KeyCombo keyNames={Keybinds["heading4"]} />
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => toggleHeading(5)}
          className={cn(DropdownMenuItemClass, {
            [activeItemClass]: editor.isActive("heading", { level: 5 }),
          })}
          aria-label="Heading 5"
        >
          <h5 className="m-0 grow text-sm font-normal">Heading 5</h5>
          <KeyCombo keyNames={Keybinds["heading5"]} />
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => toggleHeading(6)}
          className={cn(DropdownMenuItemClass, {
            [activeItemClass]: editor.isActive("heading", { level: 6 }),
          })}
          aria-label="Heading 6"
        >
          <h6 className="m-0 grow text-sm font-normal">Heading 6</h6>
          <KeyCombo keyNames={Keybinds["heading6"]} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
