import { NavLink, Outlet } from 'react-router-dom';
import {
  AiFillDashboard,
  AiOutlineCloseCircle,
  AiOutlineHome,
} from 'react-icons/ai';
import { RiUserSharedLine } from 'react-icons/ri';
import { CgPlayButtonR } from 'react-icons/cg';
import { MdOutlineAirplay } from 'react-icons/md';
import { HiOutlineMenu } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { useState } from 'react';
function SideBar({ user }) {
  const [active, setActive] = useState(false);

  return (
    <>
      <nav
        className={`sidebar-admin text-capitalize px-2 py-4 d-flex flex-column justify-content-between vh-100 bg-dark ${
          active ? 'active' : ''
        }`}
      >
        <div
          className={`sidebar-admin__menu-icon text-dark ${
            active ? 'active' : ''
          }`}
          onClick={() => setActive(true)}
        >
          <HiOutlineMenu className='bg-info rounded' />
        </div>

        <div
          className={`sidebar-admin__close-icon text-white`}
          onClick={() => setActive(false)}
        >
          <AiOutlineCloseCircle />
        </div>
        <div className='sidebar-admin__logo text-white text-center fs-5'>
          <AiFillDashboard
            className='fs-5 text-primary'
            style={{ marginBottom: '5px' }}
          />{' '}
          {''} dasboard
        </div>

        <ul className='sidebar-admin__list m-0'>
          <li className='sidebar-admin__item'>
            <NavLink
              to='home'
              className='sidebar-admin__link'
              onClick={() => setActive(false)}
            >
              <AiOutlineHome className='sidebar-admin__icons home' /> home
            </NavLink>
          </li>
          <li className='sidebar-admin__item'>
            <NavLink
              to='show-a'
              className='sidebar-admin__link'
              onClick={() => setActive(false)}
            >
              <MdOutlineAirplay className='sidebar-admin__icons' /> anime
            </NavLink>
          </li>
          <li className='sidebar-admin__item'>
            <NavLink
              to='show-e'
              className='sidebar-admin__link'
              onClick={() => setActive(false)}
            >
              <CgPlayButtonR className='sidebar-admin__icons' /> episode
            </NavLink>
          </li>
          {user.user_type === '1' && (
            <li className='sidebar-admin__item'>
              <NavLink
                to='show-users'
                className='sidebar-admin__link'
                onClick={() => setActive(false)}
              >
                <RiUserSharedLine className='sidebar-admin__icons' /> users
              </NavLink>
            </li>
          )}
        </ul>
        <div>
          <Link
            className='d-block mb-2 btn btn-primary sidebar-admin__btn-back'
            to='/'
          >
            back to website
          </Link>
        </div>
      </nav>

      <div style={{ marginRight: '200px' }} className='space-sidebar-admin'>
        &nbsp;
      </div>

      <Outlet />
    </>
  );
}

export default SideBar;
