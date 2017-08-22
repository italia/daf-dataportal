import React, { PropTypes } from 'react';
import Modal from 'react-modal';
import ReactDOM from 'react-dom';
import $ from 'jquery';

const ChangeGraphDialog = ({ widgets, isModalOpen, onRequestClose, onWidgetSelect}) => {
  const widgetItems = Object.keys(widgets).map((widget, key) => {
    let wid = widgets[widget].type;
    
    let onLoadIframe = function(id) {
      $("#title-preview-" + id).hide();
    }

    if(widget)
      return (
        <div key={key} className="col-sm-6 col-md-6 col-lg-6 list-group mb-20">
          <a className="list-group-item" onClick={() => onWidgetSelect(widget)}>
            <h6 className="list-group-item-heading" id={"title-preview-" + key}>
              {widgets[widget].title}
            </h6>
            <div className="preview-widget">
              {React.createElement(wid, {...widgets[widget].props, class: "no-click", onLoad: () => onLoadIframe(key)})}
            </div>
          </a>
        </div>
      );
  });

  return (
    <Modal
      contentLabel="Select Graph"
      className="Modal__Bootstrap modal-dialog modal-80"
      isOpen={isModalOpen}>
      <div className="modal-content">
       <div className="modal-header">
         <button type="button" className="close" onClick={onRequestClose}>
           <span aria-hidden="true">&times;</span>
           <span className="sr-only">Close</span>
         </button>
         <h4 className="modal-title">Add a widget</h4>
       </div>
       <div className="modal-body">
         <h5>Select a graph to add</h5>
         <div className="row ml-0 preview-widget-container">
           {widgetItems}
         </div>
       </div>
       <div className="modal-footer">
         <button type="button" className="btn btn-default" onClick={onRequestClose}>Close</button>
       </div>
      </div>
    </Modal>
  );
};

ChangeGraphDialog.propTypes = {
  widgets: PropTypes.object,
  isModalOpen: PropTypes.bool,
  onRequestClose: PropTypes.func,
  onWidgetSelect: PropTypes.func,
};

export default ChangeGraphDialog;
