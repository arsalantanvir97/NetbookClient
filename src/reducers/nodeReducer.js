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
  UPDATE_EDGE_FAIL,
  UPDATE_EDGE_REQUEST,
  UPDATE_EDGE_SUCCESS,
  UPDATE_NODE_FAIL,
  UPDATE_NODE_REQUEST,
  UPDATE_NODE_SUCCESS,
  REMOVE_EDGE_FAIL,
  REMOVE_EDGE_REQUEST,
  REMOVE_EDGE_SUCCESS,
  REMOVE_NODE_FAIL,
  REMOVE_NODE_REQUEST,
  REMOVE_NODE_SUCCESS,
} from '../constants/nodeConstant'
export const putNodeReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_NODE_REQUEST:
      return { loading: true }
    // case GET_NODE_SUCCESS:
    //   return { loading: false, node: action.payload }
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
      let pushed = action.payload
      if (state.newnode?.nodes.length > 0) {
        pushed.nodes.push(state.newnode.nodes[0])
      }
      console.log('ppp', pushed)
      const arra = state.newnode?.nodes.length > 0 ? pushed : action.payload
      // const arra = action.payload
      console.log('hasan', arra)
      return { ...state, loading: false, nodde: arra }
    case GET_NODE_SUCCESS:
      console.log('helo', state.nodde)
      console.log('hi', action.payload)
      return {
        ...state,
        newnode: { nodes: [action.payload] },
        loading: false,
      }
    case UPDATE_NODE_SUCCESS:
      return {
        ...state,
        nodde: [action.payload, ...state.nodde],
        loading: false,
      }

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
      console.log('hhg', state.edge)
      return { loading: false, edge: action.payload }
    case GET_EDGE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
export const updateNodeReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_NODE_REQUEST:
      return { loading: true }
    // case UPDATE_NODE_SUCCESS:
    //   return { loading: false, updatethenode: action.payload }
    case UPDATE_NODE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
export const updateEdgeReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_EDGE_REQUEST:
      return { loading: true }
    case UPDATE_EDGE_SUCCESS:
      return { loading: false, updatetheedge: action.payload }
    case UPDATE_EDGE_FAIL:
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
export const deleteEdgeReducer = (state = {}, action) => {
  switch (action.type) {
    case REMOVE_EDGE_REQUEST:
      return { loading: true }
    case REMOVE_EDGE_SUCCESS:
      return { loading: false, edgedelete: true }
    case REMOVE_EDGE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
export const deleteNodeReducer = (state = {}, action) => {
  switch (action.type) {
    case REMOVE_NODE_REQUEST:
      return { loading: true }
    case REMOVE_NODE_SUCCESS:
      return { loading: false, nodedelete: true }
    case REMOVE_NODE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
