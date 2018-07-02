import React from 'react'
import { connect } from 'react-redux'

import { fetchDataApplications } from './actions/dataApplicationsActionCreators'
import DataApplicationsList from './components/DataApplicationsList.jsx'
import { initialStateList } from './reducers/initialStates'

const mapStateToProps = state => state.dataApplicationsList || initialStateList

const mapDispatchToProps = dispatch => ({
  requestDataApplicationsList: () => dispatch(fetchDataApplications())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DataApplicationsList)
