import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useNavigate, Link } from "react-router-dom";
import { register } from "../modules/authManager";
import "./LoginAndRegister.css";

export default function Register() {
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();

    const registerClick = (e) => {
        e.preventDefault();
        if (password && password !== confirmPassword) {
            alert("Passwords don't match. Please, try again.");
        } else {
            const userProfile = {
                firstName,
                lastName,
                email,
            };
            register(userProfile, password).then(() => navigate("/"));
        }
    };

    return (
        <div className="loginAndRegisterFormContainer">
            <Form className="loginAndRegisterForm" onSubmit={registerClick}>
                <h3>Registration</h3>
                <fieldset>
                    <FormGroup>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                            style={{ width: '30rem' }}
                            className="loginAndRegisterInputs"
                            id="firstName"
                            type="text"
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                            style={{ width: '30rem' }}
                            className="loginAndRegisterInputs"
                            id="lastName"
                            type="text"
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input
                            style={{ width: '30rem' }}
                            className="loginAndRegisterInputs"
                            id="email"
                            type="text"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input
                            style={{ width: '30rem' }}
                            className="loginAndRegisterInputs"
                            id="password"
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="confirmPassword">Confirm Password</Label>
                        <Input
                            style={{ width: '30rem' }}
                            className="loginAndRegisterInputs"
                            id="confirmPassword"
                            type="password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </FormGroup>
                    <div className="loginAndRegisterButtonRow">
                        <FormGroup>
                            <Button className="loginAndRegisterButton" id="registerPageButton">Register</Button>
                        </FormGroup>
                        <em>
                            Already registered? <Link className="hyperlink" to="/login">Login</Link>
                        </em>
                    </div>
                </fieldset>
            </Form >
        </div >
    );
}