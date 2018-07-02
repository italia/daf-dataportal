import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { requestOntDetail } from '../actions/ontologiesActions'
import OntologyDetail from '../components/OntologyDetail'
import { initialDetail } from '../config/initialStates'

const mapStateToProps = state => state.ontologyDetail || initialDetail

const mapDispatchToProps = dispatch => ({
  fetchOntDetail: ontID => dispatch(requestOntDetail(ontID))
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OntologyDetail)
)
