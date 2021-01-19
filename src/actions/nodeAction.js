import axios from 'axios'
import {
  GET_NODE_FAIL,
  GET_NODE_REQUEST,
  GET_NODE_SUCCESS,
  HAVE_NODE_FAIL,
  HAVE_NODE_SUCCESS,
  HAVE_NODE_REQUEST,
} from '../constants/nodeConstant'
export const NodeAdd = (id, type, tags, attributes) => async (dispatch) => {
  try {
    dispatch({
      type: GET_NODE_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      'http://localhost:5000/nodes',
      { id, type, tags, attributes },
      config
    )
    console.log('heelo', data)

    dispatch({
      type: GET_NODE_SUCCESS,
      payload: data,
    })
    localStorage.setItem('nodeadded', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: GET_NODE_FAIL,
      payload: error,
    })
  }
}
export const Nodefetch = () => async (dispatch) => {
  try {
    dispatch({
      type: HAVE_NODE_REQUEST,
    })

    const { data } = await axios.get('http://localhost:5000/nodes')
    console.log('heelo', data)

    dispatch({
      type: HAVE_NODE_SUCCESS,
      payload: data,
    })
    localStorage.setItem('nodehave', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: HAVE_NODE_FAIL,
      payload: error,
    })
  }
}
