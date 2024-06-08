
import { FaBold, FaItalic, FaStrikethrough, FaHeading, FaQuoteLeft, FaRedo, FaUndo, FaUnderline, FaListUl, FaListOl } from 'react-icons/fa'
import { RxRulerHorizontal } from "react-icons/rx";
import { TbLetterSSmall, TbLetterXSmall, TbLetterMSmall, TbLetterLSmall } from "react-icons/tb";
import { TfiSmallcap } from "react-icons/tfi";

import { useState } from 'react';
import './TipTap.css'



const MenuBar = ({editor}) => {
  let count = 1

  const handleFontChange = () => {
    count += 1;
    if (count >= 6) {
      count = 1
    }
    editor.chain().focus().toggleHeading({ level: count }).run()
  }

  if (!editor) {
    return null
  }

  return (
    <div id='menuBar-container'>
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleBold()
            .run()
        }
        className={editor.isActive('bold') ? 'is-active' : ''}
      >
        <FaBold />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleItalic()
            .run()
        }
        className={editor.isActive('italic') ? 'is-active' : ''}
      >
        <FaItalic />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleStrike()
            .run()
        }
        className={editor.isActive('strike') ? 'is-active' : ''}
      >
        <FaStrikethrough />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
      >
        <FaHeading />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive('bulletList') ? 'is-active' : ''}
      >
        <FaListUl />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive('orderedList') ? 'is-active' : ''}
      >
        <FaListOl />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive('blockquote') ? 'is-active' : ''}
      >
        <FaQuoteLeft />
      </button>
      <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
        <RxRulerHorizontal />
      </button>
      <button onClick={() => editor.chain().focus().setHardBreak().run()}>
        hard break
      </button>
      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .undo()
            .run()
        }
      >
        <FaUndo />
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .redo()
            .run()
        }
      >
        <FaRedo />
      </button>
      <input
        id='color-input'
        type="color"
        onInput={event => editor.chain().focus().setColor(event.target.value).run()}
        value={editor.getAttributes('textStyle').color}
        data-testid="setColor"
      />
      <div className='font-changing-container'>
        <button
          id='font-size-x-sml'
          onClick={handleFontChange}
          className={editor.isActive('heading', { level: 6 }) ? 'is-active' : ''}
        >
          <TfiSmallcap />
        </button>
        <div className='font-size-change'>{size}</div>
      </div>

      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
        hidden={size !== 'x-lg'}
      >
        <TbLetterXSmall /><TbLetterLSmall />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
        hidden={size !== 'lg'}
      >
        <TbLetterLSmall />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={editor.isActive('heading', { level: 4 }) ? 'is-active' : ''}
        hidden={size !== 'med'}
      >
        <TbLetterMSmall />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={editor.isActive('heading', { level: 5 }) ? 'is-active' : ''}
        hidden={size !== 'sml'}
      >
        <TbLetterSSmall />
      </button>
      <button
        id='font-size-x-sml'
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        className={editor.isActive('heading', { level: 6 }) ? 'is-active' : ''}
        hidden={size !== 'x-sml'}
      >
        <TbLetterXSmall /><TbLetterSSmall />
      </button>
    </div>
  )
}


export default MenuBar
