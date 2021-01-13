import {
  GET_OAUTH_FAIL,
  GET_OAUTH_REQUEST,
  GET_OAUTH_SUCCESS,
  GET_OAUTH_LOGOUT,
} from '../constants/oauthConstant'
export const getOauthReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_OAUTH_REQUEST:
      return { loading: true }
    case GET_OAUTH_SUCCESS:
      return { loading: false, oauth: action.payload }
    case GET_OAUTH_FAIL:
      return { loading: false, error: action.payload }
    case GET_OAUTH_LOGOUT:
      return {}
    default:
      return state
  }
}
