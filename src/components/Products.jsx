import { NavLink } from 'react-router-dom'

export default function Products({ products }) {
  return (
    <div className="flex flex-col w-[200px] h-full overflow-hidden border-r border-slate-600 divide-y divide-slate-600">
      {products.map(prod => (
        <div className="p-4 w-full" key={prod.id}>
          <NavLink className={({ isActive }) => (isActive ? 'text-pink-500 font-semibold' : '')} to={`./${prod.id}`}>
            {prod.name}
          </NavLink>
        </div>
      ))}
      <div className="p-4 w-full">
        <NavLink className="btn">추가</NavLink>
      </div>
    </div>
  )
}
