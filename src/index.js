import React from 'react'
import ReactDOM from 'react-dom/client'
import "./assets/sass/style.sass"
import App from './App'
import { store } from './redux/store'
import { persistStore } from "redux-persist"
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"

const persistor = persistStore(store)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<BrowserRouter >
    <Provider store={store}>
      <PersistGate
	      loading={null}
	      persistor={persistor}
      >
          <App />
      </PersistGate >
    </Provider >
  </BrowserRouter >,
)
