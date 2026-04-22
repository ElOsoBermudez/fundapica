"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Placeholder from "@tiptap/extension-placeholder"
import { Bold, Italic, List, ListOrdered, Heading2, Undo, Redo } from "lucide-react"

export function RichTextEditor({ onChange, defaultContent }: { onChange?: (html: string) => void, defaultContent?: string }) {
  const editor = useEditor({
    immediatelyRender: false,
    content: defaultContent ?? "",
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder: "Escribe el contenido de la noticia..." }),
    ],
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class:
          "min-h-[200px] w-full rounded-b-md border-x border-b border-input bg-background px-3 py-2 text-sm focus-visible:outline-none",
      },
    },
  })

  if (!editor) return null

  const ToolbarButton = ({
    onClick,
    active,
    children,
  }: {
    onClick: () => void
    active?: boolean
    children: React.ReactNode
  }) => (
    <button
      type="button"
      onClick={onClick}
      className={`rounded p-1.5 hover:bg-accent hover:text-accent-foreground ${active ? "bg-accent text-accent-foreground" : ""}`}
    >
      {children}
    </button>
  )

  return (
    <div>
      <p className="mb-1 text-sm font-medium">Texto</p>
      <div className="flex flex-wrap gap-1 rounded-t-md border border-input bg-background px-2 py-1.5">
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive("bold")}
        >
          <Bold size={15} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive("italic")}
        >
          <Italic size={15} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          active={editor.isActive("heading", { level: 2 })}
        >
          <Heading2 size={15} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive("bulletList")}
        >
          <List size={15} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive("orderedList")}
        >
          <ListOrdered size={15} />
        </ToolbarButton>
        <div className="mx-1 w-px self-stretch bg-border" />
        <ToolbarButton onClick={() => editor.chain().focus().undo().run()}>
          <Undo size={15} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().redo().run()}>
          <Redo size={15} />
        </ToolbarButton>
      </div>
      <EditorContent editor={editor} />
    </div>
  )
}
