import {
  GET_OAUTH_FAIL,
  GET_OAUTH_LOGOUT,
  GET_OAUTH_REQUEST,
  GET_OAUTH_SUCCESS,
} from '../constants/oauthConstant'
export const OauthLogin = (response) => async (dispatch) => {
  try {
    dispatch({
      type: GET_OAUTH_REQUEST,
    })

    dispatch({
      type: GET_OAUTH_SUCCESS,
      payload: response,
    })
    localStorage.setItem('useroauth', JSON.stringify(response))
  } catch (error) {
    dispatch({
      type: GET_OAUTH_FAIL,
      payload: error,
    })
  }
}
export const OauthLogout = () => async (dispatch) => {
  localStorage.removeItem('useroauth')
  dispatch({
    type: GET_OAUTH_LOGOUT,
  })
}
