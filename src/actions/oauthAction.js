import axios from 'axios'
import {
  GET_OAUTH_FAIL,
  GET_OAUTH_LOGOUT,
  GET_OAUTH_REQUEST,
  GET_OAUTH_SUCCESS,
  GET_OAUTHUPDATE_REQUEST,
  GET_OAUTHUPDATE_SUCCESS,
  GET_OAUTHUPDATE_FAIL,
  GET_AIQUERIES_REQUEST,
  GET_AIQUERIES_SUCCESS,
  GET_AIQUERIES_FAIL,
} from '../constants/oauthConstant'
export const OauthLogin = (
  name,
  email,
  imageUrl,
  access_token,
  expires_in,
  expires_at,
  packageid
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
      {
        name,
        email,
        imageUrl,
        access_token,
        expires_in,
        expires_at,
        packageid,
      },
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
export const OauthUpdatePackageid = (id, packageid) => async (dispatch) => {
  try {
    dispatch({
      type: GET_OAUTHUPDATE_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.put(
      `https://netbook-server.herokuapp.com/items/up/${id}`,
      {
        packageid,
      },
      config
    )
    console.log('data', data)
    dispatch({
      type: GET_OAUTHUPDATE_SUCCESS,
      payload: data,
    })
    localStorage.setItem('useroauth', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: GET_OAUTHUPDATE_FAIL,
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
export const AIQueriesfetch = (id, query) => async (dispatch) => {
  let ars
  try {
    dispatch({
      type: GET_AIQUERIES_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      `https://netbook-server.herokuapp.com/items/${id}`,
      { query },
      config
    )
    ars = data.userupdated
    console.log('aiqueries', data, ars)

    dispatch({
      type: GET_AIQUERIES_SUCCESS,
      payload: data,
    })
    localStorage.setItem('useroauth', JSON.stringify(ars))
  } catch (error) {
    dispatch({
      type: GET_AIQUERIES_FAIL,
      payload: error,
    })
  }
}
