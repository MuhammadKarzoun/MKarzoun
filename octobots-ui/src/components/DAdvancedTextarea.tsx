import React, { useRef, useState, useEffect } from 'react';

const StyledST = ({ children }) => (
  <span style={{ backgroundColor: 'yellow', color: 'black', padding: '6px', borderRadius: '6px', margin: '2px', fontWeight: 'bold' }}>{children}</span>
);

const StyledSD = ({ children }) => (
  <span style={{ backgroundColor: 'green', color: 'red', padding: '6px', borderRadius: '6px', margin: '2px', fontWeight: 'bold' }}>{children}</span>
);

function RichTextArea() {
  const [text, setText] = useState('SD_This ST_is an example text where some words are styled differently.');
  const editableRef = useRef(null);

  const processText = (inputText) => {
    const words = inputText.split(/(\s+)/).map((word, index) => {
      if (word.startsWith("ST_")) {
        return <StyledST key={index}>{word}</StyledST>;
      } else if (word.startsWith("SD_")) {
        return <StyledSD key={index}>{word}</StyledSD>;
      }
      return word;
    });
    return words;
  };

  const handleChange = (event) => {
    setText(event.target.innerText);
  };

  useEffect(() => {
    // This useEffect will run every time the text state updates
    if (editableRef.current) {
      // Clear current content
      editableRef.current.innerHTML = '';
      // Re-render the processed text
      processText(text).forEach((node) => {
        if (React.isValidElement(node)) {
          const span = document.createElement('span');
          span.innerHTML = node.props.children;
          Object.assign(span.style, node.props.style);
          editableRef.current.appendChild(span);
          editableRef.current.appendChild(document.createTextNode(' '));  // Add space after styled span
        } else {
          editableRef.current.appendChild(document.createTextNode(node));
        }
      });
      // Move cursor to the end after update
      const range = document.createRange();
      const sel = window.getSelection();
      range.selectNodeContents(editableRef.current);
      range.collapse(false);  // false to collapse the Range to its end
      sel.removeAllRanges();
      sel.addRange(range);
    }
  }, [text]);

  return (
    <div
      ref={editableRef}
      contentEditable
      onInput={handleChange}
      style={{ border: '1px solid gray', minHeight: '100px', padding: '8px', fontFamily: 'monospace', whiteSpace: 'pre-wrap', overflowY: 'auto', direction: 'ltr' }}
      aria-label="Rich Text Area"
      dir="ltr"
    ></div>
  );
}

export default RichTextArea;
