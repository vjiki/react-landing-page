/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useReducer } from 'react';

// import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';

import AroundBlock from './components/blog/AroundBlock';
import AuthRoute from './components/blog/AuthRoute';
// import { AddPost } from './components/blog/AddPost/AddPost';
// import AroundBlock from './components/blog/AroundBlock';
// import { EditPost } from './components/blog/EditPost/EditPost';
// import MLoginPage from './components/blog/MainLogin';
// import { FAQ } from './components/faq/FAQ';
// import Contacts from './components/trainings/Contacts';
import logging from './config/logging';
import routes from './config/routes';
import {
  initialUserState,
  UserContextProvider,
  userReducer,
} from './contexts/user';
import { Validate } from './modules/Auth';
import Home from './pages/home';
// import Blog from './pages/blog/blog';
// import FullPost from './pages/blog/fullpost';
// import Home from './pages/home';

// import { useAppDispatch } from './redux/hooks';
// import { fetchAuthMe } from './redux/slices/auth';

export interface IApplicationProps {}

const App: React.FunctionComponent<IApplicationProps> = (props) => {
  // const dispatch = useAppDispatch();
  // const isAuth = useSelector(selectIsAuth);

  const [userState, userDispatch] = useReducer(userReducer, initialUserState);
  // const [authStage, setAuthStage] = useState<string>(
  //   'Checking localstorage ...'
  // );
  // const [loading, setLoading] = useState<boolean>(true);

  React.useEffect(() => {
    // dispatch(fetchAuthMe());

    // setTimeout(() => {
    CheckLocalStorageForCredentials();
    // }, 1000);
  }, []);

  const CheckLocalStorageForCredentials = () => {
    // setAuthStage('Checking credentials ...');

    const fire_token = localStorage.getItem('fire_token');

    if (fire_token === null) {
      userDispatch({ type: 'logout', payload: initialUserState });
      // setAuthStage('No credentials found');
      // setTimeout(() => {
      //   // setLoading(false);
      // }, 500);
    } else {
      return Validate(fire_token, (error, user) => {
        if (error) {
          logging.error(error);
          userDispatch({ type: 'logout', payload: initialUserState });
          // setLoading(false);
        } else if (user) {
          userDispatch({ type: 'login', payload: { user, fire_token } });
          // setLoading(false);
        }
      });
    }
  };

  const userContextValues = {
    userState,
    userDispatch,
  };

  const appRoutes = routes.map((route, index) => {
    if (route.auth) {
      return (
        <Route
          path={route.path}
          element={
            <AuthRoute>
              <AroundBlock>
                <route.component />
              </AroundBlock>
            </AuthRoute>
          }
          // exact={route.exact}
          key={index}
          // render={(routeProps: RouteComponentProps) => (
          //   <AuthRoute>
          //     <route.component {...routeProps} />
          //   </AuthRoute>
          // )}
          // render={() => (
          //   <AuthRoute>
          //     <route.component />
          //   </AuthRoute>
          // )}
        />
      );
    }

    return (
      <Route
        path={route.path}
        element={
          <AroundBlock>
            <route.component />
          </AroundBlock>
        }
        // exact={route.exact}
        key={index}
        // render={(routeProps: RouteComponentProps) => <route.component {...routeProps} />}
      />
    );
  });

  return (
    <UserContextProvider value={userContextValues}>
      <Routes>
        {appRoutes}
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {/* <Routes> */}
      {/* <Route path="/" element={<Home />} />
        <Route
          path="/blog"
          element={
            <AroundBlock>
              <Blog />
            </AroundBlock>
          }
        />
        <Route
          path="/blog/login"
          element={
            <AroundBlock>
              <MLoginPage />
            </AroundBlock>
          }
        />
        <Route
          path="/blog/register"
          element={
            <AroundBlock>
              <MLoginPage />
            </AroundBlock>
          }
        />
        <Route
          path="/blog/addpost"
          element={
            <AroundBlock>
              <AddPost />
            </AroundBlock>
          }
        />
        <Route
          path="/blog/posts/:id/edit"
          element={
            <AroundBlock>
              <AddPost />
            </AroundBlock>
          }
        />
        <Route
          path="/blog/posts/:id"
          element={
            <AroundBlock>
              <FullPost />
            </AroundBlock>
          }
        />
        <Route
          path="/blog/editpost"
          element={
            <AroundBlock>
              <EditPost />
            </AroundBlock>
          }
        />
        <Route
          path="/mblog/login"
          element={
            <AroundBlock>
              <MLoginPage />
            </AroundBlock>
          }
        />
        <Route
          path="/mblog/register"
          element={
            <AroundBlock>
              <MLoginPage />
            </AroundBlock>
          }
        />
        <Route
          path="/contacts"
          element={
            <AroundBlock>
              <Contacts />
            </AroundBlock>
          }
        />
        <Route
          path="/faq"
          element={
            <AroundBlock>
              <FAQ />
            </AroundBlock>
          }
        />
        <Route
          path="/editpost"
          element={
            <AroundBlock>
              <EditPost />
            </AroundBlock>
          }
        /> */}
      {/* </Routes> */}
    </UserContextProvider>
  );
};

export default App;
