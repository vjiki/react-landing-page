/* eslint-disable no-underscore-dangle */
import React, { Fragment, useContext } from 'react';

import { Popover, Transition } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
// import { useDispatch, useSelector } from 'react-redux';
// import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

import config from '../../config/index.json';
// import { logout, selectIsAuth } from '../../redux/slices/auth';
import UserContext from '../../contexts/user';
// import { logout } from '../../redux/slices/auth';

const Menu = () => {
  const { navigation, navigationLinks, callToAction } = config;
  const { company } = config;
  const { name: companyName, logo, href: companyHref } = company;
  const userContext = useContext(UserContext);
  const { user } = userContext.userState;

  // const dispatch = useDispatch();
  // const isAuth = useSelector(selectIsAuth);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const onClickLogout = () => {
    if (window.confirm('Are you sure you want to logout')) {
      // dispatch(logout());
      userContext.userDispatch({
        type: 'logout',
        payload: userContext.userState,
      });
      window.localStorage.removeItem('token');
    }
  };

  return (
    <>
      <svg
        className={`hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-background transform translate-x-1/2`}
        fill="currentColor"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <polygon points="50,0 100,0 50,100 0,100" />
      </svg>

      <Popover>
        <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
          <nav
            className="relative flex items-center justify-between sm:h-10 lg:justify-start"
            aria-label="Global"
          >
            <div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
              <div className="flex items-center justify-between w-full md:w-auto">
                <a href={companyHref}>
                  <span className="sr-only">{companyName}</span>
                  <img alt="logo" className="h-20 w-auto sm:h-20" src={logo} />
                </a>
                <div className="-mr-2 flex items-center md:hidden">
                  <Popover.Button
                    className={`bg-background rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-secondary`}
                  >
                    <span className="sr-only">Open main menu</span>
                    <MenuIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
            </div>
            <div className="hidden md:block md:ml-10 md:pr-4 md:space-x-8">
              {/* {navigation.map(
                (item) =>
                  // <Link2
                  //   spy={true}
                  //   active="active"
                  //   smooth={true}
                  //   duration={1000}
                  //   key={item.name}
                  //   to={item.href}
                  //   className="font-medium text-gray-500 hover:text-gray-900"
                  // >
                  //   {item.name}
                  // </Link2>
                  // <Link key={item.name} href={item.href} scroll>
                  //   <a className="font-medium text-gray-500 hover:text-gray-900"> {item.name} </a>
                  // </Link>
                  isHomePage && (
                    <HashLink
                      key={item.name}
                      to={item.href}
                      className="font-medium text-gray-500 hover:text-gray-900"
                      smooth
                      timeout={5000}
                    >
                      {item.name}
                    </HashLink>
                  )
              )} */}
              {navigationLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`font-medium text-gray-500 hover:text-gray-900`}
                >
                  {link.name}
                </Link>
              ))}
              {user._id !== '' ? (
                <>
                  <Link
                    to="/blog/addpost"
                    className={`font-medium text-gray-500 hover:text-gray-900`}
                  >
                    Write Post
                  </Link>
                  <a
                    onClick={onClickLogout}
                    className={`font-medium text-gray-500 hover:text-gray-900`}
                  >
                    Logout
                  </a>
                </>
              ) : (
                <>
                  <Link
                    to="/blog/login"
                    className={`font-medium text-gray-500 hover:text-gray-900`}
                  >
                    Login
                  </Link>
                  <Link
                    to="/blog/register"
                    className={`font-medium text-gray-500 hover:text-gray-900`}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>

        <Transition
          as={Fragment}
          enter="duration-150 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel
            focus
            className="absolute z-10 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
          >
            <div
              className={`rounded-lg shadow-md bg-background ring-1 ring-black ring-opacity-5 overflow-hidden`}
            >
              <div className="px-5 pt-4 flex items-center justify-between">
                <div>
                  <img className="h-8 w-auto" src={logo} alt="" />
                </div>
                <div className="-mr-2">
                  <Popover.Button
                    className={`bg-background rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-secondary`}
                  >
                    <span className="sr-only">Close main menu</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navigation.map(
                  (item) =>
                    isHomePage && (
                      <HashLink
                        key={item.name}
                        to={item.href}
                        smooth
                        // scroll
                        timeout={5000}
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                      >
                        {item.name}
                      </HashLink>
                    )
                )}
                {navigationLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-5"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
              {isHomePage && (
                <HashLink
                  key={callToAction.text}
                  to={callToAction.href}
                  className={`block w-full px-5 py-3 text-center font-medium text-primary bg-gray-50 hover:bg-gray-100`}
                >
                  {callToAction.text}
                </HashLink>
              )}
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </>
  );
};

export default Menu;
