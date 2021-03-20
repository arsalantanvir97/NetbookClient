import axios from 'axios'
import {
  GET_NODE_FAIL,
  GET_NODE_REQUEST,
  GET_NODE_SUCCESS,
  HAVE_NODE_FAIL,
  SEARCH_NODE_OR,
  HAVE_NODE_SUCCESS,
  SEARCH_EDGE_OR,
  HAVE_NODE_REQUEST,
  GET_EDGE_FAIL,
  SEARCH_EDGE_SUCCESS,
  GET_EDGE_REQUEST,
  GET_EDGE_SUCCESSES,
  SEARCH_NODE_AND,
  SEARCH_NODE_EDGE,
  GET_EDGE_SUCCESS,
  CLEAR_EDGE,
  HAVE_NODE_SUCCESESS,
  CLEAR_NODE,
  HAVE_EDGE_FAIL,
  HAVE_EDGE_REQUEST,
  HAVE_EDGE_SUCCESS,
  GET_AIQUERIES_REQUEST,
  GET_AIQUERIES_SUCCESS,
  GET_AIQUERIES_FAIL,
  GET_NODE_SUCCESSES,
  SEARCH_NODE_SUCCESS,
  UPDATE_EDGE_SUCCESS,
  SEARCH_EDGE_AND,
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

export const NodeAdd = (nodeid, id, type, tags, attributes, color) => async (
  dispatch
) => {
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
      'https://netbook-server.herokuapp.com/nodes',
      { nodeid, id, type, tags, attributes, color },
      config
    )

    dispatch({
      type: GET_NODE_SUCCESS,
      payload: data,
    })
    localStorage.setItem('nodehave', JSON.stringify(data))
  } catch (error) {
    console.log('error', error)
    dispatch({
      type: GET_NODE_FAIL,
      payload: error,
    })
  }
}

export const NodeAdded = (node) => async (dispatch) => {
  console.log('nodesaction', node)

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
      'https://netbook-server.herokuapp.com/nodes/many',
      node,
      config
    )
    console.log('dataofnodes', data)
    dispatch({
      type: GET_NODE_SUCCESSES,
      payload: data,
    })
    localStorage.setItem('nodehave', JSON.stringify(data))
  } catch (error) {
    console.log('error', error)
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
    console.log('dataaa', data)
    const links = []

    if (data.links?.length > 0) {
      data.links.map((link) => {
        links.push({
          edgeid: link.edgeid,
          tags: link.tags,
          source: link.source.id,
          target: link.target.id,
          _id: link._id,
        })
      })
    }

    dispatch({
      type: HAVE_NODE_SUCCESS,
      payload: { ...data, links },
    })
    localStorage.setItem('nodehave', JSON.stringify({ ...data, links }))
  } catch (error) {
    dispatch({
      type: HAVE_NODE_FAIL,
      payload: error,
    })
  }
}
export const NodeEdgefetch = (nodes, newedge) => async (dispatch) => {
  console.log("nodes and newedge", nodes, newedge)

  dispatch({
    type: HAVE_NODE_REQUEST,
  })
  // console.log('actionpayload12', nodes, newedge)
  const links = []

  if (newedge?.length > 0) {
    newedge.map((link) => {
      links.push({
        edgeid: link.edgeid,
        tags: link.tags,
        source: link.source.id,
        target: link.target.id,
        _id: link._id,
      })
    })
  }
  console.log('newedge', newedge, links)
  dispatch({
    type: HAVE_NODE_SUCCESESS,
    payload: { nodes, links },
  })
  localStorage.setItem('nodehave', JSON.stringify({ nodes, links }))


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

    dispatch({
      type: GET_EDGE_SUCCESS,
      payload: {
        edgeid: data.edgeid,
        tags: data.tags,
        source: data.source.id,
        target: data.target.id,
        _id: data._id,
      },
    })
    localStorage.setItem(
      'edgeadded',
      JSON.stringify({
        edgeid: data.edgeid,
        tags: data.tags,
        source: data.source.id,
        target: data.target.id,
        _id: data._id,
      })
    )
  } catch (error) {
    dispatch({
      type: GET_EDGE_FAIL,
      payload: error,
    })
  }
}
export const EdgeAdded = (edge) => async (dispatch) => {
  console.log('edgesaction', edge)
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
      'http://localhost:5000/edges/many',
      // 'https://netbook-server.herokuapp.com/edges/many',
      [...edge],
      config
    )
    console.log('dataofedges', data)
    dispatch({
      type: GET_EDGE_SUCCESSES,
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

    console.log('added data', data)

    dispatch({
      type: UPDATE_EDGE_SUCCESS,
      payload: {
        edgeid: data.edgeid,
        tags: data.tags,
        source: data.source.id,
        target: data.target.id,
        _id: data._id,
      },
    })
  } catch (error) {
    dispatch({
      type: UPDATE_EDGE_FAIL,
      payload: error,
    })
  }
}

