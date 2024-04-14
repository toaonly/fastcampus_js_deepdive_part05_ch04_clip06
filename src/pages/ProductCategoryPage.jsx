import { useEffect, useState } from 'react'
import { useNavigate, useOutletContext, useParams } from 'react-router-dom'
import api from '../api'
import ProductCategory from '../components/ProductCategory'

const INIT_CATEGORY = {
  name: '',
}

export default function ProductCategoryPage() {
  const outletContext = useOutletContext()
  const { uuid } = useParams()
  const navigate = useNavigate()
  const [category, setCategory] = useState(INIT_CATEGORY)
  const onCreate = () => {
    api
      .createProductCategory(category)
      .then(res => {
        navigate(`./${res.id}`, { replace: true })
      })
      .finally(outletContext.refresh)
  }
  const onRemove = () => {
    api
      .removeProductCategory({ uuid })
      .then(() => {
        navigate(`/product-categories`, { replace: true })
      })
      .finally(outletContext.refresh)
  }

  useEffect(() => {
    uuid ? api.getProductCategory({ uuid }).then(setCategory) : setCategory(INIT_CATEGORY)
  }, [uuid])

  return (
    <ProductCategory
      uuid={uuid}
      category={category}
      setCategory={setCategory}
      onCreate={onCreate}
      onRemove={onRemove}
    />
  )
}
