import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

export default (initialState = {}) => {
  return createStore(() => {}, initialState, composeWithDevTools());
};
