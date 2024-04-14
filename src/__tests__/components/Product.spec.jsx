import { fireEvent, render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import Product from '../../components/Product'
import db from '../../../db/db.json'
import { useState } from 'react'

describe('components/Product 컴포넌트 테스트', () => {
  const testProduct = db.products[0]
  const testProductCategories = db['product-categories']

  describe('보기 화면 테스트', () => {
    const ProductWrapper = ({ onCreate, onRemove }) => {
      const [product, setProduct] = useState(testProduct)

      return (
        <Product
          uuid={product.id}
          product={product}
          setProduct={setProduct}
          categories={testProductCategories}
          onCreate={onCreate}
          onRemove={onRemove}
        />
      )
    }

    it('렌더링 테스트', () => {
      const result = render(<ProductWrapper />)

      expect(result.getByTestId('name').value).toBe(testProduct.name)
      expect(result.getByTestId('description').value).toBe(testProduct.description)
      expect(result.getByTestId('color').value).toBe(testProduct.color)
      expect(result.getByTestId('size').value).toBe(`${testProduct.size}`)
      expect(result.getByTestId('category').value).toBe(testProduct.category)
    })

    it('삭제 버튼을 클릭하면 onRemove 가 호출 되어야 한다', () => {
      const onRemove = vi.fn()
      const result = render(<ProductWrapper onRemove={onRemove} />)
      const btnDelete = result.getByText('삭제')

      fireEvent.click(btnDelete)

      expect(onRemove).toHaveBeenCalledTimes(1)
    })
  })

  describe('생성 화면 테스트', () => {
    const ProductWrapper = ({ onCreate, onRemove }) => {
      const [product, setProduct] = useState({})

      return (
        <Product
          product={product}
          setProduct={setProduct}
          categories={testProductCategories}
          onCreate={onCreate}
          onRemove={onRemove}
        />
      )
    }

    it('렌더링 테스트', () => {
      const result = render(<ProductWrapper />)

      expect(result.getByTestId('name').value).toBe('')
      expect(result.getByTestId('description').value).toBe('')
      expect(result.getByTestId('color').value).toBe('')
      expect(result.getByTestId('size').value).toBe('')
      expect(result.getByTestId('category').value).toBe('선택하세요')
    })

    it('추가 버튼을 클릭하면 onCreate 가 호출 되어야 한다', () => {
      const onCreate = vi.fn()
      const result = render(<ProductWrapper onCreate={onCreate} />)
      const btnCreate = result.getByText('추가')

      fireEvent.click(btnCreate)

      expect(onCreate).toHaveBeenCalledTimes(1)
    })
  })
})
