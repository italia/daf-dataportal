import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { requestVocList } from '../actions/vocabulariesActions'
import VocabulariesList from '../components/VocabulariesList'
import { initialList } from '../config/initialStates'

const mapStateToProps = state => state.vocabulariesList || initialList

const mapDispatchToProps = dispatch => ({
  fetchVocList: () => dispatch(requestVocList())
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(VocabulariesList)
)
