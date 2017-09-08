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

    const style = {
      "borderBottom": "1px solid #e4e5e6"
    }

    return (
          <div>
          {this.state.dashboard.id &&
          (this.state.dashboard.status==0) &&
                <div className="row">
                <div className="alert alert-warning" role="alert">
                  Attenzione la dashboard è in bozza, per pubblicarla cliccare sul tasto "Pubblica" qui in basso
                </div>
                </div>
              }
              {
                (this.state.dashboard.status==1) &&
                <div className="row">
                  <div className="alert alert-primary" role="alert">
                    Dashboard correttamente pubblicata
                  </div>
                </div>
              }
          <div className="row" style={style}>
            <div className="col-sm-7">
              <h3 className="card-title">{this.state.dashboard.title}</h3>
            </div>
            <div className="col-sm-7">
              <h7 className="card-title">Sottotitolo</h7>
            </div>
            <div className="col-sm-5 hidden-sm-down">
              <div className="btn-toolbar float-right" role="toolbar" aria-label="Toolbar with button groups">
                <div className="btn-group mr-1" data-toggle="buttons" aria-label="First group">
                  <Link role="button" to="/dashboard/list">
                    <button type="button" className="btn btn-link float-right" title="Torna alle mie Dashboard">
                      <i className="fa fa-navicon fa-lg m-t-2"></i>
                    </button>
                  </Link>
                  {this.state.dashboard.id &&
                  <button type="button" className="btn btn-link float-right" onClick={() => this.onRemove()}  title="Elimina">
                    <i className="fa fa-trash fa-lg m-t-2"></i>
                  </button>
                  }

                  {
                   this.state.dashboard.id &&
                    <Link role="button" to={"/dashboard/list/" + this.state.dashboard.id }>
                      <button type="button" className="btn btn-link float-right" title="Anteprima">
                        <i className="fa fa-file-image-o fa-lg m-t-2"></i>
                      </button>
                    </Link>
                  }
                  {
                   (!this.state.dashboard.status || this.state.dashboard.status==false) &&
                    <button type="button" className="btn btn-link float-right" onClick={() => this.pubblica()} title="Pubblica">
                    <i className="fa fa-check-square-o fa-lg m-t-2"></i>
                    </button>
                  }

                </div>
              </div>
            </div>
          </div>
        </div>
    );
  }
};

/*
      <div className="box text-right">
       <div className="pull-left text-left">
          <input 
            className="form-control"
            value={this.state.dashboard.title}
            placeholder="Inserisci un titolo"
            onChange={this.handleChange}
          />
          
          {
          this.state.dashboard.id &&
          <button type="button" className="btn btn-danger btn-xs mt-20" onClick={() => this.onRemove()}>
              Elimina
          </button>
          }
        </div>

        <Link role="button" to="/dashboard/list">
          <button type="button" className="btn btn-default btn-xs" >
              Torna a Le Mie Dashboards
          </button>
        </Link>

        {
          this.state.dashboard.id &&
          <Link role="button" to={"/dashboard/list/" + this.state.dashboard.id }>
            <button type="button" className="btn btn-primary btn-xs">
                Anteprima
            </button>
          </Link>
        }

        {
          this.state.dashboard.id &&
          <div className="mt-20">
            <span className="mr-20">
              <b className="mr-10">Stato</b>
              {
                (this.state.dashboard.status==0) &&
                <span>In bozza</span>
              }
              {
                (this.state.dashboard.status==1) &&
                <span>Pubblicato</span>
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
              </button> 
            }
          </div>
        }
      </div>
*/


export default EditBarTop;
