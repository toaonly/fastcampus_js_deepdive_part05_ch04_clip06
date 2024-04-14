import { v4 as uuid } from 'uuid'
import BaseField from './BaseField'

export default function SelectField({ name, label, value, readOnly, options, testid, onChange }) {
  const id = uuid()

  return (
    <BaseField name={name} label={label ?? name} htmlFor={id}>
      <select id={id} data-testid={testid ?? name} value={value} readOnly={readOnly} onChange={onChange}>
        <option value="">선택하세요</option>
        {options.map((option, i) => (
          <option key={i} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
    </BaseField>
  )
}
