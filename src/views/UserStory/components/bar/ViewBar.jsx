import React, { PropTypes } from 'react';
import { Route, Link } from 'react-router-dom';

class ViewBar extends React.Component {

  constructor(props) {
      super(props);
  }

  render = function(){

    return (
      <div className="box text-right">
{/* 
        <h2 className="pull-left">{this.props.title}</h2> 
*/}


        <Link role="button" to="/private/user_story/list">
          <button type="button" className="btn btn-link btn-xs" >
              <i className="fa fa-chevron-circle-left fa-lg m-t-2"></i>
          </button>
        </Link>

        <Link role="button" to={"/private/user_story/list/" + this.props.id + "/edit"}>
          <button type="button" className="btn btn-link btn-xs">
              <i className="fa fa-edit fa-lg m-t-2"></i> 
          </button>
        </Link>

      </div>

    );
  }
};


export default ViewBar;
