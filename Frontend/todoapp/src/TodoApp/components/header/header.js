import React from 'react';
import { Link} from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

export default function Header() {
    return (
        <Navbar bg="light" expand="lg" className="shadow-md py-3 px-4">
            <Navbar.Brand href="/" className="flex items-center">
                {/* <img src="/logo.png" alt="Logo" className="h-8 w-8 mr-2" /> */}
                <span className="font-bold text-xl">Todo App</span>
            </Navbar.Brand>
            <Nav className="ml-auto flex items-center">
                {/* <Nav.Link className="cursor-pointer flex items-center"> */}
                    <Link to={"/profile"}><span className="ml-2">Profile</span></Link>
                {/* </Nav.Link> */}
            </Nav>
        </Navbar>
    );
}
