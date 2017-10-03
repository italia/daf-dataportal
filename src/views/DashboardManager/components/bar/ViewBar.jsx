import React, { PropTypes } from 'react';
import { Route, Link } from 'react-router-dom';

class ViewBar extends React.Component {

  constructor(props) {
      super(props);
  }

  render = function(){

    return (
      <div className="row">
        <div className="col-sm-7">
          <h3 className="card-title">{this.props.title}</h3>
        </div>
        <div className="col-sm-7">
          <h7 className="card-title">{this.props.subtitle}</h7>
        </div>
        <div className="col-sm-5 hidden-sm-down">
          <div className="btn-toolbar float-right" role="toolbar" aria-label="Toolbar with button groups">
            <div className="btn-group mr-1" data-toggle="buttons" aria-label="First group">
              <Link role="button" to="/dashboard/list">
                <button type="button" className="btn btn-link btn-xs" title="Torna alle mie Dashboard">
                  <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
                  <i className="fa fa-chevron-circle-left fa-lg m-t-2"></i>
                </button>
              </Link>

              <Link role="button" to={"/dashboard/list/" + this.props.id + "/edit"}>
                <button type="button" className="btn btn-link btn-xs" title="Modifica">
                  <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
                  <i className="fa fa-pencil fa-lg m-t-2"></i>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

    );
  }
};


/*
 <Link role="button" to="/dashboard/list">
          <button type="button" className="btn btn-link float-right" title="Torna alle mie Dashboard">
            <i className="icon-list icons font-2xl d-block m-t-2"></i>
          </button>
        </Link>

        <Link role="button" to={"/dashboard/list/" + this.props.id + "/edit"}>
        <button type="button" className="btn btn-link float-right" title="Modifica">
          <i className="icon-pencil icons font-2xl d-block m-t-2"></i>
        </button>
      </Link>
*/

export default ViewBar;
