/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable no-underscore-dangle */
import React, { useContext } from 'react';

import { Link } from 'react-router-dom';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavbarText,
  Container,
  Button,
} from 'reactstrap';

import UserContext from '../../../contexts/user';

export interface INavigationProps {}

const Navigation: React.FunctionComponent<INavigationProps> = (props) => {
  const userContext = useContext(UserContext);
  const { user } = userContext.userState;

  const logout = () => {
    userContext.userDispatch({
      type: 'logout',
      payload: userContext.userState,
    });
  };

  return (
    <Navbar color="light" light sticky="top" expand="md">
      <Container>
        <NavbarBrand tag={Link} to="/mblog">
          📝
        </NavbarBrand>
        <Nav className="mr-auto" navbar></Nav>
        {user._id !== '' ? (
          <div>
            <Button outline tag={Link} to="/mblog/edit">
              <i className="far fa-sticky-note mr-2"></i>
              Post a Blog
            </Button>
            <NavbarText className="ml-2 mr-2">|</NavbarText>
            <Button outline size="sm" onClick={() => logout()}>
              Logout
            </Button>
          </div>
        ) : (
          <div>
            <NavbarText tag={Link} to="/mblog/login">
              Login
            </NavbarText>
            <NavbarText className="ml-2 mr-2">|</NavbarText>
            <NavbarText tag={Link} to="/mblog/register">
              Signup
            </NavbarText>
          </div>
        )}
      </Container>
    </Navbar>
  );
};

export default Navigation;
