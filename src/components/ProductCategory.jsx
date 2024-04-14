import Form from './Form/Form'

export default function ProductCategory({ uuid, category, setCategory, onCreate, onRemove }) {
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
          value: category.name,
          readOnly,
          onChange: e => setCategory({ name: e.target.value }),
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
