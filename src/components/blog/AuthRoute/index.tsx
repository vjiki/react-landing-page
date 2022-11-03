/* eslint-disable no-underscore-dangle */
import React, { useContext } from 'react';

// import { Redirect } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

import logging from '../../../config/logging';
import UserContext from '../../../contexts/user';

export interface IAuthRouteProps {
  children?: any;
}

// todo
const AuthRoute: React.FunctionComponent<IAuthRouteProps> = (props) => {
  const { children } = props;

  const userContext = useContext(UserContext);

  if (userContext.userState.user._id === '') {
    logging.info('Unauthorized, redirecting.');
    // return <Redirect to='/login' />
    return <Navigate replace to="/mblog/login" />;
  }
  return <>{children}</>;
};

export default AuthRoute;
