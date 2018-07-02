import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { requestVocDetail } from '../actions/vocabulariesActions'
import VocabularyDetail from '../components/VocabularyDetail'
import { initialDetail } from '../config/initialStates'

const mapStateToProps = state => state.vocabularyDetail || initialDetail

const mapDispatchToProps = dispatch => ({
  fetchVocDetail: vocID => dispatch(requestVocDetail(vocID))
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(VocabularyDetail)
)
