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
import "./Header.css";

export default function Header({ isLoggedIn }) {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <div className="headerConatiner">
            <Navbar className="navbar navbar-dark" expand="md" style={{ backgroundColor: '#003366' }}>
                <NavbarBrand tag={RRNavLink} to="/myEvents">
                    <img className="headerLogo" src={"/ticketbook-logo.png"} alt={'ticketbook logo'} />
                </NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        {/* When isLoggedIn === true, we will render the Home link */}
                        {isLoggedIn && (
                            <>
                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/myEvents">My Events</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/myEvents/create">Add Event</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={RRNavLink} onClick={logout} to="/login">Logout</NavLink>
                                </NavItem>
                            </>
                        )}
                        {!isLoggedIn && (
                            <>
                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/login">
                                        Login
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/register">
                                        Register
                                    </NavLink>
                                </NavItem>
                            </>
                        )}
                    </Nav>
                </Collapse>
            </Navbar>
        </div >
    );
}
