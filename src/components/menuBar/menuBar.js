import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { signInWithGoogle, signOut } from "../../utilities/firebase";

const SignInButton = () => (
  <button
    className="ml-5 p-2 w-15 btn btn-primary"
    style={{
      border: "2px solid white",
      color: "white",
    }}
    onClick={signInWithGoogle}
  >
    Sign in
  </button>
);
const SignOutButton = () => (
  <button
    className="ml-5 p-2 w-10 btn btn-primary"
    style={{
      border: "2px solid white",
      color: "white",
    }}
    onClick={signOut}
  >
    Sign out
  </button>
);

const MenuBar = ({ openEventForm, user }) => {
  return (
    <Navbar className="p-3" style={{ backgroundColor: "#1E90FF" }}>
      <Container>
        <Navbar.Brand href="/" style={{ color: "white", fontWeight: "bold" }}>
          PickupFinder
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        {user.user && window.location.pathname === "/" && (
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link
                href="#"
                onClick={openEventForm}
                style={{ color: "white" }}
              >
                Create Event
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        )}
        {user.user && window.location.pathname === "/" && (
          <Nav className="me-auto">
            <Nav.Link
              href={`/user/${user.user?.uid}`}
              style={{ color: "white" }}
            >
              Hello, {user.user.displayName}
            </Nav.Link>
          </Nav>
        )}
        {user.user ? <SignOutButton /> : <SignInButton />}
      </Container>
    </Navbar>
  );
};

export default MenuBar;
