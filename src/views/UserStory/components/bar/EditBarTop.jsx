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
          (!this.state.published || this.state.published==false) &&
          <button type="button" className="btn btn-link" onClick={() => this.pubblica()}>
            <i className="fa fa-paper-plane-o fa-lg m-t-2"></i>
          </button>
        }

          
      </div>

    );
  }
};

export default EditBarTop;
