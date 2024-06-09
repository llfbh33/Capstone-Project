
import { FaBold, FaItalic, FaStrikethrough, FaHeading, FaQuoteLeft, FaRedo, FaUndo, FaUnderline, FaListUl, FaListOl } from 'react-icons/fa'
import { TfiSmallcap } from "react-icons/tfi";
import { useState } from 'react';
import './TipTap.css'



const MenuBar = ({editor}) => {
  const [size, setSize] = useState(2)

  const handleFontChange = () => {
    setSize(prevState => prevState + 1)
    if (size >= 6) {
      setSize(2)
    }
    console.log('size', size)
    editor.chain().focus().toggleHeading({ level: size }).run()
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
        <div className='font-size-change'>{
          size === 6 ? 'small'
          : size === 2 ? 'x-small'
          : size === 3 ? 'x-large'
          : size === 4 ? 'large'
          : size === 5 ? 'medium' : ''
        }</div>
      </div>

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
    </div>
  )
}


export default MenuBar