export const NodeUpdate = (_id, nodeid, id, type, tags, attributes) => async (
  dispatch,
  getState
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

    const [oldNode] = getState().getNode.nodde.nodes.filter(
      (node) => node._id == _id
    )

    let updatedLinks = getState().getNode.nodde.links

    if (id !== oldNode.id) {
      for (let i = 0; i < updatedLinks.length; i++) {
        if (updatedLinks[i].target == oldNode.id) {
          updatedLinks[i].target = data.id
        }
        if (updatedLinks[i].source == oldNode.id) {
          updatedLinks[i].source = data.id
        }
      }
    }

    dispatch({
      type: UPDATE_NODE_SUCCESS,
      payload: data,
    })
    localStorage.setItem('nodehave', JSON.stringify(data))
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

    const { data } = await axios.delete(
      `https://netbook-server.herokuapp.com/nodes/${id}`
    )

    dispatch({
      type: REMOVE_NODE_SUCCESS,
      payload: id,
    })
    localStorage.removeItem('nodehave', JSON.stringify(data))
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
      payload: id,
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
export const Searchnode = (text, checked) => async (dispatch) => {
  try {
    dispatch({
      type: SEARCH_NODE_SUCCESS,
      payload: { text: text, checked: checked },
    })
  } catch (error) {
    console.log('error', error)
  }
}
export const Searchnodeedge = (text = '', texts = '', checked) => async (
  dispatch
) => {
  try {
    dispatch({
      type: SEARCH_NODE_EDGE,
      payload: { text: text, texts: texts, checked: checked },
    })
    console.log('heeeel')
  } catch (error) {
    console.log('error', error)
  }
}

export const Searchedge = (text, checked) => async (dispatch) => {
  try {
    dispatch({
      type: SEARCH_EDGE_SUCCESS,
      payload: { text: text, checked: checked },
    })
    console.log('payload', text)
  } catch (error) {
    console.log('error', error)
  }
}
export const Searchedgeand = (edgeand1 = '', edgeand2 = '', checked) => async (
  dispatch
) => {
  try {
    dispatch({
      type: SEARCH_EDGE_AND,
      payload: {
        edgeand1: edgeand1,
        edgeand2: edgeand2,
        checked: checked,
      },
    })
    console.log('payloaddd', edgeand1, edgeand2)
  } catch (error) {
    console.log('error', error)
  }
}
export const Searchedgeor = (edgeor1 = '', edgeor2 = '', checked) => async (
  dispatch
) => {
  try {
    dispatch({
      type: SEARCH_EDGE_OR,
      payload: {
        edgeor1: edgeor1,
        edgeor2: edgeor2,
        checked: checked,
      },
    })
    console.log('payloaddd', edgeor1, edgeor2)
  } catch (error) {
    console.log('error', error)
  }
}
export const Searchnodeor = (nodeor1 = '', nodeor2 = '', checked) => async (
  dispatch
) => {
  try {
    dispatch({
      type: SEARCH_NODE_OR,
      payload: {
        nodeor1: nodeor1,
        nodeor2: nodeor2,
        checked: checked,
      },
    })
    console.log('payloaddd', nodeor1, nodeor2)
  } catch (error) {
    console.log('error', error)
  }
}
export const Searchnodeand = (nodeand1 = '', nodeand2 = '', checked) => async (
  dispatch
) => {
  try {
    dispatch({
      type: SEARCH_NODE_AND,
      payload: {
        nodeand1: nodeand1,
        nodeand2: nodeand2,
        checked: checked,
      },
    })
    console.log('payloaddd', nodeand1, nodeand2)
  } catch (error) {
    console.log('error', error)
  }
}

export const Clearnode = () => async (dispatch) => {
  dispatch({
    type: CLEAR_NODE,
  })
}
export const Clearedge = () => async (dispatch) => {
  dispatch({
    type: CLEAR_EDGE,
  })
}
