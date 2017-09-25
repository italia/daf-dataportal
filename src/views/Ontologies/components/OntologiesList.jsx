import React, { Component } from 'react';
import Components from 'react';
import { Route, Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { loadOntologies } from '../../../actions'

// App components
import Header from './Header';
import Container from './Container';

class OntologiesList extends Component {
  constructor(props) {
    super(props);
    
  }

  componentDidMount () {
    const { dispatch } = this.props;
    dispatch(loadOntologies())
  }

  /**
   * Render Function
   */
  render() {
    const { ontologies, error } = this.props
    return (
    <Container>
      <Header title="Ontologie" />
      <div className="row">
        { error && error != '' &&
            <p>
                <b className="ml-20">Errore durante il caricamento delle ontologie</b>
            </p>
        }
        { ontologies &&  
            <div>
                <div className="row">
                <div className="col-lg-12">
                <div className="card">
                    <div className="card-header">
                        <i className="fa fa-align-justify"></i> Sono state trovate {ontologies.length} ontologie
                    </div>
                    <div className="card-block">
                        <table className="table table-bordered table-striped table-condensed">
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Descrizione</th>
                                    <th>Classe</th>
                                    <th>Tipo</th>
                                    <th>Risorsa</th>
                                    <th>Sorgente</th>
                                </tr>
                            </thead>
                            <tbody>
                                { ontologies.map(ontology => {
                                    return (<tr key={ontology.ontologyName}>
                                                <td>{ontology.ontologyName}</td>
                                                <td>{ontology.ontologyDescription}</td>
                                                <td>{ontology.owlClasses}</td>
                                                <td>{ontology.datatypeProperties}</td>
                                                <td><a className="page-link transparent-frame" target="_blank" href={ontology.ontologyIRI}><i className="fa fa-file-text-o fa-lg m-t-2"></i></a></td>
                                                <td><a className="page-link transparent-frame" target="_blank" href={ontology.ontologySource}><i className="fa fa-code fa-lg m-t-2"></i></a></td>
                                            </tr> ) 
                                    })
                                }
                            </tbody>  
                        </table>
                        <nav>
                            <ul className="pagination">
                                <li className="page-item"><a className="page-link" href="#">Prev</a></li>
                                <li className="page-item active">
                                    <a className="page-link" href="#">1</a>
                                </li>
                                <li className="page-item"><a className="page-link" href="#">2</a></li>
                                <li className="page-item"><a className="page-link" href="#">3</a></li>
                                <li className="page-item"><a className="page-link" href="#">4</a></li>
                                <li className="page-item"><a className="page-link" href="#">Next</a></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
        </div>
        }
      </div>
      { ontologies && ontologies.length == 0 &&
        <p>
          <b className="ml-20">Nessuna ontologia trovata</b>
        </p>
      }
    </Container>
    );
  }

}

/*
  {ontologies.map(ontology => {
                                <tr key={ontology.ontologyName}>
                                    <td>{ontology.ontologyName}</td>
                                    <td>{ontology.ontologyDescription}</td>
                                    <td>{ontology.ontologyIRI}</td>
                                    <td>{ontology.ontologySource}</td>
                               </tr>
                                })
                            }
*/
OntologiesList.propTypes = {
    error: PropTypes.string,
    ontologies:  PropTypes.array,
    dispatch: PropTypes.func.isRequired
  }
  
  function mapStateToProps(state) {
    const { ontologies, error } = state.ontologiesReducer['ont'] || { ontologies: [], error:'' }
    return { ontologies, error }
    /*
    return { messaggio: state.ontologiesReducer.ontologies || [],
             error: state.ontologiesReducer.error }*/
  }

export default connect(mapStateToProps)(OntologiesList)
