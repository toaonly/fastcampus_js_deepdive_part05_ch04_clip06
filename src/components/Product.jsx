import Form from './Form/Form'

export default function Product({ uuid, product, setProduct, categories, onCreate, onRemove }) {
  const onSubmit = () => {
    if (uuid) return

    onCreate()
  }
  const readOnly = uuid ? true : false

  return (
    <Form
      onSubmit={onSubmit}
      fields={[
        {
          name: 'name',
          value: product.name,
          readOnly,
          onChange: e => setProduct(prod => ({ ...prod, name: e.target.value })),
        },
        {
          name: 'description',
          value: product.description,
          readOnly,
          onChange: e => setProduct(prod => ({ ...prod, description: e.target.value })),
        },
        {
          name: 'size',
          value: product.size,
          readOnly,
          onChange: e => setProduct(prod => ({ ...prod, size: e.target.value })),
        },
        {
          name: 'color',
          value: product.color,
          readOnly,
          onChange: e => setProduct(prod => ({ ...prod, color: e.target.value })),
        },
        {
          type: 'select',
          name: 'category',
          value: product.category,
          options: categories.map(cate => ({ value: cate.id, text: cate.name })),
          readOnly,
          onChange: e => setProduct(prod => ({ ...prod, category: e.target.value })),
        },
      ]}
      submitButtonOptions={{
        hidden: uuid ? true : false,
        text: !uuid ? '추가' : '',
      }}
      renderButtons={() => {
        return (
          uuid && (
            <button type="button" className="bg-red-500 hover:bg-red-600 active:bg-red-400" onClick={onRemove}>
              삭제
            </button>
          )
        )
      }}
    />
  )
}
