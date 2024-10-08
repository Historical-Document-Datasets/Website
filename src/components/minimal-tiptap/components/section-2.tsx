import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { KeyCombo } from "@/components/ui/keyboard";
import { cn } from "@/lib/utils";
import {
  DotsHorizontalIcon,
  FontBoldIcon,
  FontItalicIcon,
  UnderlineIcon,
} from "@radix-ui/react-icons";
import type { Editor } from "@tiptap/core";
import { Keybinds } from "../keybinds";
import { DropdownMenuItemClass, activeItemClass } from "../utils";
import { ToolbarButton } from "./toolbar-button";

export default function SectionTwo({ editor }: { editor: Editor }) {
  return (
    <>
      {/* BOLD */}
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        isActive={editor.isActive("bold")}
        tooltip="Bold"
        aria-label="Bold"
      >
        <FontBoldIcon className="size-5" />
      </ToolbarButton>

      {/* ITALIC */}
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        isActive={editor.isActive("italic")}
        tooltip="Italic"
        aria-label="Italic"
      >
        <FontItalicIcon className="size-5" />
      </ToolbarButton>

      {/* UNDERLINE */}
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        disabled={!editor.can().chain().focus().toggleUnderline().run()}
        isActive={editor.isActive("underline")}
        tooltip="Underline"
        aria-label="Underline"
      >
        <UnderlineIcon className="size-5" />
      </ToolbarButton>

      {/* STRIKE, CODE, CLEAR FORMATTING */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <ToolbarButton
            isActive={editor.isActive("strike")}
            tooltip="More formatting"
            aria-label="More formatting"
          >
            <DotsHorizontalIcon className="size-5" />
          </ToolbarButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-full">
          <DropdownMenuItem
            onClick={() => editor.chain().focus().toggleStrike().run()}
            disabled={!editor.can().chain().focus().toggleStrike().run()}
            className={cn(DropdownMenuItemClass, {
              [activeItemClass]: editor.isActive("strike"),
            })}
            aria-label="Strikethrough"
          >
            <span className="grow">Strikethrough</span>
            <KeyCombo keyNames={Keybinds["strikethrough"].keys} />
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => editor.chain().focus().unsetAllMarks().run()}
            disabled={!editor.can().chain().focus().unsetAllMarks().run()}
            className={cn(DropdownMenuItemClass)}
            aria-label="Clear formatting"
          >
            <span className="grow">Clear formatting</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
