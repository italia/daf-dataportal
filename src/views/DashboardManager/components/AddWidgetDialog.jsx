import React, { PropTypes } from 'react';
import Modal from 'react-modal';
import ReactDOM from 'react-dom';
import $ from 'jquery';

const AddWidgetDialog = ({ widgets, isModalOpen, onRequestClose, onWidgetSelect}) => {
  const widgetItems = Object.keys(widgets).map((widget, key) => {
    let wid = widgets[widget].type;
    
    let onLoadIframe = function(id) {
      $("#title-preview-" + id).hide();
    }

    if(widget && widget =="TextWidget")
      return (
        <div key={key} className="col-sm-12 col-md-12 col-lg-12 list-group mb-20">
          <a href="#/dashboard/manager" className="list-group-item" onClick={() => onWidgetSelect(widget)}>
            <h6 className="list-group-item-heading">
              {widgets[widget].title}
            </h6>
          </a>
        </div>
      );
    if(widget && widget.indexOf("BtnControlWidget") != 0 && widget !="TextWidget")
      return (
        <div key={key} className="col-sm-6 col-md-6 col-lg-6 list-group mb-20">
          <a href="#/dashboard/manager" className="list-group-item" onClick={() => onWidgetSelect(widget)}>
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
      contentLabel="Add a widget"
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
         <h5>Pick a widget to add</h5>
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

AddWidgetDialog.propTypes = {
  widgets: PropTypes.object,
  isModalOpen: PropTypes.bool,
  onRequestClose: PropTypes.func,
  onWidgetSelect: PropTypes.func,
};

export default AddWidgetDialog;
