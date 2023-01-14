import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { toast } from 'react-toastify'
import { checkIsAuth } from '../redux/features/auth/authSlice'
import { logout } from '../redux/features/auth/authSlice'

const Navbar = () => {

  const isAuth = useSelector( checkIsAuth )
  const dispatch = useDispatch()

  const activeStyle = {
    color: 'white'
  }

  const logoutHandler = () => {
    dispatch ( logout() )
    window.localStorage.removeItem('token')
    toast('Вы вышли из системы')
  }

  return (
    <div className='flex py-4 justify-between items-center'>
      <span className='flex justify-center items-center w-6 h-6 bg-gray-600 text-xs text-white rounded-sm '>
        E
      </span>

      {isAuth && (<ul className="flex gap-8">
        <li>
          <NavLink 
            to={'/'} 
            href="/" 
            className="text-xs text-gray-400 hover:text-white"
            style={({isActive})=>isActive ? activeStyle : undefined}>
              Главная
          </NavLink>
        </li>
        <li>
          <NavLink 
            to={'/works'} 
            href="/" 
            className="text-xs text-gray-400 hover:text-white"
            style={({isActive})=>isActive ? activeStyle : undefined}>
              Мои работы
          </NavLink>
        </li>
        <li>
          <NavLink 
            to={'new'} 
            href="/" 
            className="text-xs text-gray-400 hover:text-white"
            style={({isActive})=>isActive ? activeStyle : undefined}>
              Добавить работу
          </NavLink>
        </li>
      </ul>)}

      <div className='flex justify-center item-center bg-gray-600 text-xs text-white rounded-sm px-4 py-2'>
        {isAuth ? <button onClick={logoutHandler} >Выйти</button> : <Link to={'/login'}>войти</Link>}
      </div>

    </div>
  )
}

export default Navbar