import {
  GET_NODE_FAIL,
  GET_NODE_REQUEST,
  GET_NODE_SUCCESS,
  HAVE_NODE_REQUEST,
  HAVE_NODE_SUCCESS,
  HAVE_NODE_FAIL,
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
