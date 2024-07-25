import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { KeyCombo } from "@/components/ui/keyboard";
import { cn } from "@/lib/utils";
import { CaretDownIcon, ListBulletIcon } from "@radix-ui/react-icons";
import type { Editor } from "@tiptap/core";
import { Keybinds } from "../keybinds";
import { DropdownMenuItemClass, activeItemClass } from "../utils";
import { ToolbarButton } from "./toolbar-button";

export default function SectionThree({ editor }: { editor: Editor }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <ToolbarButton
          isActive={
            editor.isActive("bulletList") || editor.isActive("orderedList")
          }
          tooltip="Lists"
          aria-label="Lists"
          className="w-12"
        >
          <ListBulletIcon className="size-5" />
          <CaretDownIcon className="size-5" />
        </ToolbarButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-full">
        <DropdownMenuItem
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={cn(DropdownMenuItemClass, {
            [activeItemClass]: editor.isActive("orderedList"),
          })}
          aria-label="Numbered list"
        >
          <span className="grow">Numbered list</span>
          <KeyCombo keyNames={Keybinds["orderedList"].keys} />
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={cn(DropdownMenuItemClass, {
            [activeItemClass]: editor.isActive("bulletList"),
          })}
          aria-label="Bullet list"
        >
          <span className="grow">Bullet list</span>
          <KeyCombo keyNames={Keybinds["bulletList"].keys} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
