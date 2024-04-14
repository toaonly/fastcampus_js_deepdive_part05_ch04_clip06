import { fireEvent, render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import ProductCategory from '../../components/ProductCategory'
import db from '../../../db/db.json'
import { useState } from 'react'

describe('components/ProductCategory 컴포넌트 테스트', () => {
  const testProductCategory = db['product-categories'][0]

  describe('보기 화면 테스트', () => {
    const ProductCategoryWrapper = ({ onCreate, onRemove }) => {
      const [productCategory, setProductCategory] = useState(testProductCategory)

      return (
        <ProductCategory
          uuid={productCategory.id}
          category={productCategory}
          setCategory={setProductCategory}
          onCreate={onCreate}
          onRemove={onRemove}
        />
      )
    }

    it('렌더링 테스트', () => {
      const result = render(<ProductCategoryWrapper />)

      expect(result.getByTestId('name').value).toBe(testProductCategory.name)
    })

    it('삭제 버튼을 클릭하면 onRemove 가 호출 되어야 한다', () => {
      const onRemove = vi.fn()
      const result = render(<ProductCategoryWrapper onRemove={onRemove} />)
      const btnDelete = result.getByText('삭제')

      fireEvent.click(btnDelete)

      expect(onRemove).toHaveBeenCalledTimes(1)
    })
  })

  describe('생성 화면 테스트', () => {
    const ProductCategoryWrapper = ({ onCreate, onRemove }) => {
      const [productCategory, setProductCategory] = useState({})

      return (
        <ProductCategory
          category={productCategory}
          setCategory={setProductCategory}
          onCreate={onCreate}
          onRemove={onRemove}
        />
      )
    }

    it('렌더링 테스트', () => {
      const result = render(<ProductCategoryWrapper />)

      expect(result.getByTestId('name').value).toBe('')
    })

    it('추가 버튼을 클릭하면 onCreate 가 호출 되어야 한다', () => {
      const onCreate = vi.fn()
      const result = render(<ProductCategoryWrapper onCreate={onCreate} />)
      const btnCreate = result.getByText('추가')

      fireEvent.click(btnCreate)

      expect(onCreate).toHaveBeenCalledTimes(1)
    })
  })
})
