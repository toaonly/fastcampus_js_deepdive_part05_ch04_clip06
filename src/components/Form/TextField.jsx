import { v4 as uuid } from 'uuid'
import BaseField from './BaseField'

export default function TextField({ name, label, value, type, readOnly, testid, onChange }) {
  const id = uuid()

  return (
    <BaseField name={name} label={label ?? name} htmlFor={id}>
      <input
        id={id}
        data-testid={testid ?? name}
        type={type ?? 'text'}
        value={value}
        readOnly={readOnly}
        onChange={onChange}
      />
    </BaseField>
  )
}
