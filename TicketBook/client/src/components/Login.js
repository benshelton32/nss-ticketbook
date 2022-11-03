import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useNavigate, Link } from "react-router-dom";
import { login } from "../modules/authManager";
import "./LoginAndRegister.css";

export default function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const loginSubmit = (e) => {
        e.preventDefault();
        login(email, password)
            .then(() => navigate("/"))
            .catch(() => alert("Invalid email or password"));
    };

    return (
        <div className="loginAndRegisterFormContainer">
            <Form onSubmit={loginSubmit} className="loginAndRegisterForm">
                <h3>Login</h3>
                <fieldset>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input
                            className="loginAndRegisterInputs"
                            id="email"
                            type="text"
                            autoFocus
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input
                            className="loginAndRegisterInputs"
                            id="password"
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </FormGroup>
                    <div className="loginAndRegisterButtonRow">
                        <FormGroup>
                            <Button className="loginAndRegisterButton">Login</Button>
                        </FormGroup>
                        <em>
                            Not registered? <Link className="hyperlink" to="/register">Register</Link>
                        </em>
                    </div>
                </fieldset>
            </Form>
        </div>
    );
}