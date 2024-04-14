export default function ProductCategory({ uuid, category, setCategory, onCreate, onRemove }) {
  const onSubmit = e => {
    e.preventDefault()

    if (uuid) return

    onCreate()
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="category-name">Name</label>
          <input
            id="category-name"
            data-testid="name"
            type="text"
            value={category.name}
            onChange={e => setCategory({ name: e.target.value })}
            readOnly={uuid ? true : false}
          />
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
