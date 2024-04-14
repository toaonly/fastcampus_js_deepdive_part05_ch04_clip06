import { useEffect } from 'react'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'

const MEMU = [
  {
    path: '/product-categories',
    name: '신발 카테고리 관리',
  },
  {
    path: '/products',
    name: '신발 관리',
  },
]

export default function Main() {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (location.pathname === '/') navigate(MEMU[0].path, { replace: true })
  }, [])

  return (
    <div className="flex items-start w-full h-screen">
      <div className="flex flex-col h-full overflow-hidden border-r border-slate-600 divide-y divide-slate-600">
        {MEMU.map(menu => (
          <div className="p-4 w-[180px]" key={menu.name}>
            <NavLink className={({ isActive }) => (isActive ? 'text-pink-500 font-semibold' : '')} to={menu.path}>
              {menu.name}
            </NavLink>
          </div>
        ))}
      </div>
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  )
}
