import { serviceurl } from '../../../../config/serviceurl.js'
import {
  DATA_APPLICATIONS_FETCH_START,
  DATA_APPLICATIONS_FETCH_ACHIEVE,
  DATA_APPLICATIONS_FETCH_MISS
} from './actions'

const dataApplicationAPIsURL = `${serviceurl.apiURLDatiGov}/public/data-applications`

const startFetchingDataApplications = () => ({ type: DATA_APPLICATIONS_FETCH_START })

const achieveFetchingDataApplications = response => ({
  type: DATA_APPLICATIONS_FETCH_ACHIEVE,
  payload: response
})

const missFetchingDataApplications = error => ({
  type: DATA_APPLICATIONS_FETCH_MISS,
  payload: error,
  error: true
})

export const fetchDataApplications = () => dispatch => {
  dispatch(startFetchingDataApplications())
  fetch(dataApplicationAPIsURL)
    .then(response => response.ok
      ? response.json().then(
        jsonResponse => dispatch(achieveFetchingDataApplications(jsonResponse))
      )
      : dispatch(missFetchingDataApplications(new Error(`${response.statusText}`)))
    )
    .catch(
      error => dispatch(missFetchingDataApplications(error))
    )
}