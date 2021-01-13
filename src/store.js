import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { getOauthReducer } from './reducers/oauthReducer'

const reducer = combineReducers({
  getOauth: getOauthReducer,
})
const Oauthofuser = localStorage.getItem('useroauth')
  ? JSON.parse(localStorage.getItem('useroauth'))
  : null
const initialState = {
  getOauth: { oauth: Oauthofuser },
}
const middleware = [thunk]
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)
export default store
