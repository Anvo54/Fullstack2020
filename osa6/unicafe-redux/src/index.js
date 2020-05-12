import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {

  const good = () => {
    store.dispatch({
      type: 'GOOD'
    })
  }
  const bad = () => {
    store.dispatch({
      type: 'BAD'
    })
  }
  const ok = () => {
    store.dispatch({
      type: 'OK'
    })
  }
  const zero = () => {
    store.dispatch({
      type: 'ZERO'
    })
  }

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={good}>good</button> 
      <button onClick={ok}>neutral</button> 
      <button onClick={bad}>bad</button>
      <button onClick={zero}>zero</button>
      <h2>statistics</h2>
      <table>
        <tbody>
        <tr>
          <td>good </td>
          <td>{store.getState().good}</td>
        </tr>
        <tr>
          <td>neutral </td>
          <td>{store.getState().ok}</td>
        </tr>
        <tr>
          <td>bad </td>
          <td>{store.getState().bad}</td>
        </tr>
        <tr>
          <td>all </td>
          <td>{store.getState().all}</td>
        </tr>
        <tr>
          <td>average </td>
          <td>{store.getState().all !== 0 ? (store.getState().good +(store.getState().bad * -1)) + store.getState().ok / store.getState().all : ''}</td>
        </tr>
        <tr>
          <td>positive </td>
          <td>{store.getState().all !== 0 ? (store.getState().good / store.getState().all) * 100 : ''}</td>
        </tr>
        </tbody>
      </table>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)
