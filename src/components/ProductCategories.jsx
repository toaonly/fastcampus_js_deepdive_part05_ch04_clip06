import { NavLink } from 'react-router-dom'

export default function ProductCategories({ categories }) {
  return (
    <div className="flex flex-col w-[200px] h-full overflow-hidden border-r border-slate-600 divide-y divide-slate-600">
      {categories.map(cate => (
        <div className="p-4 w-full" key={cate.id}>
          <NavLink className={({ isActive }) => (isActive ? 'text-pink-500 font-semibold' : '')} to={`./${cate.id}`}>
            {cate.name}
          </NavLink>
        </div>
      ))}
      <div className="p-4 w-full">
        <NavLink className="btn">추가</NavLink>
      </div>
    </div>
  )
}
