import React, { useState } from "react";
import { NavLink as RRNavLink } from "react-router-dom";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
} from "reactstrap";
import { logout } from "../modules/authManager";
// import "./Header.css";

export default function Header({ isLoggedIn }) {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
            <Navbar className="navbar navbar-dark bg-dark" expand="md">
                <NavbarBrand tag={RRNavLink} to="/">
                    {/* <img className="headerLogo" src={process.env.PUBLIC_URL + "/quill-logo.png"} /> */}
                    Ticketbook
                </NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        {/* When isLoggedIn === true, we will render the Home link */}
                        {isLoggedIn && (
                            <>
                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/">HOME</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/myEvents">MyEvents</NavLink>
                                </NavItem>
                                {/* <NavItem>
                  <NavLink tag={RRNavLink} to="/post">POSTS</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/tag">TAGS</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/category">CATEGORIES</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/UserProfile">USERPROFILE</NavLink>
                </NavItem> */}
                                <NavItem>
                                    <NavLink onClick={logout}>LOGOUT</NavLink>
                                </NavItem>
                            </>
                        )}
                        {!isLoggedIn && (
                            <>
                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/login">
                                        LOGIN
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/register">
                                        REGISTER
                                    </NavLink>
                                </NavItem>
                            </>
                        )}
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
}
