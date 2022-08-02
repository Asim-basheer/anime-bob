import { Button, Container, Image } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import Logo from '../images/logo.png';

import { AiTwotoneHome, AiOutlinePlaySquare } from 'react-icons/ai';
import { FaHotjar } from 'react-icons/fa';
import { FiLogIn, FiLogOut, FiSearch } from 'react-icons/fi';
import { MdFavorite } from 'react-icons/md';
import { RiAdminFill } from 'react-icons/ri';
import { HiOutlineMenu } from 'react-icons/hi';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout, reset } from '../store/auth/authSlice';

function Navbar({ user }) {
  const [active, setActive] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // function to handle logout
  const logoutHandler = () => {
    const confirm = window.confirm('you will log out are you sure?');

    if (confirm) {
      dispatch(logout());
      dispatch(reset());
      navigate('/', { replace: true });
      window.location.reload();
    } else {
      return;
    }
  };

  return (
    <nav className='navbar-main bg-dark py-2'>
      <div
        className={`navbar-main__overlay ${active ? 'active' : ''}`}
        onClick={() => setActive(false)}
      ></div>
      <Container fluid='xxl'>
        <div className='navbar-main__content d-flex align-items-center justify-content-between text-capitalize'>
          <div className='navbar-main__logo'>
            <NavLink
              to={'/'}
              className='d-flex justify-content-center align-items-center'
              onClick={() => setActive(false)}
            >
              <span className='display-6 text-white'>
                <span className='text-primary'>a</span>nime <br /> bob
              </span>
              <Image src={Logo} alt='logo' className='ms-2' />
            </NavLink>
          </div>

          <ul
            className={`navbar-main__list d-flex align-items-center mb-0 mt-xl-2 bg-dark ${
              active ? 'active' : ''
            } `}
          >
            <li className='navbar-main__item' onClick={() => setActive(false)}>
              <NavLink to='/' className='navbar-main__link'>
                <AiTwotoneHome className='navbar-main__link-icon' /> home
              </NavLink>
            </li>
            <li className='navbar-main__item' onClick={() => setActive(false)}>
              <NavLink to='/updated' className='navbar-main__link'>
                <FaHotjar className='navbar-main__link-icon' /> updated
              </NavLink>
            </li>
            <li className='navbar-main__item' onClick={() => setActive(false)}>
              <NavLink to='/all' className='navbar-main__link'>
                <AiOutlinePlaySquare className='navbar-main__link-icon' /> all
                anime
              </NavLink>
            </li>
            <li className='navbar-main__item' onClick={() => setActive(false)}>
              <NavLink to='/search' className='navbar-main__link'>
                <FiSearch className='navbar-main__link-icon' /> search
              </NavLink>
            </li>
            {user ? (
              <li
                className='navbar-main__item'
                onClick={() => setActive(false)}
              >
                <NavLink to='/favorite' className='navbar-main__link'>
                  <MdFavorite className='navbar-main__link-icon' /> favorite
                </NavLink>
              </li>
            ) : null}

            {user && +user.user_type !== 3 ? (
              <li
                className='navbar-main__item'
                onClick={() => setActive(false)}
              >
                <NavLink to='/admin/home' className='navbar-main__link'>
                  <RiAdminFill className='navbar-main__link-icon' /> admin
                </NavLink>
              </li>
            ) : null}
          </ul>

          <ul className='d-flex align-items-center mb-0 mt-2 navbar-main__control'>
            <li className='text-capitalize'>
              {user ? (
                <Button
                  className='btn btn-primary navbar-main__control-btns'
                  onClick={logoutHandler}
                >
                  <FiLogOut className='navbar-main__link-icon' /> Logout
                </Button>
              ) : (
                <Link
                  to='/login'
                  className='btn btn-primary navbar-main__control-btns'
                >
                  <FiLogIn className='navbar-main__link-icon login' /> login
                </Link>
              )}
            </li>
            <li onClick={() => setActive(!active)}>
              <HiOutlineMenu className='navbar-main__menu-icon' />
            </li>
          </ul>
        </div>
      </Container>
    </nav>
  );
}

export default Navbar;
