import React, { Component } from 'react';
import Components from 'react';
import { Route, Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { loadVocabulary } from '../../../actions'

// App components
import Header from './Header';
import Container from './Container';

class VocabularyList extends Component {
  constructor(props) {
    super(props);
    
  }

  componentDidMount () {
    const { dispatch } = this.props;
    dispatch(loadVocabulary())
  }

  /**
   * Render Function
   */
  render() {
    const { vocabulary, error } = this.props
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
    </Container>
    );
  }

}

VocabularyList.propTypes = {
    error: PropTypes.string,
    vocabulary:  PropTypes.array,
    dispatch: PropTypes.func.isRequired
  }
  
  function mapStateToProps(state) {
    const { vocabulary, error } = state.ontologiesReducer['voc'] || { vocabulary: [], error:'' }
    return { vocabulary, error }

  }

export default connect(mapStateToProps)(VocabularyList)
