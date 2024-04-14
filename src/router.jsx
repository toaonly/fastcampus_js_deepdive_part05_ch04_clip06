import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Main from './pages/Main'
import ProductCategoriesPage from './pages/ProductCategoriesPage'
import ProductsPage from './pages/ProductsPage'
import ProductCategoryPage from './pages/ProductCategoryPage'
import ProductPage from './pages/ProductPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    children: [
      {
        path: 'product-categories',
        element: <ProductCategoriesPage />,
        children: [
          {
            path: '',
            element: <ProductCategoryPage />,
          },
          {
            path: ':uuid',
            element: <ProductCategoryPage />,
          },
        ],
      },
      {
        path: 'products',
        element: <ProductsPage />,
        children: [
          {
            path: '',
            element: <ProductPage />,
          },
          {
            path: ':uuid',
            element: <ProductPage />,
          },
        ],
      },
    ],
  },
])

export default router
