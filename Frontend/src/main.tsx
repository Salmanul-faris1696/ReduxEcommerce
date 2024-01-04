import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.tsx'
import store from './app/store.ts'
import './index.css'
import Home from './pages/Home.tsx'
import Product from './pages/Product.tsx'
import Login from './pages/Login.tsx'
import SignupForm from './pages/SignupForm';
import { QueryClient, QueryClientProvider } from 'react-query'
import RequireAuth from './components/RequireAuth.tsx'
import CreateProduct from './pages/CreateProduct.tsx'
import DashBoard from './pages/DashBoard.tsx'

import 'swiper/css';
import 'swiper/css/pagination';
import ProductTable from './components/DashBoard/pages/ProductTable.tsx'




const queryClient = new QueryClient



const router = createBrowserRouter([
  {
    path:"/Login",
    element:<Login/>
  },
  {
    path:"/SignupForm",
    element:<SignupForm/>
  },
  {
    path:"/",
    element: <RequireAuth> <App/></RequireAuth> ,
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
  },
  {
    path:"/CreateProduct",
    element:<CreateProduct/>
  },{
    path:"/DashBoard",
    element:<DashBoard/>
    
  },{
    path:"/ProductTable",
    element:<ProductTable/>
  }

])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient} >
      <Provider store={store}>
        <RouterProvider router={router}/>
          <App />
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>,
)
