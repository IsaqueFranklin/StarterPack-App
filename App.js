import { StatusBar } from 'expo-status-bar';
import React from 'react';
import SwitchNavigator from './navigation/LoginNavigator'
import thunkMiddleware from 'redux-thunk';
import reducer from './reducers/index'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'


const middleware = applyMiddleware(thunkMiddleware)
const store = createStore(reducer, middleware)
console.disableYellowBox = true

export default function App() {
  return (
    <Provider store={store}>
      <SwitchNavigator />
    </Provider>
  );
}

