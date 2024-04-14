import { useEffect, useState } from 'react'
import { useNavigate, useOutletContext, useParams } from 'react-router-dom'
import api from '../api'
import Product from '../components/Product'

const INIT_PRODUCT = {
  name: '',
  description: '',
  size: '',
  color: '',
  category: '',
}

export default function ProductPage() {
  const outletContext = useOutletContext()
  const { uuid } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(INIT_PRODUCT)
  const [categories, setCategories] = useState([])
  const onCreate = () => {
    api
      .createProduct(product)
      .then(res => {
        navigate(`./${res.id}`, { replace: true })
      })
      .finally(outletContext.refresh)
  }
  const onRemove = () => {
    api
      .removeProduct({ uuid })
      .then(() => {
        navigate(`/products`, { replace: true })
      })
      .finally(outletContext.refresh)
  }

  useEffect(() => {
    api.getProductCategories().then(setCategories)
    uuid ? api.getProduct({ uuid }).then(setProduct) : setProduct(INIT_PRODUCT)
  }, [uuid])

  return (
    <Product
      uuid={uuid}
      product={product}
      setProduct={setProduct}
      categories={categories}
      onCreate={onCreate}
      onRemove={onRemove}
    />
  )
}
