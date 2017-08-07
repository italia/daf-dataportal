import React, { PropTypes } from 'react';

const EditBar = ({ onEdit, onAddRow }) => {
  return (
    <div className="row edit-bar">
      <div className="col-sm-12 text-right">
        <button type="button" className="btn btn-default btn-xs" onClick={onEdit}>
          <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span>
            Edit
          </button>
      </div>

      <div className="row edit-bar-items">
        <div className="col-sm-12 text-right">
          <button type="button" className="btn btn-default btn-xs" onClick={onAddRow}>
            <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
              Add Row
            </button>
        </div>
      </div>

    </div>

  );
};

EditBar.propTypes = {
  onEdit: PropTypes.func,
  onAddRow: PropTypes.func,
};

export default EditBar;
