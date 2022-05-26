import React, { useEffect } from "react";
import {
  Button,
  List,
  ListItem,
  TextField,
  Typography,
} from "@material-ui/core";
import { Controller, useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Form from "../components/Form";
import { useAppDispatch, useAppSelector } from "../store/configueStore";
import { register } from "../store/auth";
import { toast } from "react-toastify";
import { Box, Container } from "@mui/material";
import registerIcon from "../assets/Sign up-cuate.svg";

interface Inputs {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  const dispatch = useAppDispatch();

  const { userInfo, error } = useAppSelector((state) => state.auth);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const submitHandler: ({
    name,
    email,
    password,
    confirmPassword,
  }: Inputs) => Promise<void> = async ({
    name,
    email,
    password,
    confirmPassword,
  }) => {
    console.log(name, email, password);
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    dispatch(register({ name, email, password }));

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
    <Container>
      <Box display="flex" marginTop={10}>
        <Form onSubmit={handleSubmit(submitHandler)}>
          <Typography component="h1" variant="h2">
            Register
          </Typography>
          <List>
            <ListItem>
              <Controller
                name="name"
                control={control}
                defaultValue=""
                rules={{
                  required: true,
                  minLength: 2,
                }}
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="name"
                    label="Name"
                    inputProps={{ type: "name" }}
                    error={Boolean(errors.name)}
                    helperText={
                      errors.name
                        ? errors.name.type === "minLength"
                          ? "Name length is more than 1"
                          : "Name is required"
                        : ""
                    }
                    {...field}
                  ></TextField>
                )}
              ></Controller>
            </ListItem>
            <ListItem>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                rules={{
                  required: true,
                  pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                }}
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="email"
                    label="Email"
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
                    error={Boolean(errors.password)}
                    helperText={
                      errors.password
                        ? errors.password.type === "minLength"
                          ? "Password length is more than 5"
                          : "Password is required"
                        : ""
                    }
                    {...field}
                  ></TextField>
                )}
              ></Controller>
            </ListItem>
            <ListItem>
              <Controller
                name="confirmPassword"
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
                    id="confirmPassword"
                    label="Confirm Password"
                    inputProps={{ type: "password" }}
                    error={Boolean(errors.confirmPassword)}
                    helperText={
                      errors.confirmPassword
                        ? errors.confirmPassword.type === "minLength"
                          ? "Confirm Password length is more than 5"
                          : "Confirm  Password is required"
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
                Register
              </Button>
            </ListItem>
            <ListItem>
              Already have an account? &nbsp;{" "}
              <Link to={`/login?redirect=${redirect}`}>
                <Typography color="primary">Login</Typography>
              </Link>
            </ListItem>
          </List>
        </Form>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <img
            src={registerIcon}
            alt="register"
            style={{ width: 500, height: 500 }}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
