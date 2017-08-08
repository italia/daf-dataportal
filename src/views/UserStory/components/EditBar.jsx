import React, { PropTypes } from 'react';
import ColumnSetWidth from './ColumnSetWidth';

const EditBar = ({ onEdit, layout, setLayout }) => {


  var addRow = function () { 
    let row = {
          columns: [{
            className: 'col-md-12 col-sm-12 col-xs-12',
            widgets: [],
          }],
        }
    layout.rows.unshift(row);
    setLayout(layout);
  }

  return (
    <div className="row edit-bar">
      {/* 
      <div className="col-sm-12 text-right">
        <button type="button" className="btn btn-default btn-xs" onClick={onEdit}>
          <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span>
            Edit
          </button>
      </div> 
      */}

      <div className="box">
        <h4 className="mb-20">
          Customize Layout
        </h4>

        <div className="container view-layout mt-40">
          <div className="row">
            <div className="col-sm-6 col-md-4">
              
              {
                layout.rows.map(function(row) {
                return (
                  <div className="row layout-box">
                    {
                      row.columns.map(function(col) {
                      return (
                          <div className={col.className}>
                          
                          </div>
                        );
                      })
                    }
                  </div>
                  );
                })
              }
              
            </div>
            <div className="col-sm-6 col-md-4">

              {
                layout.rows.map(function(row, c) {
                return (
                  <div className="row h-layout">
                    <ColumnSetWidth 
                      index={c} 
                      setLayout={setLayout} 
                      layout={layout}>
                    </ColumnSetWidth>
                    {/* <div className="btn-group" role="group" aria-label="Columns number">
                      <button type="button" className="btn btn-default" onClick={() => setCol(1, c)}>1</button>
                      <button type="button" className="btn btn-default" onClick={() => setCol(2, c)}>2</button>
                      <button type="button" className="btn btn-default" onClick={() => setCol(3, c)}>3</button>
                      <button type="button" className="btn btn-default" onClick={() => setCol(4, c)}>4</button>
                    </div> */}
                  </div>
                  );
                })
              }
            </div>
          </div>
          
        </div>

        <div className="clearfix mt-20 mb-20"></div>
        <button type="button" className="btn btn-default btn-xs" onClick={addRow}>
          <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
            Add Row
        </button>
      </div>

      <div className="clearfix"></div>
    </div>

  );
};

EditBar.propTypes = {
  onEdit: PropTypes.func,
  setLayout: PropTypes.func,
  layout: PropTypes.object
};

export default EditBar;
