import React from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, ContentState, convertFromHTML } from 'draft-js';


const contentBlocks = convertFromHTML('<p>Lorem ipsum ' +
  'dolor sit amet, consectetur adipiscing elit. Mauris tortor felis, volutpat sit amet ' +
  'maximus nec, tempus auctor diam. Nunc odio elit,  ' +
  'commodo quis dolor in, sagittis scelerisque nibh. ' +
  'Suspendisse consequat, sapien sit amet pulvinar  ' +
  'tristique, augue ante dapibus nulla, eget gravida ' +
  'turpis est sit amet nulla. Vestibulum lacinia mollis  ' +
  'accumsan. Vivamus porta cursus libero vitae mattis. ' +
  'In gravida bibendum orci, id faucibus felis molestie ac.  ' +
  'Etiam vel elit cursus, scelerisque dui quis, auctor risus.</p>');

const sampleEditorContent = ContentState.createFromBlockArray(contentBlocks);

const EditorToolbarWhenFocused = () => (
  <Editor
    toolbarClassName="demo-toolbar-absolute"
    wrapperClassName="demo-wrapper"
    editorClassName="demo-editor"
    defaultEditorState={sampleEditorContent}
    toolbarOnFocus
    toolbar={{
      options: ['inline', 'blockType', 'fontSize', 'fontFamily'],
      inline: {
        options: ['bold', 'italic', 'underline', 'strikethrough', 'monospace'],
        bold: { className: 'bordered-option-classname' },
        italic: { className: 'bordered-option-classname' },
        underline: { className: 'bordered-option-classname' },
        strikethrough: { className: 'bordered-option-classname' },
        code: { className: 'bordered-option-classname' },
      },
      blockType: {
        className: 'bordered-option-classname',
      },
      fontSize: {
        className: 'bordered-option-classname',
      },
      fontFamily: {
        className: 'bordered-option-classname',
      },
    }}
  />
);