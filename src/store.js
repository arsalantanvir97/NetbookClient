import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { getOauthReducer } from './reducers/oauthReducer'
import {
  putNodeReducer,
  getNodeReducer,
  getEdgeReducer,
  putEdgeReducer,
} from './reducers/nodeReducer'
const reducer = combineReducers({
  getOauth: getOauthReducer,
  putNode: putNodeReducer,
  getNode: getNodeReducer,
  getEdge: getEdgeReducer,
  putEdge: putEdgeReducer,
})
const Oauthofuser = localStorage.getItem('useroauth')
  ? JSON.parse(localStorage.getItem('useroauth'))
  : null
const Createanode = localStorage.getItem('nodeadded')
  ? JSON.parse(localStorage.getItem('nodeadded'))
  : null
const Haveanode = localStorage.getItem('nodehave')
  ? JSON.parse(localStorage.getItem('nodehave'))
  : null
const Createaedge = localStorage.getItem('edgeadded')
  ? JSON.parse(localStorage.getItem('edgeadded'))
  : null
const Haveaedge = localStorage.getItem('edgehave')
  ? JSON.parse(localStorage.getItem('edgehave'))
  : null
const initialState = {
  getOauth: { oauth: Oauthofuser },
  putNode: { node: Createanode },
  getNode: {
    nodde: Haveanode,
  },
  putEdge: { edge: Createaedge },
  getEdge: { eddge: Haveaedge },
}
const middleware = [thunk]
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)
export default store
