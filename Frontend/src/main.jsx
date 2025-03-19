import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import {Suspense } from 'react'
import { Provider } from 'react-redux'
import store from './store/index.js';
import { Toaster } from 'react-hot-toast';

// const App=lazy(()=>import('./App.jsx'));
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Provider store={store}>
    <Suspense>
        <App />
        <Toaster
          toastOptions={{
            position:'top-right',
            style:{
              backgroud:'#283046',
              color:'black'
            }
          }}
        />
    </Suspense>
  </Provider>
  </BrowserRouter>,
)
