import { indigo } from '@material-ui/core/colors'
import {
  GET_NODE_FAIL,
  GET_NODE_REQUEST,
  GET_NODE_SUCCESS,
  GET_NODE_SUCCESSES,
  GET_EDGE_SUCCESSES,
  HAVE_NODE_REQUEST,
  SEARCH_NODE_OR,
  CLEAR_EDGE,
  HAVE_NODE_SUCCESS,
  HAVE_NODE_FAIL,
  SEARCH_NODE_EDGE,
  GET_EDGE_FAIL,
  GET_EDGE_REQUEST,
  SEARCH_EDGE_OR,
  CLEAR_NODE,
  GET_EDGE_SUCCESS,
  HAVE_EDGE_FAIL,
  SEARCH_EDGE_REQUEST,
  SEARCH_EDGE_SUCCESS,
  SEARCH_NODE_FAIL,
  SEARCH_NODE_REQUEST,
  SEARCH_EDGE_AND,
  SEARCH_NODE_AND,
  SEARCH_NODE_SUCCESS,
  SEARCH_EDGE_FAIL,
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
  GET_AIQUERIES_FAIL,
  GET_AIQUERIES_REQUEST,
  GET_AIQUERIES_SUCCESS,
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
  let checkedEdgeData
  let checkedNodeData
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
          nodes: [...state.nodde.nodes, action.payload],
        },
        loading: false,
      }
      case GET_NODE_SUCCESSES:
        return {
          ...state,
          nodde: {
            ...state.nodde,
            nodes: [...state.nodde.nodes, ...action.payload],
          },
          loading: false,
        }

    case HAVE_NODE_FAIL:
      return { loading: false, error: action.payload }

    case UPDATE_NODE_REQUEST:
      return { ...state, loading: true }

    case UPDATE_NODE_SUCCESS:
      const indexNode = state.nodde.nodes.findIndex(
        (node) => node._id === action.payload._id
      )
      let newArrayNode = state.nodde.nodes

      newArrayNode[indexNode] = action.payload
      return {
        ...state,
        loading: false,
        nodde: { ...state.nodde, nodes: newArrayNode },
      }

    case UPDATE_NODE_FAIL:
      console.log('getting in update node failed')
      return { loading: false, error: action.payload }

    case REMOVE_NODE_REQUEST:
      return { ...state, loading: true }

    case SEARCH_NODE_SUCCESS:
      let checkededge1
      let checkednode1
      // console.log('filtered node', state.filterednode)
      const old = state.filterednode
        ? state.filterednode
        : state.nodde.nodes
        ? state.nodde.nodes
        : []
      // const old = state.nodde.nodes
      // console.log('filter node', filtered)
      const filtered = old.filter((xd) => {
        const regex = new RegExp(`${action.payload.text}`, 'gi')
        const abc = xd.id.match(regex)
        if (abc) {
          return abc
        } else {
          return null
        }
      })
      console.log('actionpayloadnode', action.payload)
      const filtersedge = state.nodde.links.filter((xi, index) => {
        let flag1 = false
        let flag2 = false
        let flag = false
        for (let item of filtered) {
          if (xi.target === item.id) {
            flag1 = true
            // console.log('abc', xi.target, item.id)
          }
          if (xi.source === item.id) {
            flag2 = true
            // console.log('bcs', xi.source, item.id)
          }
          if (flag1 === true && flag2 === true) flag = true
        }
        return flag
      })
      console.log('filtered -- >', filtersedge)
      if (action.payload.checked === true) {
        let checkedFilter = neighbourFilter(
          state.nodde.nodes,
          state.nodde.links,
          filtered
        )
        checkedEdgeData = checkedFilter.edgechecked
        checkedNodeData = checkedFilter.nodechecked
        // checkededge1 = state.node.links.filter((si) => {
        //   let flag1 = false
        //   let flag2 = false
        //   let flag = false
        //   for (let item of filtered) {
        //     if (xi.target === item.id) {
        //       flag1 = true
        //       // console.log('abc', xi.target, item.id)
        //     }
        //     if (xi.source === item.id) {
        //       flag2 = true
        //       // console.log('bcs', xi.source, item.id)
        //     }
        //     if (flag1 === true && flag2 === true) flag = true
        //   }
        //   return flag
        // })
        // console.log('checkededge', checkededge1)
        // checkednode1 = state.nodde.nodes.filter((xi, index) => {
        //   let flag = false
        //   for (let item of checkededge1) {
        //     if (item.source === xi.id || item.target === xi.id) {
        //       flag = true
        //     }
        //   }
        //   return flag
        // })
        // console.log('checkednode1', checkednode1)
      }
      return {
        ...state,
        filterednode: action.payload.checked ? checkedNodeData : filtered,
        filterededge: action.payload.checked ? checkedEdgeData : filtersedge,
      }

    case SEARCH_EDGE_SUCCESS:
      console.log('filter edge', state.filterededge)
      let filter = state.filterededge
        ? state.filterededge
        : state.nodde.links
        ? state.nodde.links
        : []
      console.log('filter object', filter)
      filter = filter.filter((xxd, ind) => {
        const regex = new RegExp(`${action.payload.text}`, 'gi')
        const abc = xxd.tags.map((s) => {
          return s.match(regex)
        })
        console.log('abc', abc)
        return !abc.every((element) => element === null)
      })
      console.log('filtered result', filter)
      const filtersnode = state.nodde.nodes.filter((xi, index) => {
        let flag = false
        for (let item of filter) {
          if (item.source === xi.id || item.target === xi.id) {
            flag = true
          }
        }
        return flag
      })
      console.log('filternode -- >', filtersnode)
      if (action.payload.checked === true) {
        let checkedFilter = neighbourFilter(
          state.nodde.nodes,
          state.nodde.links,
          filtersnode
        )
        checkedEdgeData = checkedFilter.edgechecked
        checkedNodeData = checkedFilter.nodechecked
      }
      return {
        ...state,
        filterededge: action.payload.checked ? checkedEdgeData : filter,
        filterednode: action.payload.checked ? checkedNodeData : filtersnode,
      }
    case SEARCH_NODE_AND:
      // console.log('filtered node', state.filterednode)
      let filternodeee = state.filterednode
        ? state.filterednode
        : state.nodde.nodes
        ? state.nodde.nodes
        : []

      // const old = state.nodde.nodes
      // console.log('filter node', filtered)
      if (action.payload.nodeand1 !== '') {
        filternodeee = filternodeee.filter((xd) => {
          const regex = new RegExp(`${action.payload.nodeand1}`, 'gi')
          const abc = xd.id.match(regex)
          if (abc) {
            return abc
          } else {
            return null
          }
        })
      }
      if (action.payload.nodeand2 !== '') {
        filternodeee = filternodeee.filter((xd) => {
          const regex = new RegExp(`${action.payload.nodeand2}`, 'gi')
          const abc = xd.id.match(regex)
          if (abc) {
            return abc
          } else {
            return null
          }
        })
      }
      const filtersssedge = state.nodde.links.filter((xi, index) => {
        let flag1 = false
        let flag2 = false
        let flag = false
        for (let item of filternodeee) {
          if (xi.target === item.id) {
            flag1 = true
            // console.log('abc', xi.target, item.id)
          }
          if (xi.source === item.id) {
            flag2 = true
            // console.log('bcs', xi.source, item.id)
          }
          if (flag1 === true && flag2 === true) flag = true
        }
        return flag
      })
      console.log('filtered -- >', filtersssedge)
      if (action.payload.checked === true) {
        let checkedFilter = neighbourFilter(
          state.nodde.nodes,
          state.nodde.links,
          filternodeee
        )
        checkedEdgeData = checkedFilter.edgechecked
        checkedNodeData = checkedFilter.nodechecked
      }
      return {
        ...state,
        filterednode: action.payload.checked ? checkedNodeData : filternodeee,
        filterededge: action.payload.checked ? checkedEdgeData : filtersssedge,
      }

    case SEARCH_EDGE_AND:
      console.log('filter edge', state.filterededge)
      let filterss = state.filterededge
        ? state.filterededge
        : state.nodde.links
        ? state.nodde.links
        : []
      console.log('filter object', filterss)
      if (action.payload.edgeand1 !== '') {
        filterss = filterss.filter((xxd, ind) => {
          const regex = new RegExp(`${action.payload.edgeand1}`, 'gi')
          const abc = xxd.tags.map((s) => {
            return s.match(regex)
          })
          console.log('actionpayloaddd', action.payload)
          console.log('abc', abc)
          return !abc.every((element) => element === null)
        })
        console.log('filtered resultt', filterss)
      }
      if (action.payload.edgeand2 !== '') {
        filterss = filterss.filter((xxd, ind) => {
          const regex = new RegExp(`${action.payload.edgeand2}`, 'gi')
          const abc = xxd.tags.map((s) => {
            return s.match(regex)
          })
          console.log('abc', abc)
          return !abc.every((element) => element === null)
        })
        console.log('actionpayloaddd2', action.payload)
      }
      console.log('filtered result2', filterss)
      const filtersnodee = state.nodde.nodes.filter((xi, index) => {
        let flag = false
        for (let item of filterss) {
          if (item.source === xi.id || item.target === xi.id) {
            flag = true
          }
        }
        return flag
      })
      console.log('filternode -- >', filtersnodee)
      console.log('filteredddd', filterss, filtersnodee)
      if (action.payload.checked === true) {
        let checkedFilter = neighbourFilter(
          state.nodde.nodes,
          state.nodde.links,
          filtersnodee
        )
        checkedEdgeData = checkedFilter.edgechecked
        checkedNodeData = checkedFilter.nodechecked
      }
      return {
        ...state,
        filterededge: action.payload.checked ? checkedEdgeData : filterss,
        filterednode: action.payload.checked ? checkedNodeData : filtersnodee,
      }
    case SEARCH_NODE_OR:
      // console.log('filtered node', state.filterednode)
      let filternodeees = state.filterednode
        ? state.filterednode
        : state.nodde.nodes
        ? state.nodde.nodes
        : []
      let nodesorof1 = null
      let nodesorof2 = null
      let ornewnodes = null
      // const old = state.nodde.nodes
      // console.log('filter node', filtered)
      if (action.payload.nodeor1 !== '') {
        nodesorof1 = state.nodde.nodes.filter((xd) => {
          const regex = new RegExp(`${action.payload.nodeor1}`, 'gi')
          const abc = xd.id.match(regex)
          console.log('actionpayload of node or', action.payload)
          if (abc) {
            return abc
          } else {
            return null
          }
        })
        console.log('filterd result of edgeor1', nodesorof1)
      }

      if (action.payload.nodeor2 !== '') {
        nodesorof2 = state.nodde.nodes.filter((xd) => {
          const regex = new RegExp(`${action.payload.nodeor2}`, 'gi')
          const abc = xd.id.match(regex)

          console.log('actionpayload of nodeor2', action.payload)
          if (abc) {
            return abc
          } else {
            return null
          }
        })
        console.log('filterd result of edgeor1', nodesorof2)
      }
      if (action.payload.nodeor1 !== '' && action.payload.nodeor2 !== '') {
        ornewnodes = [...nodesorof1, ...nodesorof2]
        console.log('ornewnodes', ornewnodes)
      }
      const filtersssedges = state.nodde.links.filter((xi, index) => {
        let flag1 = false
        let flag2 = false
        let flag = false
        for (let item of ornewnodes) {
          if (xi.target === item.id) {
            flag1 = true
            // console.log('abc', xi.target, item.id)
          }
          if (xi.source === item.id) {
            flag2 = true
            // console.log('bcs', xi.source, item.id)
          }
          if (flag1 === true && flag2 === true) flag = true
        }
        return flag
      })
      console.log(
        'filtered -- >',
        filtersssedges,
        ornewnodes,
        nodesorof1,
        nodesorof2
      )
      if (action.payload.checked === true) {
        let checkedFilter = neighbourFilter(
          state.nodde.nodes,
          state.nodde.links,
          ornewnodes
        )
        checkedEdgeData = checkedFilter.edgechecked
        checkedNodeData = checkedFilter.nodechecked
      }
      return {
        ...state,
        filterednode: action.payload.checked ? checkedNodeData : ornewnodes,
        filterededge: action.payload.checked ? checkedEdgeData : filtersssedges,
      }
    case SEARCH_EDGE_OR:
      console.log('filterss edges', state.filterededge)
      let edgesorof1 = null
      let edgesorof2 = null
      let nodesoforedges = null
      let ornewedges = null
      let filtereds = state.filterededge
        ? state.filterededge
        : state.nodde.links
        ? state.nodde.links
        : []
      console.log('filterss objects', filtereds)
      if (action.payload.edgeor1 !== '') {
        edgesorof1 = state.nodde.links.filter((xxd, ind) => {
          const regex = new RegExp(`${action.payload.edgeor1}`, 'gi')
          const abc = xxd.tags.map((s) => {
            return s.match(regex)
          })
          console.log('actionpayload of edge or', action.payload)
          console.log('abc', abc)
          return !abc.every((element) => element === null)
        })
        console.log('filterd result of edgeor1', edgesorof1)
      }
      if (action.payload.edgeor2 !== '') {
        edgesorof2 = state.nodde.links.filter((xxd, ind) => {
          const regex = new RegExp(`${action.payload.edgeor2}`, 'gi')
          const abc = xxd.tags.map((s) => {
            return s.match(regex)
          })
          console.log('abc', abc)
          return !abc.every((element) => element === null)
        })
        console.log('actionpayloaddd2', action.payload)
      }
      console.log('filtered result2', edgesorof2)
      if (action.payload.edgeor1 !== '' && action.payload.edgeor2 !== '') {
        ornewedges = [...edgesorof1, ...edgesorof2]
        console.log('ornewedges', ornewedges)
      }

      // if (ornewedges !== null && edgesorof1 !== null && edgesorof2 !== null) {
      //   console.log('first')
      //   nodesoforedges = [...ornewedges]
      //   return nodesoforedges
      // }
      // if (ornewedges === null && edgesorof1 === null && edgesorof2 !== null) {
      //   console.log('second')
      //   nodesoforedges = [...edgesorof2]
      //   return nodesoforedges
      // }
      // if (ornewedges === null && edgesorof2 === null && edgesorof1 !== null) {
      //   console.log('third')
      //   nodesoforedges = [...edgesorof1]
      //   return nodesoforedges
      // }
      console.log('ornewedges', ornewedges)
      const filtersnodees = state.nodde.nodes.filter((xi, index) => {
        let flag = false
        for (let item of ornewedges) {
          if (item.source === xi.id || item.target === xi.id) {
            flag = true
          }
        }
        return flag
      })
      console.log('filternode -- >', filtersnodees)
      console.log('filteredddd', ornewedges, edgesorof2, edgesorof1)
      if (action.payload.checked === true) {
        let checkedFilter = neighbourFilter(
          state.nodde.nodes,
          state.nodde.links,
          filtersnodees
        )
        checkedEdgeData = checkedFilter.edgechecked
        checkedNodeData = checkedFilter.nodechecked
      }
      return {
        ...state,
        filterededge: action.payload.checked ? checkedEdgeData : ornewedges,
        filterednode: action.payload.checked ? checkedNodeData : filtersnodees,
      }

    case SEARCH_NODE_EDGE:
      let nodesdata = state.nodde.nodes
      let edgesdata = state.nodde.links
      // console.log('filtered node', state.filterednode)

      // const old = state.nodde.nodes
      // console.log('filter node', filtered)
      if (action.payload.text !== '') {
        console.log('first action')
        const filteredd = state.nodde.nodes.filter((xd) => {
          const regex = new RegExp(`${action.payload.text}`, 'gi')
          const abc = xd.id.match(regex)
          if (abc) {
            return abc
          } else {
            return null
          }
        })
        nodesdata = filteredd
        console.log('actionpayload', action.payload)
        console.log('filteredd', nodesdata)
        const filtersedgee = state.nodde.links.filter((xi, index) => {
          let flag1 = false
          let flag2 = false
          let flag = false
          for (let item of filteredd) {
            if (xi.target === item.id) {
              flag1 = true
              // console.log('abc', xi.target, item.id)
            }
            if (xi.source === item.id) {
              flag2 = true
              // console.log('bcs', xi.source, item.id)
            }
            if (flag1 === true && flag2 === true) flag = true
          }
          return flag
        })
        edgesdata = filtersedgee
        console.log('filtered edge', edgesdata)
      }
      if (action.payload.texts !== '') {
        console.log('second action')
        let filterr = edgesdata
          ? edgesdata
          : state.nodde.links
          ? state.nodde.links
          : []
        console.log('filter object', filterr)
        filterr = filterr.filter((xxd, ind) => {
          const regex = new RegExp(`${action.payload.texts}`, 'gi')
          const abc = xxd.tags.map((s) => {
            return s.match(regex)
          })
          console.log('abc', abc)
          return !abc.every((element) => element === null)
        })
        console.log('filtered result', filterr)
        edgesdata = filterr
        console.log('edgesdata', edgesdata)
        console.log('actionpaaylaod2', action.payload)
        const cde = nodesdata
          ? nodesdata
          : state.nodde.nodes
          ? state.nodde.nodes
          : []
        const filtersnodee = cde.filter((xi, index) => {
          let flag = false
          for (let item of filterr) {
            if (item.source === xi.id || item.target === xi.id) {
              flag = true
            }
          }
          return flag
        })
        console.log('filtered -- >', edgesdata)
        nodesdata = filtersnodee
        console.log('filternode -- >', nodesdata)
      }
      if (action.payload.checked === true) {
        let checkedFilter = neighbourFilter(
          state.nodde.nodes,
          state.nodde.links,
          nodesdata
        )
        checkedEdgeData = checkedFilter.edgechecked
        checkedNodeData = checkedFilter.nodechecked
      }

      return {
        ...state,
        filterednode: action.payload.checked ? checkedNodeData : nodesdata,
        filterededge: action.payload.checked ? checkedEdgeData : edgesdata,
      }

    case CLEAR_NODE:
      return {
        ...state,
        filterednode: null,
      }
    case CLEAR_EDGE:
      return {
        ...state,
        filterededge: null,
      }
    case REMOVE_NODE_SUCCESS:
      console.log('node id', action.payload)
      let updatedNodeArray = state.nodde.nodes.filter(
        (node) => node._id != action.payload
      )
      let deletedNode = state.nodde.nodes.filter(
        (node) => node._id == action.payload
      )
      console.log('state.nodde.links -->', state.nodde.links)
      console.log('deleted node -->', deletedNode)
      let updatedEdges = state.nodde.links.filter(
        (link) =>
          link.source != deletedNode[0].id && link.target != deletedNode[0].id
      )
      console.log(
        'updated edge and node array',
        updatedEdges,
        updatedNodeArray,
        state
      )
      return {
        ...state,
        loading: false,
        nodde: {
          links: updatedEdges,
          nodes: updatedNodeArray,
        },
      }

    case REMOVE_NODE_FAIL:
      return { loading: false, error: action.payload }

    case GET_EDGE_REQUEST:
      return { ...state, loading: true }

    case GET_EDGE_SUCCESS:
      console.log('state.nodde -->', state.nodde)
      console.log('action.payload -->', action.payload)
      return {
        ...state,
        nodde: {
          ...state.nodde,
          links: [...state.nodde.links, action.payload],
        },
        loading: false,
      }
      case GET_EDGE_SUCCESSES:
      console.log('state.nodde -->', state.nodde)
      console.log('action.payload -->', action.payload)
      return {
        ...state,
        nodde: {
          ...state.nodde,
          links: [...state.nodde.links, ...action.payload],
        },
        loading: false,
      }

    case GET_EDGE_FAIL:
      return { loading: false, error: action.payload }

    case UPDATE_EDGE_REQUEST:
      return { ...state, loading: true }

    case UPDATE_EDGE_SUCCESS:
      const indexEdge = state.nodde.links.findIndex(
        (link) => link._id === action.payload._id
      )
      console.log('index edge', indexEdge)
      let newArrayEdge = state.nodde.links
      newArrayEdge[indexEdge] = action.payload
      console.log('new Array -->', newArrayEdge)
      return {
        ...state,
        loading: false,
        nodde: { ...state.nodde, links: newArrayEdge },
      }

    case UPDATE_EDGE_FAIL:
      return { loading: false, error: action.payload }

    case REMOVE_EDGE_REQUEST:
      return { ...state, loading: true }

    case REMOVE_EDGE_SUCCESS:
      let updatedEdgeArray = state.nodde.links.filter(
        (link) => link._id != action.payload
      )
      console.log('updated edge array', updatedEdgeArray)
      return {
        loading: false,
        nodde: { ...state.nodde, links: updatedEdgeArray },
      }

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
const neighbourFilter = (nodesarg, edgesarg, nodesfilter) => {
  let edgechecked
  let nodechecked

  edgechecked = edgesarg.filter((xi) => {
    let flag = false
    for (let item of nodesfilter) {
      if (xi.target === item.id) {
        flag = true
        // console.log('abc', xi.target, item.id)
      }
      if (xi.source === item.id) {
        flag = true
        // console.log('bcs', xi.source, item.id)
      }
    }
    return flag
  })
  console.log('lalalala checkededge', edgechecked)
  nodechecked = nodesarg.filter((xi, index) => {
    let flag = false
    for (let item of edgechecked) {
      if (item.source === xi.id || item.target === xi.id) {
        flag = true
      }
    }
    return flag
  })
  console.log('lalalala checkednode1', nodechecked)
  return { nodechecked, edgechecked }
}
