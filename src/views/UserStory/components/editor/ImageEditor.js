import React, { Component } from 'react';
import Components from 'react';
import TextEditor from './TextEditor';
import Modal from 'react-modal';

class ImageEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      image: props.image
    }
    
    if (!this.state.image) {
      this.state.image = {}
    }

    this.state.image_url = this.state.image.url;

    this.onChange = this.onChange.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.saveUrl = this.saveUrl.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  
  onChange = function(key, value) {
    this.state.image[key] = value;
    if(this.props.onChange)
      this.props.onChange(this.props.keyValue, this.state.image);
  }

  /**
   * open modal change img
   */
  openModal() {
    this.setState({
      isModalOpen: true
    })
  }

  /**
   * close modal change img
   */
  closeModal() {
    this.setState({
      isModalOpen: false
    })
  }

  /**
   * Save URL
   */
  saveUrl() {

    if(this.props.onChange)
      this.props.onChange(this.props.keyValue, this.state.image);

    this.setState({
      image_url: this.state.image.url,
      isModalOpen: false
    })
  }
  

  handleChange(event) {
    this.setState({
      image: {
        url: event.target.value,
        caption: this.state.image.caption
      }
    });
  }
  
  /**
   * Render Function
   */
  render() {
    return (
    <div>
      <img className="image-container" src={this.state.image_url} />
      
      {
        this.props.readonly!=true &&
        <div className="text-center mt-20 mb-20">
            <button type="button" className="btn btn-gray-200" onClick={() => this.openModal()}>
              Seleziona immagine
          </button>
        </div>
      }

      <TextEditor 
        keyValue="caption"
        text={this.state.image.caption} 
        className="text-editor-img-caption"
        onChange={this.onChange}
        placeholder="Insert here image description..."
        readonly={this.props.readonly}
      ></TextEditor>

        
      <Modal
        contentLabel="Selezione immagine"
        className="Modal__Bootstrap modal-dialog modal-80"
        isOpen={this.state.isModalOpen}>
        <div className="modal-content">
         <div className="modal-header">
           <button type="button" className="close" onClick={this.closeModal}>
             <span aria-hidden="true">&times;</span>
             <span className="sr-only">Chiudi</span>
           </button>
           <h4 className="modal-title">Inserisci un'immagine</h4>
         </div>
         <div className="modal-body">

           <h5 className="mt-20 mb-20">Iserisci l'URL dell'immagine da aggiungere</h5>
           <label>URL</label>
           <input onChange={this.handleChange} type="text" className="form-control" value={this.state.image.url} placeholder="htttp://example.com/image.png"/>

         </div>
         <div className="modal-footer">
              <button type="button" className="btn btn-gray-200" onClick={this.saveUrl}>Salva</button>
         </div>
        </div>
      </Modal>
    </div>
    );
  }

}

export default ImageEditor;
