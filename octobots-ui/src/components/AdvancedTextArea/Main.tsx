//import './styles.css'
//import './MentionList.css'
import CharacterCount from '@tiptap/extension-character-count'
import Document from '@tiptap/extension-document'
import Mention from '@tiptap/extension-mention'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import { EditorContent, NodeViewWrapper, ReactNodeViewRenderer, useEditor } from '@tiptap/react'
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { ReactRenderer } from '@tiptap/react'
import tippy from 'tippy.js'
import { Alert } from "@octobots/ui/src/utils";
import { DOMOutputSpec } from '@tiptap/pm/model'
import Icon from '../Icon'
import { IField } from '@octobots/ui-segments/src/types'
import FormControl from '@octobots/ui/src/components/form/Control';
import { __ } from "@octobots/ui/src/utils/core";

type Props = {
  items: IField[],
  limit: number
  hasOnlyOneSelection?: boolean
  selectedItems?: (data: string) => string,
  showSelectButton?: boolean
};

const AdvancedTextArea = ({ limit = 50, items, hasOnlyOneSelection = false, selectedItems, showSelectButton = true }: Props) => {
  let mentionTextList: any = [];
  let allItems: any[] = [];
  let onlyOneSelection = true;

  const MentionList = forwardRef((props, ref) => {
    const [selectedIndex, setSelectedIndex] = useState(0)
    const selectItem = index => {
      const item = props.items[index]
      if (item) {
        props.command({ id: item.value })
      }
    }
    const upHandler = () => {
      setSelectedIndex(((selectedIndex + props.items.length) - 1) % props.items.length)
    }
    const downHandler = () => {
      setSelectedIndex((selectedIndex + 1) % props.items.length)
    }

    const enterHandler = () => {
      selectItem(selectedIndex)
    }

    useEffect(() => setSelectedIndex(0), [props.items])

    useImperativeHandle(ref, () => ({
      onKeyDown: ({ event }) => {
        if (event.key === 'ArrowUp') {
          upHandler()
          return true
        }
        if (event.key === 'ArrowDown') {
          downHandler()
          return true
        }
        if (event.key === 'Enter') {
          enterHandler()
          return true
        }
        return false
      },
    }))
    //class name depend to type
    return (
      <div className="dropdown-menu">
        <div style={{ margin: '4px 3px 5px', direction: 'ltr' }}>
          <FormControl
            type="text"
            placeholder={__('Type to search')}
            onChange={(e) => console.log(e.target.value)}
            autoFocus={true}
          />
        </div>
        {props.items.length
          ? props.items.map((item, index) => (
            <button
              key={index}
              onClick={() => selectItem(index)}
            >
              <Icon size={16} icon={item.icon} color={item.color} />
              {item.label}
            </button>
          ))
          : <div className="item">No result</div>
        }
      </div>
    )
  })

  const Suggestion = ({ items }) => {
    // const editor = useEditor();
    return {
      char: '{{',
      items: ({ query }) => {
        allItems = items;
        let users = items.map(item => item)
        //filter selected items
        if (onlyOneSelection) {
          users = users.filter(item => !mentionTextList.includes(item.value))
        }
        return users.filter(item => item.value.toLowerCase().startsWith(query.toLowerCase()))//.slice(0, 5)
      },
      render: () => {
        let reactRenderer
        let popup
        return {
          onStart: props => {
            if (!props.clientRect) {
              return
            }
            reactRenderer = new ReactRenderer(MentionList, {
              props,
              editor: props.editor,
            })
            popup = tippy('body', {
              getReferenceClientRect: props.clientRect,
              appendTo: () => document.body,
              content: reactRenderer.element,
              showOnCreate: true,
              interactive: true,
              trigger: 'manual',
              placement: 'bottom-end',
            })
          },
          onUpdate(props) {
            reactRenderer.updateProps(props)
            if (!props.clientRect) {
              return
            }
            popup[0].setProps({
              getReferenceClientRect: props.clientRect,
            })
          },
          onKeyDown(props) {
            // console.log('props', props)
            if (props.event.key === 'Escape') {
              popup[0].hide()
              return true
            }
            return reactRenderer.ref?.onKeyDown(props)
          },
          onExit() {
            popup[0].destroy()
            reactRenderer.destroy()
          },
        }
      },
    }
  }

  const getAllMentions = (editor, selectedItems) => {
    let mentions: string = ``;
    editor.state.doc.descendants((node, pos) => {
      if (node.type.name === 'mention') {
        mentions += node.attrs.id + ' ';
      }
    });
    console.log('mentions', mentions)
    mentionTextList = mentions;
    selectedItems(mentions)
    return mentions;
  }

  const CustomMentionComponent = ({ node }) => {
    let id = node.attrs.id;
    let sItem: any = allItems.filter(item => item.value === id);
    return (
      <NodeViewWrapper className={"mention"}>
        <div className={`mention-content`}>
          <Icon size={14} icon={sItem[0].icon} color={sItem[0].color} />
          {sItem[0].label}
        </div>
      </NodeViewWrapper>
    );
  };

  const MentionExtension = Mention.extend({
    addNodeView() {
      return ({ node, HTMLAttributes, editor, extension, getPos, decorations }) => {
        return ReactNodeViewRenderer(CustomMentionComponent)({ node, HTMLAttributes, editor, extension, getPos, decorations });
      };
    },
  });

  onlyOneSelection = hasOnlyOneSelection;

  const editor = useEditor({
    onUpdate: (props) => {
      console.log('editor updated', props)
      extractTemplateVars();
    },
    extensions: [
      Document,
      Paragraph,
      Text,
      CharacterCount.configure({
        limit,
      }),
      MentionExtension.configure({
        renderHTML: ({ options, node }): DOMOutputSpec => {
          let props = { node: node, options: options }
          let selectedItem: IField | undefined = items.find(item => item.value === props.node.attrs.id);

          setTimeout(() => {
            getAllMentions(editor, selectedItems)
          }, 1000)

          return [
            'span',
            {
              'data-type': 'mention',
              'data-id': props.node.attrs.id,
              class: 'mention',
            },
            selectedItem?.label,
          ];
        },
        deleteTriggerWithBackspace: true,
        HTMLAttributes: {
          class: 'mention',
        },
        suggestion: Suggestion({ items }),
      }),
    ],
    content: ``,
    editorProps: {
      handleKeyDown: (view, event) => {
        if (event.key === 'Enter') {
          // Prevent 'Enter' key from creating new lines
          event.preventDefault();
          return true;
        }
        //if user type ctrl c logo editor content
        if (event.key === 'c' && event.ctrlKey) {
          let vars = extractTemplateVars()
          // //.join(' ') || '';
          // navigator.clipboard.writeText(vars)

          console.log('vars', vars)
          Alert.success(`Variables copied to your clipboard !`);
          return true;
        }
        return false;
      }
    }
  })

  const extractTemplateVars = () => {
    if (!editor) return;
    let content = editor.getHTML();
    const parser = new DOMParser();
    // Parse the HTML string into a document
    const doc = parser.parseFromString(content, 'text/html');
    // Query for all elements that have a `data-id` attribute
    const elements = doc.querySelectorAll('[data-id]');
    // Initialize an array to hold the extracted variables
    const dataIds = [];
    // Regular expression to match template variables like {{varName}}
    const templateVarRegex = /{{\s*([\w\d_]+)\s*}}/g;
    // Iterate over the elements and extract the data-id values
    elements.forEach(element => {
      const dataId: any = element.getAttribute('data-id');
      let match: any;
      // Use regex to find all matches of template variables
      while ((match = templateVarRegex.exec(dataId)) !== null) {
        dataIds.push(`{{${match[1]}}}`);  // Add the variable name to the array
      }
    });
    mentionTextList = dataIds;
    return dataIds;
  }

  const triggerMention = () => {
    if (editor) {
      // Retrieve the current position of the cursor
      const { from } = editor.state.selection;
      // Optionally, you can check if there's already a "{{" before inserting another
      const triggerText = ' {{'; // Modify this as per your actual trigger setup
      editor.commands.insertContentAt(from, triggerText);
    }
  };

  return (
    <>
      {editor &&
        <div className={`character-count ${editor.storage.characterCount.characters() === limit ? 'character-count--warning' : ''}`}>
          {editor.storage.characterCount.characters()} / {limit}
        </div>}
      <div className="input-group">
        <EditorContent className='editor-content'
          editor={editor} />
        {showSelectButton &&
          <div className="input-group-button" style={{ direction: "ltr" }}>
            <a onClick={triggerMention}>
              <Icon size={18} icon={"code"} />
            </a>
          </div>
        }
      </div>
    </>
  )
}

export default AdvancedTextArea
