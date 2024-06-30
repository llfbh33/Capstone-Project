
import { FaBold, FaItalic, FaStrikethrough, FaHeading, FaQuoteLeft, FaRedo, FaUndo, FaUnderline, FaListUl, FaListOl } from 'react-icons/fa'
import { TfiSmallcap } from "react-icons/tfi";
import { useState } from 'react';
import './TipTap.css'
import Tooltip from './ToolTip';



const MenuBar = ({editor}) => {
  const [size, setSize] = useState(2)

  const handleFontChange = () => {
    setSize(prevState => prevState + 1)
    if (size >= 6) {
      setSize(2)
    }
    editor.chain().focus().toggleHeading({ level: size }).run()
  }

  if (!editor) {
    return null
  }

  return (
    <div id='menuBar-container'>
      <Tooltip text='Bold'>
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={
              !editor.can()
                .chain()
                .focus()
                .toggleBold()
                .run()
            }
            className={editor.isActive('bold') ? 'is-active' : 'icon-button'}
          >
            <FaBold />
          </button>
      </Tooltip>
      <Tooltip text='Italic'>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={
              !editor.can()
                .chain()
                .focus()
                .toggleItalic()
                .run()
            }
            className={editor.isActive('italic') ? 'is-active' : 'icon-button'}
          >
            <FaItalic />
          </button>
      </Tooltip>
      <Tooltip text='Strike'>
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            disabled={
              !editor.can()
                .chain()
                .focus()
                .toggleStrike()
                .run()
            }
            className={editor.isActive('strike') ? 'is-active' : 'icon-button'}
          >
            <FaStrikethrough />
          </button>
      </Tooltip>
      <Tooltip text='Heading'>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={editor.isActive('heading', { level: 1 }) ? 'is-active' : 'icon-button'}
          >
            <FaHeading />
          </button>
      </Tooltip>
      <Tooltip text='Bullet List'>
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive('bulletList') ? 'is-active' : 'icon-button'}
          >
            <FaListUl />
          </button>
      </Tooltip>
      <Tooltip text='Ordered List'>
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={editor.isActive('orderedList') ? 'is-active' : 'icon-button'}
          >
            <FaListOl />
          </button>
      </Tooltip>
      <Tooltip text='Font Color'>
        <input
          id='color-input'
          type="color"
          onInput={event => editor.chain().focus().setColor(event.target.value).run()}
          value={editor.getAttributes('textStyle').color}
          data-testid="setColor"
        />
      </Tooltip>
      <Tooltip text='Font Size'>
          <div className='font-changing-container'>
            <button
              id='font-size-x-sml'
              onClick={handleFontChange}
              className={editor.isActive('heading', { level: 6 }) ? 'is-active' : 'icon-button'}
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
      </Tooltip>
      <Tooltip text='Undo'>
          <button
            onClick={() => editor.chain().focus().undo().run()}
            disabled={
              !editor.can()
                .chain()
                .focus()
                .undo()
                .run()
            }
            className='icon-button'
          >
            <FaUndo />
          </button>
      </Tooltip>
      <Tooltip text='Redo'>
          <button
            onClick={() => editor.chain().focus().redo().run()}
            disabled={
              !editor.can()
                .chain()
                .focus()
                .redo()
                .run()
            }
            className='icon-button'
          >
            <FaRedo />
          </button>
      </Tooltip>
    </div>
  )
}


export default MenuBar
