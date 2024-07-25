import KeyboardShortutsButton from "@/components/KeyboardShortcuts";
import { ShortcutsProvider } from "@/components/ui/keyboard";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import type { Editor as TiptapEditor } from "@tiptap/core";
import { getMarkRange } from "@tiptap/core";
import { Link } from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import { Plugin, TextSelection } from "@tiptap/pm/state";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { forwardRef } from "react";
import TurndownService from "turndown";
import { getOutput } from "../utils";
import { LinkBubbleMenu } from "./bubble-menu/link-bubble-menu";
import SectionOne from "./section-1";
import SectionTwo from "./section-2";
import SectionThree from "./section-3";
import SectionFour from "./section-4";

export interface MinimalTiptapProps
  extends React.HTMLAttributes<HTMLDivElement> {
  value?: string | null;
  outputValue?: "html" | "json" | "text";
  disabled?: boolean;
  contentClass?: string;
  onValueChange: (value: string) => void;
}

const MinimalTiptapEditor = forwardRef<HTMLDivElement, MinimalTiptapProps>(
  (
    {
      value,
      outputValue = "html",
      disabled,
      contentClass,
      onValueChange,
      className,
      ...props
    },
    ref
  ) => {
    const editor = useEditor({
      extensions: [
        StarterKit.configure({
          codeBlock: false,
          code: false,
        }),
        Underline,
        Link.configure({
          openOnClick: false,
        }).extend({
          // https://github.com/ueberdosis/tiptap/issues/2571
          inclusive: false,

          addProseMirrorPlugins() {
            return [
              new Plugin({
                // mark the link
                props: {
                  handleClick(view, pos) {
                    const { schema, doc, tr } = view.state;
                    const range = getMarkRange(
                      doc.resolve(pos),
                      schema.marks.link
                    );

                    if (!range) {
                      return;
                    }

                    const { from, to } = range;
                    const start = Math.min(from, to);
                    const end = Math.max(from, to);

                    if (pos < start || pos > end) {
                      return;
                    }

                    const $start = doc.resolve(start);
                    const $end = doc.resolve(end);
                    const transaction = tr.setSelection(
                      new TextSelection($start, $end)
                    );

                    view.dispatch(transaction);
                  },
                },
              }),
            ];
          },
        }),
      ],
      editorProps: {
        attributes: {
          class:
            "prose mx-auto focus:outline-none max-w-none prose-stone dark:prose-invert",
        },
      },
      onUpdate: (props) => {
        const turndownService = new TurndownService({ headingStyle: "atx" });
        turndownService.addRule("strikethrough", {
          filter: ["del", "s"],
          replacement: function (content) {
            return "~" + content + "~";
          },
        });
        onValueChange(
          turndownService.turndown(getOutput(props.editor, outputValue))
        );
      },
      content: value,
      editable: !disabled,
      onCreate: ({ editor }) => {
        if (value) {
          editor.chain().setContent(value).run();
        }
      },
    });

    return (
      <div
        className={cn(
          "flex h-auto min-h-72 w-full flex-col rounded-md border border-input shadow-sm focus-within:border-primary",
          className
        )}
        {...props}
        ref={ref}
      >
        {editor && (
          <>
            <LinkBubbleMenu editor={editor} />
            <Toolbar editor={editor} />
          </>
        )}
        <div
          className="h-full grow"
          onClick={() => editor?.chain().focus().run()}
        >
          <EditorContent editor={editor} className={cn("p-5", contentClass)} />
        </div>
      </div>
    );
  }
);

MinimalTiptapEditor.displayName = "MinimalTiptapEditor";

const Toolbar = ({ editor }: { editor: TiptapEditor }) => {
  return (
    <div className="border-b border-border p-2">
      <div className="flex w-full flex-wrap items-center justify-between">
        <div className="flex flex-wrap items-center">
          <ShortcutsProvider os="mac">
            <SectionOne editor={editor} />
            <Separator orientation="vertical" className="mx-2 h-7" />
            <SectionTwo editor={editor} />
            <Separator orientation="vertical" className="mx-2 h-7" />
            <SectionThree editor={editor} />
            <Separator orientation="vertical" className="mx-2 h-7" />
            <SectionFour editor={editor} />
          </ShortcutsProvider>
        </div>
        <KeyboardShortutsButton />
      </div>
    </div>
  );
};

export { MinimalTiptapEditor };
