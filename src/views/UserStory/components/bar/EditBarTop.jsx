import React, { PropTypes } from 'react';
import { Route, Link } from 'react-router-dom';

class EditBarTop extends React.Component {

  constructor(props) {
    super(props);
    //set init state
    this.state= {
      title : this.props.title,
      published : this.props.published || false
    }

    // bind functions
    this.handleChange = this.handleChange.bind(this);
    this.pubblica = this.pubblica.bind(this);
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

  onRemove() {
    this.props.onRemove();
  }
  
  render = function(){

    return (
      <div className="box text-right">
        <div className="pull-left text-left">
          <input 
            className="form-control"
            value={this.state.title}
            placeholder="Insert a title"
            onChange={this.handleChange}
          />

          <button type="button" className="btn btn-danger btn-xs mt-20" onClick={() => this.onRemove()}>
              Elimina
          </button>
          
        </div>

        <Link role="button" to="/user_story/list">
          <button type="button" className="btn btn-default btn-xs" >
              Torna a Le Mie Dashboards
          </button>
        </Link>

        {
          this.props.id &&
          <span>
            <Link role="button" to={"/user_story/list/" + this.props.id }>
              <button type="button" className="btn btn-primary btn-xs">
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
          </span>
        }

      </div>

    );
  }
};

export default EditBarTop;
