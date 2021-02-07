import axios from 'axios'
import {
  GET_OAUTH_FAIL,
  GET_OAUTH_LOGOUT,
  GET_OAUTH_REQUEST,
  GET_OAUTH_SUCCESS,
} from '../constants/oauthConstant'
export const OauthLogin = (
  name,
  email,
  imageUrl,
  access_token,
  expires_in,
  expires_at
) => async (dispatch) => {
  try {
    dispatch({
      type: GET_OAUTH_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      'https://netbook-server.herokuapp.com/items',
      { name, email, imageUrl, access_token, expires_in, expires_at },
      config
    )

    dispatch({
      type: GET_OAUTH_SUCCESS,
      payload: data,
    })
    localStorage.setItem('useroauth', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: GET_OAUTH_FAIL,
      payload: error,
    })
  }
}
export const OauthLogout = () => async (dispatch) => {
  localStorage.removeItem('useroauth')
  localStorage.removeItem('nodehave')
  dispatch({
    type: GET_OAUTH_LOGOUT,
  })
}
