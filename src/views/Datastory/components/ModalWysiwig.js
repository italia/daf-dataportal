import React, { Component } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Modal, ModalFooter, ModalHeader, ModalBody } from 'reactstrap';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

require('medium-editor/dist/css/medium-editor.css');
require('medium-editor/dist/css/themes/default.css');

export default class ModalWysiwig extends Component {
	constructor(props){
		super(props)
		this.state = {
			editorState: undefined,
		}

		const contentBlock = props.widget.text?htmlToDraft(props.widget.text):undefined;
		if (contentBlock) {
		  const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
		  const editorState = EditorState.createWithContent(contentState);
		  this.state.editorState = editorState
		}
			
	}

	save() {
		let html = "";

		if (this.state.editorState)
			html = draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()));
		
		this.props.onSave(this.props.widget.id, html);
	}

	onEditorStateChange = (editorState) => {
		this.setState({
		  editorState
		});
	};

	render() {
		const { editorState } = this.state;
		const { isEditorOpen, onClose } = this.props

		var toolbar= {
			options: ['inline', 'blockType', 'list', 'link', 'history'],
			inline: {
					options: ['bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript'],
			},
			blockType: {
					inDropdown: true,
					options: ['Normal', 'H3', 'Blockquote', 'Code'],
			}
		}

		return(
			<Modal isOpen={isEditorOpen} toggle={onClose} style={{'overflowY':'auto'}}>
				<ModalHeader toggle={onClose}>
					{/* <ModalTitle>Modifica il testo da inserire</ModalTitle> */}
				</ModalHeader>
				<ModalBody>
						<Editor
							stripPastedStyles={true}
							toolbar={toolbar}
							data-placeholder="Inserisci il testo"
							editorState={editorState}
							// toolbarClassName="rdw-storybook-toolbar"
							wrapperClassName="b-a-1 border-light App"
							editorClassName="scroll-y"
							onEditorStateChange={this.onEditorStateChange}
							wrapperStyle={{'height':'58vh'}}
						/>
				</ModalBody>
				<ModalFooter>
              <button className='btn btn-primary' onClick={this.save.bind(this)}>
              	Salva
              </button>
              <button className='btn btn-secondary' onClick={onClose}>
                  Annulla
              </button>
          </ModalFooter>
			</Modal>
			)
		}
}
