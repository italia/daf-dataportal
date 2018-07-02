import React, { PropTypes } from 'react';
import { Route, Link } from 'react-router-dom';
import { Tooltip } from 'reactstrap'

class ViewBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tooltipOpen: false
    }

    this.toggle = this.toggle.bind(this);

  }

  toggle() {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen
    });
  }

  render = function(){

    return (
      <div className="row">
{/* 
        <h2 className="pull-left">{this.props.title}</h2> 
*/}


{/*         <Link role="button" to="/private/userstory/list">
          <button type="button" className="btn btn-link btn-xs" >
              <i className="fa fa-chevron-circle-left fa-lg m-t-2"></i>
          </button>
        </Link> */}
      {this.props.pvt === "1" && <div><button className="text-primary mr-auto btn btn-link" id="DisabledAutoHideExample"><i className="fa fa-lock fa-lg"/></button>
        <Tooltip placement="bottom" isOpen={this.state.tooltipOpen} autohide={true} target="DisabledAutoHideExample" toggle={this.toggle}>
          La storia è riservata per l'organizzazione {this.props.org}
        </Tooltip></div>}
        {this.props.pvt === "0" && <div><button className="text-primary mr-auto btn btn-link" id="DisabledAutoHideExample"><i className="fa fa-globe fa-lg"/></button>
        <Tooltip placement="bottom" isOpen={this.state.tooltipOpen} autohide={true} target="DisabledAutoHideExample" toggle={this.toggle}>
          La storia è aperta dall'organizzazione {this.props.org}
        </Tooltip></div>}
        <Link role="button" className="ml-auto btn btn-link text-primary" to={"/private/userstory/list/" + this.props.id + "/edit"}>
          <i className="fa fa-edit fa-lg"></i> 
        </Link>

      </div>

    );
  }
};


export default ViewBar;
