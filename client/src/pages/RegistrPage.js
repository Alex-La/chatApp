import React, { useState, useEffect } from "react";

import "./authPage.css";

import { useValidation } from "../hooks/validation.hook";
import { useHttp } from "../hooks/http.hook";
import bcrypt from "bcryptjs";

import {
  Button,
  Form,
  Grid,
  Header,
  Segment,
  Label,
  Message
} from "semantic-ui-react";

export default function AuthPage() {
  const [form, setForm] = useState({
    login: "",
    email: "",
    password: "",
    conPassword: ""
  });
  const [err, setErr] = useState("");

  const {
    email,
    checkEmail,
    password,
    checkPassword,
    login,
    checkLogin
  } = useValidation();
  const { loading, request, error, clearError } = useHttp();

  useEffect(() => {
    if (error != null) {
      setErr(error);
      clearError();
    } else {
      setErr("");
    }
  }, [error, clearError]);

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const registrHandler = async () => {
    const hashedPassword = await bcrypt.hash(form.password, 12);

    try {
      const data = await request("/api/registr", "POST", {
        login: form.login,
        email: form.email,
        password: hashedPassword
      });
      console.log("data", data);
    } catch (e) {}
  };

  const validHandler = () => {
    checkEmail(form.email);
    checkPassword(form.password, form.conPassword);
    checkLogin(form.login);
    if (!email && !password && !login) {
      registrHandler();
    }
  };

  return (
    <div className="authWrap">
      <Grid
        textAlign="center"
        verticalAlign="middle"
        style={{ height: "100vh" }}
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="teal" textAlign="center">
            Registration
          </Header>
          <Form size="large">
            <Segment stacked>
              <Form.Field>
                <Form.Input
                  fluid
                  icon="address card outline"
                  iconPosition="left"
                  placeholder="Login"
                  name="login"
                  onChange={changeHandler}
                />
                {login && (
                  <Label basic color="red" pointing="above">
                    Is empty!
                  </Label>
                )}
              </Form.Field>
              <Form.Field>
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="E-mail address"
                  name="email"
                  onChange={changeHandler}
                />
                {email && (
                  <Label basic color="red" pointing="above">
                    Is not a valid email!
                  </Label>
                )}
              </Form.Field>
              <Form.Field>
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                  name="password"
                  onChange={changeHandler}
                />
              </Form.Field>
              <Form.Field>
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Confirm password"
                  type="password"
                  name="conPassword"
                  onChange={changeHandler}
                />
                {password && (
                  <Label basic color="red" pointing="above">
                    Passwords are not equal!
                  </Label>
                )}
              </Form.Field>
              <Button
                color="teal"
                fluid
                size="large"
                disabled={loading}
                onClick={validHandler}
              >
                Register Now
              </Button>
            </Segment>
          </Form>
          {err !== "" && <Message error header={err} />}
        </Grid.Column>
      </Grid>
    </div>
  );
}
