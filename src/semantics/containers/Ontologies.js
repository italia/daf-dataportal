import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { requestOntList } from '../actions/ontologiesActions'
import OntologiesList from '../components/OntologiesList'
import { initialList } from '../config/initialStates'

const mapStateToProps = state => state.ontologiesList || initialList

const mapDispatchToProps = dispatch => ({
  fetchOntList: () => dispatch(requestOntList())
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OntologiesList)
)
