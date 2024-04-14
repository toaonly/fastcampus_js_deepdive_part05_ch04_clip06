import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import api from '../api'
import ProductCategories from '../components/ProductCategories'

export default function ProductCategoriesPage() {
  const [categories, setCategories] = useState([])
  const refresh = () => api.getProductCategories().then(setCategories)

  useEffect(() => {
    api.getProductCategories().then(setCategories)
  }, [])

  return (
    <div className="flex items-start w-full h-screen">
      <ProductCategories categories={categories} />
      <div className="p-4 flex-1">
        <Outlet context={{ refresh }} />
      </div>
    </div>
  )
}
