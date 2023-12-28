import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.tsx'
import store from './app/store.ts'
import './index.css'
import Home from './pages/Home.tsx'
import Product from './pages/Product.tsx'
// import Pay from './pages/pay.tsx'
// import Success from './pages/success.tsx'
import Login from './pages/Login.tsx'
import SignupForm from './pages/SignupForm';
import { QueryClient, QueryClientProvider } from 'react-query'
import RequireAuth from './components/RequireAuth.tsx'


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
