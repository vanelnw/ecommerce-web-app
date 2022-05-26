import {
  Button,
  List,
  ListItem,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Form from "../components/Form";
import { login } from "../store/auth";
import { useAppDispatch, useAppSelector } from "../store/configueStore";
import { toast } from "react-toastify";
import { Box, Container} from "@mui/material";
import loginIcon from "../assets/login.svg";
import Footer from "../components/Footer";

interface Inputs {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  const { userInfo, error } = useAppSelector((state) => state.auth);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const submitHandler: ({ email, password }: Inputs) => Promise<void> = async ({
    email,
    password,
  }) => {
    dispatch(login({ email, password }));
    if (!error) {
      navigate(redirect || "/");
    } else {
      toast.error(error);
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  return (
    <>
    <Container>
      <Box display="flex" marginTop={10}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <img
            src={loginIcon}
            alt="login"
            style={{ width: 500, height: 500 }}
          />
        </Box>

        <Form onSubmit={handleSubmit(submitHandler)}>
          <Typography component="h1" variant="h2">
            Login
          </Typography>
          <List>
            <ListItem>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                rules={{
                  required: true,
                  // eslint-disable-next-line no-useless-escape
                  pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                }}
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="email"
                    label="email"
                    inputProps={{ type: "email" }}
                    error={Boolean(errors.email)}
                    helperText={
                      errors.email
                        ? errors.email.type === "pattern"
                          ? "Email is not valid"
                          : "Email is required"
                        : ""
                    }
                    {...field}
                  ></TextField>
                )}
              ></Controller>
            </ListItem>
            <ListItem>
              <Controller
                name="password"
                control={control}
                defaultValue=""
                rules={{
                  required: true,
                  minLength: 6,
                }}
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="password"
                    label="Password"
                    inputProps={{ type: "password" }}
                    error={Boolean(errors.email)}
                    helperText={
                      errors.email
                        ? errors.email.type === "minLength"
                          ? "Password is les than 6 caracter"
                          : "Email is required"
                        : ""
                    }
                    {...field}
                  ></TextField>
                )}
              ></Controller>
            </ListItem>
            <ListItem>
              <Button
                variant="contained"
                type="submit"
                fullWidth
                color="primary"
              >
                Login
              </Button>
            </ListItem>
            <ListItem>
              Do not have account? &nbsp;{" "}
              <Link to={`/register?redirect=${redirect}`}>
                <Typography color="primary">Register</Typography>
              </Link>
            </ListItem>
          </List>
        </Form>
      </Box>
    </Container>
    <Footer/>
    </>
  );
};

export default Login;
