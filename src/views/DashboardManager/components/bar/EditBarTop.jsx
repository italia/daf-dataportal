import React, { PropTypes } from 'react';
import AddWidgetDialog from '../AddWidgetDialog';
import { Route, Link } from 'react-router-dom';
import TextEditor from '../../../UserStory/components/editor/TextEditor'

class EditBarTop extends React.Component {

  constructor(props) {
    super(props);
    this.state= {
      dashboard : this.props.dashboard
    }
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.dashboard)
      this.state.dashboard = nextProps.dashboard;
  }

  handleChange(event) {
    this.setState({title: event.target.value});
    if(this.props.onChange)
      this.props.onChange(event.target.value);
  }

  pubblica(){

    let status = 1;

    this.state.dashboard.status = status;
    this.setState({
      dashboard : this.state.dashboard
    }); 
    
    if(this.props.onPublish)
      this.props.onPublish(status);
  }

  onRemove() {
    this.props.onRemove();
  }

  render = function(){

    return (
      <div className="box text-right">
        <div className="pull-left text-left">
          <input 
            className="form-control"
            value={this.state.dashboard.title}
            placeholder="Insert a title"
            onChange={this.handleChange}
          />
          
          <button type="button" className="btn btn-danger btn-xs mt-20" onClick={() => this.onRemove()}>
              Elimina
          </button>
        </div>

        <Link role="button" to="/dashboard/list">
          <button type="button" className="btn btn-default btn-xs" >
              Torna a Le Mie Dashboards
          </button>
        </Link>

        <Link role="button" to={"/dashboard/list/" + this.state.dashboard._id }>
          <button type="button" className="btn btn-primary btn-xs">
              Anteprima
          </button>
        </Link>

        <div className="mt-20">
          <span className="mr-20">
            <b className="mr-10">Stato</b>
            {
              (!this.state.dashboard.status || this.state.dashboard.status==false) &&
              <span>In bozza</span>
            }
          </span>

          {
            (!this.state.dashboard.status || this.state.dashboard.status==false) &&
            <button type="button" className="btn btn-success btn-xs" onClick={() => this.pubblica()}>
                Pubblica
            </button>
          }

          {
            /* this.state.dashboard.status && this.state.dashboard.status==true &&
            <button type="button" className="btn btn-danger btn-xs" onClick={() => this.pubblica()}>
                Spubblica
            </button> */
          }
        </div>
        
      </div>

    );
  }
};

export default EditBarTop;
