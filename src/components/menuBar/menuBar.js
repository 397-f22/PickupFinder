import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { signInWithGoogle, signOut } from "../../utilities/firebase";

const SignInButton = () => (
    <button className="m-2 p-2 ms-auto btn btn-dark" onClick={signInWithGoogle}>Sign in</button>
);
const SignOutButton = () => (
    <button className="m-2 p-2 ms-auto btn btn-dark" onClick={signOut}>Sign out</button>
);

const MenuBar = ({ openEventForm, user }) => {
    
    return (<Navbar bg="light" expand="lg" className="p-3">
        <Container>
            <Navbar.Brand href="#">PickupFinder</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            {user.user &&
            (<Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="#" onClick={openEventForm}>Create Event</Nav.Link>
                </Nav>
            </Navbar.Collapse>)
            }
            {user.user &&
            (<Nav className="me-auto">
            <Nav.Link href={`/user/${user.user?.uid}`}>Hello, {user.user.displayName}</Nav.Link>
            </Nav>)
            }           
            {user.user ? <SignOutButton /> : <SignInButton />}
        </Container>
    </Navbar>)
};

export default MenuBar;
