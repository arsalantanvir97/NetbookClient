import {
  GET_OAUTH_FAIL,
  GET_OAUTH_REQUEST,
  GET_OAUTH_SUCCESS,
  GET_OAUTH_LOGOUT,
  GET_AIQUERIES_FAIL,
  GET_AIQUERIES_SUCCESS,
  GET_AIQUERIES_REQUEST,
} from '../constants/oauthConstant'
export const getOauthReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_OAUTH_REQUEST:
      return { loading: true }
    case GET_OAUTH_SUCCESS:
      console.log('response', action.payload)
      return { loading: false, oauth: action.payload }
    case GET_OAUTH_FAIL:
      return { loading: false, error: action.payload }
    case GET_OAUTH_LOGOUT:
      return {}
    case GET_AIQUERIES_REQUEST:
      return { ...state, loading: true }
    case GET_AIQUERIES_SUCCESS:
      console.log('state in AI Queries success', state)
      return {
        ...state,
        loading: false,
        oauth: {
          ...state.oauth,
          AIQueries: state.oauth.AIQueries + 1,
          msg: action.payload,
        },
      }
    case GET_AIQUERIES_FAIL:
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}
export const getAIQueriesReducer = (state = {}, action) => {
  switch (action.type) {
    default:
      return state
  }
}
