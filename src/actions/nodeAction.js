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
  UPDATE_EDGE_SUCCESS,
  UPDATE_EDGE_REQUEST,
  UPDATE_EDGE_FAIL,
  UPDATE_NODE_SUCCESS,
  UPDATE_NODE_REQUEST,
  UPDATE_NODE_FAIL,
  REMOVE_NODE_SUCCESS,
  REMOVE_NODE_REQUEST,
  REMOVE_NODE_FAIL,
  REMOVE_EDGE_SUCCESS,
  REMOVE_EDGE_REQUEST,
  REMOVE_EDGE_FAIL,
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
      'https://netbook-server.herokuapp.com/nodes',
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
      'https://netbook-server.herokuapp.com/nodes/get',
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
      'https://netbook-server.herokuapp.com/edges',
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
export const EdgeUpdate = (id, edgeid, source, target, tags) => async (
  dispatch
) => {
  try {
    dispatch({
      type: UPDATE_EDGE_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.put(
      `https://netbook-server.herokuapp.com/edges/${id}`,
      { edgeid, source, target, tags },
      config
    )
    console.log('heelo', data)

    dispatch({
      type: UPDATE_EDGE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: UPDATE_EDGE_FAIL,
      payload: error,
    })
  }
}
export const NodeUpdate = (_id, nodeid, id, type, tags, attributes) => async (
  dispatch
) => {
  try {
    dispatch({
      type: UPDATE_NODE_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.put(
      `https://netbook-server.herokuapp.com/nodes/${_id}`,
      { nodeid, id, type, tags, attributes },
      config
    )
    console.log('heelo', data)

    dispatch({
      type: UPDATE_NODE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: UPDATE_NODE_FAIL,
      payload: error,
    })
  }
}

export const NodeDeletion = (id) => async (dispatch) => {
  try {
    dispatch({
      type: REMOVE_NODE_REQUEST,
    })

    await axios.delete(`https://netbook-server.herokuapp.com/nodes/${id}`)

    dispatch({
      type: REMOVE_NODE_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: REMOVE_NODE_FAIL,
      payload: error,
    })
  }
}

export const EdgeDeletion = (id) => async (dispatch) => {
  try {
    dispatch({
      type: REMOVE_EDGE_REQUEST,
    })

    await axios.delete(`https://netbook-server.herokuapp.com/edges/${id}`)

    dispatch({
      type: REMOVE_EDGE_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: REMOVE_EDGE_FAIL,
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
      'https://netbook-server.herokuapp.com/edges/get',
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
