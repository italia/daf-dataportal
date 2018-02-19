import React, { Component } from 'react';
import Components from 'react';
import { Route, Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { loadVocabulary, loadOntologies } from '../../../actions'

// App components
import Header from './Header';
import Container from './Container';

class VocabularyList extends Component {
  constructor(props) {
    super(props);      
    const { dispatch } = this.props
    dispatch(loadVocabulary())
  }

  componentDidMount () {
    const { dispatch } = this.props;
      
    /* dispatch(loadOntologies()) */
      
  }

  /**
   * Render Function
   */
  render() {
    const { vocabulary, ontologies, error } = this.props
    return (
    <Container>
      <Header title="Vocabolari" />
      <div className="row">
        { error && error != '' &&
            <p>
                <b className="ml-20">Errore durante il caricamento dei vocabolari</b>
            </p>
        }
        { vocabulary &&  
            <div>
                <div className="row">
                <div className="col-lg-12">
                <div className="card">
                    <div className="card-header">
                        <i className="fa fa-align-justify"></i> Sono stati trovati {vocabulary.length} vocabolari
                    </div>
                    <div className="card-block">
                        <table className="table table-bordered table-striped table-condensed">
                            <thead>
                                <tr>
                                    <th>Nome</th> 
                                    <th>Descrizione</th>
                                    <th>Risorsa</th>
                                </tr>
                            </thead>
                            <tbody>
                                { vocabulary.map(voc => {
                                    return (<tr key={voc.nome}>
                                                <td>{voc.nome}</td>
                                                <td>{voc.descrizione}</td>
                                                <td><a className="page-link transparent-frame" target="_blank" href={voc.risorsa}><i className="fa fa-code fa-lg m-t-2"></i></a></td>
                                            </tr> ) 
                                    })
                                }
                            </tbody>  
                        </table>
                    </div>
                </div>
            </div>
        </div>
        </div>
        }
      </div>
      { vocabulary && vocabulary.length == 0 &&
        <p>
          <b className="ml-20">Nessun vocabolario trovato</b>
        </p>
      }
        <Header title="Ontologie" />
            <div className="row">
                {error && error != '' &&
                    <p>
                        <b className="ml-20">Errore durante il caricamento delle ontologie</b>
                    </p>
                }
                {ontologies &&
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
                                                    <th>Acronimo</th>
                                                    <th>Nome</th>
                                                    <th>Risorsa</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {ontologies.map(ontology => {
                                                    return (<tr key={ontology.acronimo}>
                                                        <td>{ontology.acronimo}</td>
                                                        <td>{ontology.nome}</td>
                                                        <td><a className="page-link transparent-frame" target="_blank" href={ontology.risorsa}><i className="fa fa-code fa-lg m-t-2"></i></a></td>
                                                    </tr>)
                                                })
                                                }
                                            </tbody>
                                        </table>
                                        {/*<nav>
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
                        </nav>*/}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
            {ontologies && ontologies.length == 0 &&
                <p>
                    <b className="ml-20">Nessuna ontologia trovata</b>
                </p>
            }
    </Container>
    );
  }

}

VocabularyList.propTypes = {
    error: PropTypes.string,
    vocabulary:  PropTypes.array,
    ontologies: PropTypes.array,
    dispatch: PropTypes.func.isRequired
  }
  
  function mapStateToProps(state) {
    const { vocabulary, ontologies, error } = state.ontologiesReducer['ont'] || state.ontologiesReducer['voc'] || { vocabulary: [], ontologies: [], error:'' }
    return { vocabulary, ontologies, error }

  }

export default connect(mapStateToProps)(VocabularyList)
