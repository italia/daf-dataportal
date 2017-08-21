import React, { PropTypes } from 'react';
import AddWidgetDialog from './AddWidgetDialog';
import { Route, Link } from 'react-router-dom';

class ViewBar extends React.Component {

  constructor(props) {
      super(props);
  }

  render = function(){

    return (
      <div className="box text-right">

        <h2 className="pull-left">{this.props.title}</h2>

        <Link role="button" to="/dashboard/list">
          <button type="button" className="btn btn-default btn-xs" >
            <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
              Torna a Le Mie Dashboards
          </button>
        </Link>

        <Link role="button" to={"/dashboard/list/" + this.props.id + "/edit"}>
          <button type="button" className="btn btn-primary btn-xs">
            <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
              Modifica
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
