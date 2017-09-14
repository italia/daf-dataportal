import React, { PropTypes } from 'react';
import { Route, Link } from 'react-router-dom';

class EditBarTop extends React.Component {

  constructor(props) {
    super(props);
    //set init state
    this.state= {
      title : this.props.title,
      status : this.props.status || false
    }

    // bind functions
    this.handleChange = this.handleChange.bind(this);
    this.pubblica = this.pubblica.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      title : nextProps.title,
      id : nextProps.id
    });
  }

  handleChange(event) {
    this.setState({title: event.target.value});
    if(this.props.onChange)
      this.props.onChange(event.target.value);
  }

  pubblica(){

    let status = 1;

    this.setState({
      status : status
    });
    
    if(this.props.onPublish)
      this.props.onPublish(status);
  }

  onRemove() {
    this.props.onRemove();
  }
  
  render = function(){

    return (
      <div>
        
        {/* INFO BAR */}
        <div className="row">
        
          {
            !this.state.status &&

            <div className="col-sm-10">
              <div className="alert alert-warning" role="alert">
              <i className="fa fa-warning fa-lg m-t-2"></i> Attenzione la storia è in bozza, per pubblicarla cliccare sul tasto <i className="fa fa-paper-plane-o fa-lg m-t-2"></i> "Pubblica" qui in basso
              </div>
            </div>
          }
          {
            this.state.status == 1 &&
              <div className="col-sm-10">
                <div className="alert alert-success" role="alert">
                  <i className="fa fa-check-circle fa-lg m-t-2"></i> Storia correttamente pubblicata
                </div>
              </div>
            
          }
          <div className="col-sm-2">
          {
            (!this.props.saving) ? <span className="badge badge-success float-right">Salvato</span> : <span className="badge badge-warning float-right">Sto salvando...</span>
          }
          </div>
        </div>


        {/* BUTTON BAR */}          
        <div className="box text-right">
          <Link role="button" to="/user_story/list">
            <button type="button" className="btn btn-link" >
              <i className="fa fa-chevron-circle-left fa-lg m-t-2"></i>
            </button>
          </Link>
          
          <button type="button" className="btn btn-link" onClick={() => this.onRemove()}>
              <i className="fa fa-trash fa-lg m-t-2"></i>
          </button>

          <Link role="button" to={"/user_story/list/" + this.props.id }>
            <button type="button" className="btn btn-link">              
              <i className="fa fa-eye fa-lg m-t-2"></i>
            </button>
          </Link>

          {
            (!this.state.status || this.state.status==false) &&
            <button type="button" className="btn btn-link" onClick={() => this.pubblica()}>
              <i className="fa fa-paper-plane-o fa-lg m-t-2"></i>
            </button>
          }
        </div>

        
      </div>

    );
  }
};

export default EditBarTop;
