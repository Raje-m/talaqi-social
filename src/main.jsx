import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store } from './redux/store.jsx'
// import { OpenProvider } from './Contexts/OpenProvider.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot( document.getElementById( 'root' ) ).render(

  <StrictMode>
    <Provider store={ store }>
      {/* <OpenProvider> */}
        <BrowserRouter>
          <App />
        </BrowserRouter>
      {/* </OpenProvider> */}
    </Provider>
  </StrictMode>
)
