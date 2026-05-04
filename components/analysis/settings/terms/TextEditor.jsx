'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import { Extension } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Highlight from '@tiptap/extension-highlight';
import Color from '@tiptap/extension-color';
import TextStyle from '@tiptap/extension-text-style';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import CharacterCount from '@tiptap/extension-character-count';
import { useCallback, useState } from 'react';

// ================= Font Size Extension =================
const FontSize = Extension.create({
  name: 'fontSize',

  addOptions() {
    return {
      types: ['textStyle'],
    };
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontSize: {
            default: null,
            parseHTML: element => element.style.fontSize,
            renderHTML: attributes => {
              if (!attributes.fontSize) return {};
              return {
                style: `font-size: ${attributes.fontSize}`,
              };
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      setFontSize:
        size =>
          ({ chain }) =>
            chain().setMark('textStyle', { fontSize: size }).run(),

      unsetFontSize:
        () =>
          ({ chain }) =>
            chain().setMark('textStyle', { fontSize: null }).run(),
    };
  },
});

// ================= Icons =================
const Icon = ({ d, size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

const icons = {
  bold: 'M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z',
  italic: 'M19 4h-9M14 20H5M14.7 4.7L9.2 19.4',
  underline: 'M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3M4 21h16',
  ul: 'M9 6h11M9 12h11M9 18h11M4 6h.01M4 12h.01M4 18h.01',
  image: 'M21 19V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2zM8.5 10a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z',
};

// ================= Button =================
const ToolbarButton = ({ onClick, isActive, children }) => (
  <button
    type="button"
    onClick={onClick}
    className={`p-2 rounded ${isActive ? 'bg-indigo-600 text-white' : 'hover:bg-gray-200'}`}
  >
    {children}
  </button>
);

// ================= Toolbar =================
function Toolbar({ editor }) {
  const [color, setColor] = useState('#000000');

  const addImage = useCallback(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';

    input.onchange = () => {
      const file = input.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = () => {
        editor.chain().focus().setImage({
          src: reader.result,
        }).run();
      };
      reader.readAsDataURL(file);
    };

    input.click();
  }, [editor]);

  if (!editor) return null;

  return (
    <div className="flex flex-wrap gap-2 p-2 border-b bg-gray-50">

      {/* Font Size */}
      <select
        onChange={(e) => {
          const size = e.target.value;
          if (size === 'default') {
            editor.chain().focus().unsetFontSize().run();
          } else {
            editor.chain().focus().setFontSize(size).run();
          }
        }}
        className="border rounded px-2 py-1 text-sm"
      >
        <option value="default">حجم الخط</option>
        <option value="12px">صغير</option>
        <option value="16px">عادي</option>
        <option value="20px">كبير</option>
        <option value="24px">أكبر</option>
        <option value="32px">ضخم</option>
      </select>

      <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()}>
        <Icon d={icons.bold} />
      </ToolbarButton>

      <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()}>
        <Icon d={icons.italic} />
      </ToolbarButton>

      <ToolbarButton onClick={() => editor.chain().focus().toggleUnderline().run()}>
        <Icon d={icons.underline} />
      </ToolbarButton>

      <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()}>
        <Icon d={icons.ul} />
      </ToolbarButton>

      <ToolbarButton onClick={addImage}>
        <Icon d={icons.image} />
      </ToolbarButton>

      {/* Color */}
      <input
        type="color"
        value={color}
        onChange={(e) => {
          setColor(e.target.value);
          editor.chain().focus().setColor(e.target.value).run();
        }}
      />

    </div>
  );
}

// ================= Main Component =================
export default function TextEditor({
  initialContent = '',
  onChange,
}) {

  const editor = useEditor({
    immediatelyRender: false,

    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Highlight,
      TextStyle,
      Color,
      FontSize, // 👈 مهم
      Image,
      Link,
      Placeholder.configure({ placeholder: 'اكتب هنا...' }),
      CharacterCount,
    ],

    content: initialContent,

    editorProps: {
      attributes: {
        dir: 'rtl',
        class: 'min-h-[300px] p-4 outline-none',
      },
    },

    onUpdate: ({ editor }) => {
      onChange?.({
        html: editor.getHTML(),
        text: editor.getText(),
      });
    },
  });

  if (!editor) return null;

  return (
    <div className="border rounded-lg overflow-hidden bg-white">

      <Toolbar editor={editor} />

      <EditorContent editor={editor} />

    </div>
  );
}