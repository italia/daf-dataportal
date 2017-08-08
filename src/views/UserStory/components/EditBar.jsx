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

      <div className="box">
        <button type="button" className="btn btn-default btn-xs" onClick={addRow}>
          <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
            Add Row
        </button>
      </div>

    </div>

  );
};

EditBar.propTypes = {
  onEdit: PropTypes.func,
  setLayout: PropTypes.func,
  layout: PropTypes.object
};

export default EditBar;
