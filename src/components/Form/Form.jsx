import SelectField from './SelectField'
import TextField from './TextField'

export default function Form({ onSubmit, fields, submitButtonOptions, renderButtons }) {
  return (
    <form
      onSubmit={e => {
        e.preventDefault()

        onSubmit(e)
      }}
    >
      <div className="flex flex-col gap-4">
        {fields.map(field => {
          const Field = field.type === 'select' ? SelectField : TextField

          return <Field key={field.name} {...field} />
        })}

        <div className="flex justify-end gap-2">
          {!submitButtonOptions.hidden && <button>{submitButtonOptions.text}</button>}
          {renderButtons?.()}
        </div>
      </div>
    </form>
  )
}
