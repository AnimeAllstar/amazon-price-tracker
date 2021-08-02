import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import AuthButton from './AuthButton';

const NavigationBar = () => {
  const { currentUser, isLoggedIn, login, logout } = useAuth();

  return (
    <Navbar bg="light" variant="light">
      <Container>
        <Navbar.Brand href="/">Amazon product tracker</Navbar.Brand>
        <Nav>
          {isLoggedIn && <Navbar.Text className="me-4">Logged in as: {currentUser.name}</Navbar.Text>}
          {isLoggedIn ? <AuthButton message="Log out" submit={logout} /> : <AuthButton message="Log in" submit={login} />}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
