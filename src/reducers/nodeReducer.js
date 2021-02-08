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

// export const putNodeReducer = (state = {}, action) => {
//   switch (action.type) {
//     case GET_NODE_REQUEST:
//       return { loading: true }
//     // case GET_NODE_SUCCESS:
//     //   return { loading: false, node: action.payload }
//     case GET_NODE_FAIL:
//       return { loading: false, error: action.payload }
//     default:
//       return state
//   }
// }

export const getNodeReducer = (state = {}, action) => {
  switch (action.type) {
    case HAVE_NODE_REQUEST:
      return { ...state, loading: true }

    case HAVE_NODE_SUCCESS:
      return { ...state, loading: false, nodde: action.payload }

    case GET_NODE_SUCCESS:
      return {
        ...state,
        nodde: {
          ...state.nodde,
          nodes: [...state.nodde.nodes, action.payload]
        },
        loading: false,
      }

    case HAVE_NODE_FAIL:
      return { loading: false, error: action.payload }

    case UPDATE_NODE_REQUEST:
      return { ...state, loading: true }

    case UPDATE_NODE_SUCCESS:

      const indexNode = state.nodde.nodes.findIndex(node => node._id === action.payload._id);
      let newArrayNode = state.nodde.nodes;

      newArrayNode[indexNode] = action.payload;
      return { ...state, loading: false, nodde: { ...state.nodde, nodes: newArrayNode } }

    case UPDATE_NODE_FAIL:
      console.log("getting in update node failed")
      return { loading: false, error: action.payload }

    case REMOVE_NODE_REQUEST:
      return { ...state, loading: true }

    case REMOVE_NODE_SUCCESS:
      console.log("node id", action.payload)
      let updatedNodeArray = state.nodde.nodes.filter(node => node._id != action.payload)
      let deletedNode = state.nodde.nodes.filter(node => node._id == action.payload)
      console.log("state.nodde.links -->", state.nodde.links);
      console.log("deleted node -->", deletedNode);
      let updatedEdges = state.nodde.links.filter(link => link.source != deletedNode[0].id && link.target != deletedNode[0].id)
      console.log("updated edge and node array", updatedEdges, updatedNodeArray, state);
      return {
        ...state,
        loading: false,
        nodde: {
          links: updatedEdges,
          nodes: updatedNodeArray
        }
      }

    case REMOVE_NODE_FAIL:
      return { loading: false, error: action.payload }

    case GET_EDGE_REQUEST:
      return { ...state, loading: true }

    case GET_EDGE_SUCCESS:
      console.log("state.nodde -->", state.nodde);
      console.log("action.payload -->", action.payload)
      return {
        ...state,
        nodde: {
          ...state.nodde,
          links: [...state.nodde.links, action.payload]
        },
        loading: false,
      }

    case GET_EDGE_FAIL:
      return { loading: false, error: action.payload }

    case UPDATE_EDGE_REQUEST:
      return { ...state, loading: true }

    case UPDATE_EDGE_SUCCESS:
      const indexEdge = state.nodde.links.findIndex(link => link._id === action.payload._id);
      console.log("index edge", indexEdge)
      let newArrayEdge = state.nodde.links;
      newArrayEdge[indexEdge] = action.payload;
      console.log("new Array -->", newArrayEdge)
      return { ...state, loading: false, nodde: { ...state.nodde, links: newArrayEdge } }

    case UPDATE_EDGE_FAIL:
      return { loading: false, error: action.payload }

    case REMOVE_EDGE_REQUEST:
      return { ...state, loading: true }

    case REMOVE_EDGE_SUCCESS:
      let updatedEdgeArray = state.nodde.links.filter(link => link._id != action.payload)
      console.log("updated edge array", updatedEdgeArray)
      return { loading: false, nodde: { ...state.nodde, links: updatedEdgeArray } }

    case REMOVE_EDGE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

// export const putEdgeReducer = (state = {}, action) => {
//   switch (action.type) {

//     default:
//       return state
//   }
// }
// export const updateNodeReducer = (state = {}, action) => {
//   switch (action.type) {

//     default:
//       return state
//   }
// }
// export const updateEdgeReducer = (state = {}, action) => {
//   switch (action.type) {

//     default:
//       return state
//   }
// }
// export const getEdgeReducer = (state = {}, action) => {
//   switch (action.type) {
//     case HAVE_EDGE_REQUEST:
//       return { loading: true }
//     case HAVE_EDGE_SUCCESS:
//       return { loading: false, eddge: action.payload }
//     case HAVE_EDGE_FAIL:
//       return { loading: false, error: action.payload }
//     default:
//       return state
//   }
// }
// export const deleteEdgeReducer = (state = {}, action) => {
//   switch (action.type) {

//     default:
//       return state
//   }
// }
// export const deleteNodeReducer = (state = {}, action) => {
//   switch (action.type) {

//     default:
//       return state
//   }
// }
