import React, { PropTypes } from 'react';
import AddWidgetDialog from '../AddWidgetDialog';
import { Route, Link } from 'react-router-dom';
import TextEditor from '../../../UserStory/components/editor/TextEditor'

class EditBarTop extends React.Component {

  constructor(props) {
    super(props);
    this.state= {
      title : this.props.title
    }
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.state.title = nextProps.title;
  }

  handleChange(event) {
    this.setState({title: event.target.value});
    if(this.props.onChange)
      this.props.onChange(event.target.value);
  }

  render = function(){

    return (
      <div className="box text-right">
        <div className="pull-left">
          <input 
            className="form-control"
            value={this.state.title}
            placeholder="Insert a title"
            onChange={this.handleChange}
          />
        </div>

        <Link role="button" to="/dashboard/list">
          <button type="button" className="btn btn-default btn-xs" >
            <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
              Torna a Le Mie Dashboards
          </button>
        </Link>

        <Link role="button" to={"/dashboard/list/" + this.props.id }>
          <button type="button" className="btn btn-primary btn-xs">
            <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
              Anteprima
          </button>
        </Link>

      </div>

    );
  }
};

export default EditBarTop;
