import React, { PropTypes } from 'react';
import { Route, Link } from 'react-router-dom';

class ViewBar extends React.Component {

  constructor(props) {
      super(props);
  }

  render = function(){

    return (
      <div className="box transparent">

        <Link role="button" to={"/user_story/create"}>
          <button type="button" className="btn btn-primary btn-xs">
            <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
              Crea Storia
          </button>
        </Link>

      </div>

    );
  }
};

/* 
ViewBar.propTypes = {
  onEdit: PropTypes.func,
  setLayout: PropTypes.func,
  layout: PropTypes.object,
  widgets: PropTypes.object
}; */

export default ViewBar;
