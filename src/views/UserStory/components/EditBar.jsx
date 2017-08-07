import React, { PropTypes } from 'react';


const EditBar = ({ onEdit, onAddRow, layout }) => {

  var setCol = function (size, index) {
          console.log(size, index);
      }

  return (
    <div className="row edit-bar">
      {
        
      
        /* <div className="col-sm-12 text-right">
        <button type="button" className="btn btn-default btn-xs" onClick={onEdit}>
          <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span>
            Edit
          </button>
      </div> */}

      <div className="box">
        <h4 class="mb-20">
          Customize Layout
        </h4>

        <div className="container">
          <div className="row">
            <div className="col-sm-6 col-md-4">
              
              {
                layout.rows.map(function(row) {
                return (
                  <div className="row">
                    {
                      row.columns.map(function(col) {
                      return (
                          <div className="col-xs-1">
                            x
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
                  <div className="row">
                    <div className="btn-group" role="group" aria-label="Columns number">
                      <button type="button" className="btn btn-default" onClick={() => setCol(1, c)}>1</button>
                      <button type="button" className="btn btn-default" onClick={() => setCol(2, c)}>2</button>
                      <button type="button" className="btn btn-default" onClick={() => setCol(3, c)}>3</button>
                    </div>
                  </div>
                  );
                })
              }
            </div>
          </div>
          
        </div>

        <button type="button" className="btn btn-default btn-xs" onClick={onAddRow}>
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
  onAddRow: PropTypes.func,
  layout: PropTypes.object
};

export default EditBar;
