import React, { PropTypes } from 'react';


const EditBar = ({ onEdit, layout, setLayout }) => {

  var setCol = function (size, index) {

    let sizeClass = "col-xs-12"; 

    //set size class
    if (size == 1) {
      sizeClass = "col-md-12 col-sm-12 col-xs-12"; 
    } else if (size == 2) {
      sizeClass = "col-md-6 col-sm-6 col-xs-6"; 
    } else if (size == 3) {
      sizeClass = "col-md-4 col-sm-4 col-xs-4"; 
    } else if (size == 4) {
      sizeClass = "col-md-3 col-sm-3 col-xs-3"; 
    }

    //add or remove columns on row
    for(let i=0; i < size; i++) {

      if (i <= size) {
        //crea colonna
        if (!layout.rows[index].columns[i]) {
          layout.rows[index].columns[i] = {
              className: sizeClass,
              widgets: []
            }
        } else {
          //update size col
          layout.rows[index].columns[i].className=sizeClass;
        }
      }

      //rimuovi colonna
      if (i > size && layout.rows[index].columns[i]) {
        layout.rows[index].columns[i] = undefined;
      }
    }

    setLayout(layout);
  }

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
                      <button type="button" className="btn btn-default" onClick={() => setCol(4, c)}>4</button>
                    </div>
                  </div>
                  );
                })
              }
            </div>
          </div>
          
        </div>

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
