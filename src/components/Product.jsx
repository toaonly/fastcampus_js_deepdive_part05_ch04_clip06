export default function Product({ uuid, product, setProduct, categories, onCreate, onRemove }) {
  const onSubmit = e => {
    e.preventDefault()

    if (uuid) return

    onCreate()
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="product-name">Name</label>
          <input
            id="product-name"
            data-testid="name"
            type="text"
            value={product.name}
            onChange={e => setProduct(prod => ({ ...prod, name: e.target.value }))}
            readOnly={uuid ? true : false}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="product-description">Description</label>
          <input
            id="product-description"
            data-testid="description"
            type="text"
            value={product.description}
            onChange={e => setProduct(prod => ({ ...prod, description: e.target.value }))}
            readOnly={uuid ? true : false}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="product-color">color</label>
          <input
            id="product-color"
            data-testid="color"
            type="text"
            value={product.color}
            onChange={e => setProduct(prod => ({ ...prod, color: e.target.value }))}
            readOnly={uuid ? true : false}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="product-size">size</label>
          <input
            id="product-size"
            data-testid="size"
            type="text"
            value={product.size}
            onChange={e => setProduct(prod => ({ ...prod, size: e.target.value }))}
            readOnly={uuid ? true : false}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="product-category">category</label>
          <select
            id="product-category"
            data-testid="category"
            value={product.category}
            disabled={uuid ? true : false}
            onChange={e => setProduct(prod => ({ ...prod, category: e.target.value }))}
          >
            <option value="">선택하세요</option>
            {categories.map(cate => (
              <option key={cate.id} value={cate.id}>
                {cate.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-end gap-2">
          {!uuid && <button>추가</button>}
          {uuid && (
            <button type="button" className="bg-red-500 hover:bg-red-600 active:bg-red-400" onClick={onRemove}>
              삭제
            </button>
          )}
        </div>
      </div>
    </form>
  )
}
