import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.tsx'
import store from './app/store.ts'
import './index.css'
import Home from './pages/Home.tsx'
import Product from './pages/Product.tsx'



const router = createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children : [
      {
        path: "/",
        element : 
        <div>
          <Home />


        </div>

      },
    ]
  },
  {
    path:"/product/:id",
    element : <Product/>
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>

      <RouterProvider router={router}/>

    <App />
    </Provider>
  </React.StrictMode>,
)
