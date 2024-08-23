import { DividerHorizontalIcon, QuoteIcon } from "@radix-ui/react-icons";
import type { Editor } from "@tiptap/core";
import { LinkEditPopover } from "./link/link-edit-popover";
import { ToolbarButton } from "./toolbar-button";

export default function SectionFour({ editor }: { editor: Editor }) {
  return (
    <>
      {/* LINK */}
      <LinkEditPopover editor={editor} />

      {/* BLOCKQUOTE */}
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        isActive={editor.isActive("blockquote")}
        tooltip="Blockquote"
        aria-label="Blockquote"
      >
        <QuoteIcon className="size-5" />
      </ToolbarButton>

      {/* SEPARATOR */}
      <ToolbarButton
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        tooltip="Divider"
        aria-label="Divider"
      >
        <DividerHorizontalIcon className="size-5" />
      </ToolbarButton>
    </>
  );
}
