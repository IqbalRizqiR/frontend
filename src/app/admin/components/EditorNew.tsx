"use client";

import './styles.css'

import { TextStyleKit } from '@tiptap/extension-text-style'
import Image from '@tiptap/extension-image'
import type { Editor } from '@tiptap/react'
import { EditorContent, useEditor, useEditorState } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React, { useCallback, useEffect } from 'react'

const extensions = [
  TextStyleKit, 
  StarterKit,
  Image.configure({
    inline: true,
    allowBase64: false,
  })
]

function MenuBar({ editor }: { editor: Editor }) {
  const editorState = useEditorState({
    editor,
    selector: ctx => {
      return {
        isBold: ctx.editor.isActive('bold') ?? false,
        canBold: ctx.editor.can().chain().toggleBold().run() ?? false,
        isItalic: ctx.editor.isActive('italic') ?? false,
        canItalic: ctx.editor.can().chain().toggleItalic().run() ?? false,
        isStrike: ctx.editor.isActive('strike') ?? false,
        canStrike: ctx.editor.can().chain().toggleStrike().run() ?? false,
        isCode: ctx.editor.isActive('code') ?? false,
        canCode: ctx.editor.can().chain().toggleCode().run() ?? false,
        canClearMarks: ctx.editor.can().chain().unsetAllMarks().run() ?? false,
        isParagraph: ctx.editor.isActive('paragraph') ?? false,
        isHeading1: ctx.editor.isActive('heading', { level: 1 }) ?? false,
        isHeading2: ctx.editor.isActive('heading', { level: 2 }) ?? false,
        isHeading3: ctx.editor.isActive('heading', { level: 3 }) ?? false,
        isHeading4: ctx.editor.isActive('heading', { level: 4 }) ?? false,
        isHeading5: ctx.editor.isActive('heading', { level: 5 }) ?? false,
        isHeading6: ctx.editor.isActive('heading', { level: 6 }) ?? false,
        isBulletList: ctx.editor.isActive('bulletList') ?? false,
        isOrderedList: ctx.editor.isActive('orderedList') ?? false,
        isCodeBlock: ctx.editor.isActive('codeBlock') ?? false,
        isBlockquote: ctx.editor.isActive('blockquote') ?? false,
        canUndo: ctx.editor.can().chain().undo().run() ?? false,
        canRedo: ctx.editor.can().chain().redo().run() ?? false,
      }
    },
  })

  const addImageFromUrl = useCallback(() => {
    const url = window.prompt('Enter image URL:')

    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }, [editor])

  const uploadImageToCloudinary = useCallback(async () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    
    input.onchange = async (e: Event) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      
      if (!file) return

      alert('Uploading image...')
      
      try {
        const formData = new FormData()
        formData.append('image', file)
        
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/upload-image`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
          },
          body: formData
        })
        
        const data = await response.json()
        
        if (response.ok && data.url) {
          editor.chain().focus().setImage({ src: data.url }).run()
        } else {
          alert(data.message || 'Failed to upload image')
        }
      } catch (error) {
        console.error('Upload failed:', error)
        alert('Failed to upload image')
      }
    }
    
    input.click()
  }, [editor])

  return (
    <div className="control-group">
      <div className="button-group">
        <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} disabled={!editorState.canBold} className={editorState.isBold ? 'is-active' : ''}>Bold</button>
        <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} disabled={!editorState.canItalic} className={editorState.isItalic ? 'is-active' : ''}>Italic</button>
        <button type="button" onClick={() => editor.chain().focus().toggleStrike().run()} disabled={!editorState.canStrike} className={editorState.isStrike ? 'is-active' : ''}>Strike</button>
        <button type="button" onClick={() => editor.chain().focus().toggleCode().run()} disabled={!editorState.canCode} className={editorState.isCode ? 'is-active' : ''}>Code</button>
        <button type="button" onClick={() => editor.chain().focus().unsetAllMarks().run()}>Clear marks</button>
        <button type="button" onClick={() => editor.chain().focus().clearNodes().run()}>Clear nodes</button>
        <button type="button" onClick={() => editor.chain().focus().setParagraph().run()} className={editorState.isParagraph ? 'is-active' : ''}>Paragraph</button>
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={editorState.isHeading1 ? 'is-active' : ''}>H1</button>
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={editorState.isHeading2 ? 'is-active' : ''}>H2</button>
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={editorState.isHeading3 ? 'is-active' : ''}>H3</button>
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()} className={editorState.isHeading4 ? 'is-active' : ''}>H4</button>
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()} className={editorState.isHeading5 ? 'is-active' : ''}>H5</button>
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()} className={editorState.isHeading6 ? 'is-active' : ''}>H6</button>
        <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={editorState.isBulletList ? 'is-active' : ''}>Bullet list</button>
        <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={editorState.isOrderedList ? 'is-active' : ''}>Ordered list</button>
        <button type="button" onClick={() => editor.chain().focus().toggleCodeBlock().run()} className={editorState.isCodeBlock ? 'is-active' : ''}>Code block</button>
        <button type="button" onClick={() => editor.chain().focus().toggleBlockquote().run()} className={editorState.isBlockquote ? 'is-active' : ''}>Blockquote</button>
        <button type="button" onClick={() => editor.chain().focus().setHorizontalRule().run()}>Horizontal rule</button>
        <button type="button" onClick={() => editor.chain().focus().setHardBreak().run()}>Hard break</button>
        <button type="button" onClick={addImageFromUrl}>Add image from URL</button>
        <button type="button" onClick={uploadImageToCloudinary}>Upload image</button>
        <button type="button" onClick={() => editor.chain().focus().undo().run()} disabled={!editorState.canUndo}>Undo</button>
        <button type="button" onClick={() => editor.chain().focus().redo().run()} disabled={!editorState.canRedo}>Redo</button>
      </div>
    </div>
  )
}

interface EditorNewProps {
  value: string;
  onChange: (value: string) => void;
}

export default function EditorNew({ value, onChange }: EditorNewProps) {
  const editor = useEditor({
    extensions,
    content: value,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html);
    },
  })

  // Update editor content when value prop changes from outside
  useEffect(() => {
    if (editor && value && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className="editor-wrapper">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  )
}