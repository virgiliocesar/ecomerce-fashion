import React from 'react'
import { Link, NavLink } from 'react-router'
import { useDispatch } from 'react-redux'
import { useLogoutUserMutation } from '../../redux/features/auth/authApi'
import { logout } from '../../redux/features/auth/authSlice'
import { useNavigate } from 'react-router'

const navItems = [
  {
    path: "/dashboard",
    label:"Dashboard"
  }, {
    path: "orders",
    label:"Orders"
  }, {
    path: "payments",
    label:"payments"
  }, {
    path: "profile",
    label:"profile"
  }, {
    path: "reviews",
    label:"reviews"
  },
]



const UserDashboard = () => {
  const [logoutUser] = useLogoutUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handledLogout = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(logout());
      navigate("/");
    } catch (error) {
      console.log("Failed to logout",error);
    }
  }

  return (
    <div className='space-y-5 bg-white p-8 md:h-screen flex flex-col justify-between'>
      <div>
        <div className='nav__logo'>
          <Link>Fashion <span>.</span></Link>
          <p className='text-xs italic'>User dashboard</p>
        </div>
        <hr className='mt-5' />
        <ul className='space-y-5 pt-5'>
          {
            navItems.map((item, index) => (
              <li key={index}>
                <NavLink
                  className={({ isActive }) => isActive ? "text-blue-600 font-bold" : "text-black"}
                  end
                  to={item.path}>
                  {item.label}
                </NavLink>
              </li>
            ))
          }
        </ul>
      </div>

      <div className='mb-3'>
        <hr className='mb-3' />
        <button
          onClick={handledLogout}
          className='cursor-pointer text-white bg-primary font-medium px-5 py-1 rounded-sm'>Logout</button>
      </div>
    </div>
  )
}

export default UserDashboard