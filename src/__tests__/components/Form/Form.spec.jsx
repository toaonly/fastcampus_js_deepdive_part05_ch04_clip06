import { fireEvent, render } from '@testing-library/react'
import { describe, expect, vi } from 'vitest'
import Form from '../../../components/Form/Form'

describe('componets/Form/Form 컴포넌트 테스트', () => {
  const textField = {
    type: 'text',
    name: 'TextField',
    value: 'TextField Value',
    onChange: vi.fn(),
    readOnly: false,
  }
  const selectField = {
    type: 'select',
    name: 'SelectField',
    value: 'SelectField Value',
    options: [{ value: 'SelectField Value', text: 'SelectField Value' }],
    onChange: vi.fn(),
    readOnly: false,
  }

  it('렌더링 테스트 및 각 field 변경 시 onChange 가 호출 된다', () => {
    const onSubmit = vi.fn()
    const result = render(
      <Form
        fields={[textField, selectField]}
        onSubmit={onSubmit}
        submitButtonOptions={{
          text: 'Submit',
        }}
        renderButtons={() => {}}
      />
    )

    const textFieldEl = result.getByTestId('TextField')
    const selectFieldEl = result.getByTestId('SelectField')

    expect(textFieldEl.value).toBe(textField.value)
    expect(selectFieldEl.value).toBe(selectField.value)

    fireEvent.change(textFieldEl, { target: { value: 'TextField Value 2' } })
    fireEvent.change(selectFieldEl, { target: { value: 'SelectField Value 2' } })

    expect(textField.onChange).toHaveBeenCalled()
    expect(selectField.onChange).toHaveBeenCalled()
  })

  it('Submit 버튼을 클릭하면 onSubmit 이 호출 된다', () => {
    const onSubmit = vi.fn()
    const result = render(
      <Form
        fields={[textField, selectField]}
        onSubmit={onSubmit}
        submitButtonOptions={{
          text: 'Submit',
        }}
        renderButtons={() => {}}
      />
    )

    fireEvent.click(result.getByText('Submit'))

    expect(onSubmit).toHaveBeenCalled()
  })
})
