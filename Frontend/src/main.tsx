import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import store from "./app/store.ts";
import "./index.css";
import Home from "./pages/Home.tsx";
import Product from "./pages/Product.tsx";
import Login from "./pages/Login.tsx";
import SignupForm from "./pages/SignupForm";
import { QueryClient, QueryClientProvider } from "react-query";
import RequireAuth from "./components/RequireAuth.tsx";
import CreateProduct from "./pages/CreateProduct.tsx";
import DashBoard from "./pages/DashBoard.tsx";

import "swiper/css";
import "swiper/css/pagination";
import ProductTable from "./components/DashBoard/pages/ProductTable.tsx";
import UserTable from "./components/DashBoard/pages/UserTable.tsx";
import Items from "./pages/Items.tsx";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/Login",
    element: <Login />,
  },
  {
    path: "/SignupForm",
    element: <SignupForm />,
  },
  {
    path: "/",
    element: (
      <RequireAuth>
        {" "}
        <App />
      </RequireAuth>
    ),
    children: [
      {
        path: "/",
        element: (
          <div>
            <Home />
          </div>
        ),
      },
    ],
  },
  {
    path: "/Items",
    element: <Items />,
  },
  {
    path: "/product/:id",
    element: <Product />,
  },
  {
    path: "/CreateProduct",
    element: <CreateProduct />,
  },
  {
    path: "/DashBoard",
    element: <DashBoard />,
  },
  {
    path: "/ProductTable",
    element: <ProductTable />,
  },
  {
    path: "/UserTable",
    element: <UserTable />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <App />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);
