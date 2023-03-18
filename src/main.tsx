import React from 'react'
import ReactDOM from 'react-dom/client'
import {AppComponent} from 'src/app-component'
import 'src/index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AppComponent />
  </React.StrictMode>,
)
