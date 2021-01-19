import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { getOauthReducer } from './reducers/oauthReducer'
import { putNodeReducer, getNodeReducer } from './reducers/nodeReducer'
const reducer = combineReducers({
  getOauth: getOauthReducer,
  putNode: putNodeReducer,
  getNode: getNodeReducer,
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
const initialState = {
  getOauth: { oauth: Oauthofuser },
  putNode: { node: Createanode },
  getNode: {
    nodde: Haveanode,
  },
}
const middleware = [thunk]
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)
export default store
