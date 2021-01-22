import axios from 'axios'
import {
  GET_NODE_FAIL,
  GET_NODE_REQUEST,
  GET_NODE_SUCCESS,
  HAVE_NODE_FAIL,
  HAVE_NODE_SUCCESS,
  HAVE_NODE_REQUEST,
  GET_EDGE_FAIL,
  GET_EDGE_REQUEST,
  GET_EDGE_SUCCESS,
  HAVE_EDGE_FAIL,
  HAVE_EDGE_REQUEST,
  HAVE_EDGE_SUCCESS,
} from '../constants/nodeConstant'
export const NodeAdd = (nodeid, id, type, tags, attributes) => async (
  dispatch
) => {
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
      { nodeid, id, type, tags, attributes },
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
export const Nodefetch = (nodeid) => async (dispatch) => {
  try {
    dispatch({
      type: HAVE_NODE_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      'http://localhost:5000/nodes/get',
      { nodeid },
      config
    )
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

export const EdgeAdd = (edgeid, source, target, tags) => async (dispatch) => {
  try {
    dispatch({
      type: GET_EDGE_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      'http://localhost:5000/edges',
      { edgeid, source, target, tags },
      config
    )
    console.log('heelo', data)

    dispatch({
      type: GET_EDGE_SUCCESS,
      payload: data,
    })
    localStorage.setItem('edgeadded', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: GET_EDGE_FAIL,
      payload: error,
    })
  }
}
export const Edgefetch = (edgeid) => async (dispatch) => {
  try {
    dispatch({
      type: HAVE_EDGE_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      'http://localhost:5000/edges/get',
      { edgeid },
      config
    )
    console.log('heelo', data)

    dispatch({
      type: HAVE_EDGE_SUCCESS,
      payload: data,
    })
    localStorage.setItem('edgehave', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: HAVE_EDGE_FAIL,
      payload: error,
    })
  }
}
