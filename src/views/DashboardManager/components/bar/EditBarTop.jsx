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

  pubblica(){

    let published = !this.state.published;

    this.setState({
      published : published
    });
    
    if(this.props.onPublish)
      this.props.onPublish(published);
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

        <div className="mt-20">
          <span className="mr-20">
            <b className="mr-10">Stato</b>
            {
              (!this.state.published || this.state.published==false) &&
              <span>In bozza</span>
            }
            {
              this.state.published && this.state.published==true &&
              <span>Pubblicato</span>
            }
          </span>

          {
            (!this.state.published || this.state.published==false) &&
            <button type="button" className="btn btn-success btn-xs" onClick={() => this.pubblica()}>
                Pubblica
            </button>
          }

          {
            /* this.state.published && this.state.published==true &&
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
