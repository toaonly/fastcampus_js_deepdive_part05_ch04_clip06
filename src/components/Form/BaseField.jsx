export default function BaseField({ htmlFor, label, children }) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={htmlFor}>{label}</label>
      {children}
    </div>
  )
}
