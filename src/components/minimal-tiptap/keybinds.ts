import { Keys } from "../ui/keyboard";

export const Keybinds = {
  paragraph: { name: "Paragraph", keys: [Keys.Command, "alt", "0"] },
  heading1: { name: "Heading 1", keys: [Keys.Command, "alt", "1"] },
  heading2: { name: "Heading 2", keys: [Keys.Command, "alt", "2"] },
  heading3: { name: "Heading 3", keys: [Keys.Command, "alt", "3"] },
  heading4: { name: "Heading 4", keys: [Keys.Command, "alt", "4"] },
  heading5: { name: "Heading 5", keys: [Keys.Command, "alt", "5"] },
  heading6: { name: "Heading 6", keys: [Keys.Command, "alt", "6"] },
  bold: { name: "Bold", keys: [Keys.Command, "B"] },
  italic: { name: "Italic", keys: [Keys.Command, "I"] },
  underline: { name: "Underline", keys: [Keys.Command, "U"] },
  strikethrough: { name: "Strikethrough", keys: [Keys.Command, "shift", "S"] },
  orderedList: { name: "Ordered List", keys: [Keys.Command, "shift", "7"] },
  bulletList: { name: "Bullet List", keys: [Keys.Command, "shift", "8"] },
  blockquote: { name: "Blockquote", keys: [">"] },
  undo: { name: "Undo", keys: [Keys.Command, "Z"] },
  redo: { name: "Redo", keys: [Keys.Command, Keys.Shift, "Z"] },
};
