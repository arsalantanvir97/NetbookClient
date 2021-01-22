import {
  GET_NODE_FAIL,
  GET_NODE_REQUEST,
  GET_NODE_SUCCESS,
  HAVE_NODE_REQUEST,
  HAVE_NODE_SUCCESS,
  HAVE_NODE_FAIL,
  GET_EDGE_FAIL,
  GET_EDGE_REQUEST,
  GET_EDGE_SUCCESS,
  HAVE_EDGE_FAIL,
  HAVE_EDGE_REQUEST,
  HAVE_EDGE_SUCCESS,
} from '../constants/nodeConstant'
export const putNodeReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_NODE_REQUEST:
      return { loading: true }
    case GET_NODE_SUCCESS:
      return { loading: false, node: action.payload }
    case GET_NODE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
export const getNodeReducer = (state = {}, action) => {
  switch (action.type) {
    case HAVE_NODE_REQUEST:
      return { loading: true }
    case HAVE_NODE_SUCCESS:
      return { loading: false, nodde: action.payload }
    case HAVE_NODE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
export const putEdgeReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_EDGE_REQUEST:
      return { loading: true }
    case GET_EDGE_SUCCESS:
      return { loading: false, edge: action.payload }
    case GET_EDGE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
export const getEdgeReducer = (state = {}, action) => {
  switch (action.type) {
    case HAVE_EDGE_REQUEST:
      return { loading: true }
    case HAVE_EDGE_SUCCESS:
      return { loading: false, eddge: action.payload }
    case HAVE_EDGE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
