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
                {/* <Navbar expand="md"> */}
                <NavbarBrand tag={RRNavLink} to="/">
                    <img className="headerLogo" src={"/ticketbook-logo.png"} />
                    {/* Ticketbook */}
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
                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/myEvents/create">Add Event</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={RRNavLink} onClick={logout} to="/login">LOGOUT</NavLink>
                                </NavItem>
                            </>
                            // <>
                            //     <div className="navBarLinkContainer">
                            //         <div className="nonLogoutLinksContainer">
                            //             <NavItem>
                            //                 <NavLink tag={RRNavLink} to="/">HOME</NavLink>
                            //             </NavItem>
                            //             <NavItem>
                            //                 <NavLink tag={RRNavLink} to="/myEvents">MyEvents</NavLink>
                            //             </NavItem>
                            //             <NavItem>
                            //                 <NavLink tag={RRNavLink} to="/myEvents/create">Add Event</NavLink>
                            //             </NavItem>
                            //         </div>
                            //         <div className="logoutConatiner">
                            //             <NavItem>
                            //                 <NavLink onClick={logout} to="/login">LOGOUT</NavLink>
                            //             </NavItem>
                            //         </div>
                            //     </div>
                            // </>
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
        </div >
    );
}
