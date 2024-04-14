import { useEffect, useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import api from '../api'
import Products from '../components/Products'

export default function ProductsPage() {
  const [products, setProducts] = useState([])
  const refresh = () => api.getProducts().then(setProducts)

  useEffect(() => {
    api.getProducts().then(setProducts)
  }, [])

  return (
    <div className="flex items-start w-full h-screen">
      <Products products={products} />
      <div className="p-4 flex-1">
        <Outlet context={{ refresh }} />
      </div>
    </div>
  )
}
