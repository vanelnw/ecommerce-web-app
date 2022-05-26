import {
  Button,
  List,
  ListItem,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ChechkoutWizard from "../components/ChechkoutWizard";
import Form from "../components/Form";
import { saveShippingAddress } from "../store/cart";
import { useAppDispatch, useAppSelector } from "../store/configueStore";

interface Inputs {
  fullName: string;
  city: string;
  address: string;
  postalCode: string;
  country: string;
}

const Shipping: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { userInfo } = useAppSelector((state) => state.auth);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const submitHandler: ({
    fullName,
    address,
    city,
    postalCode,
    country,
  }: Inputs) => Promise<void> = async ({
    fullName,
    address,
    city,
    postalCode,
    country,
  }) => {
    dispatch(
      saveShippingAddress({ fullName, address, city, postalCode, country })
    );

    navigate("/payment");
  };

  useEffect(() => {
    if (!userInfo) {
      navigate("/login?redirect=/shipping");
    }
  }, [userInfo, navigate]);

  return (
    <div>
      <ChechkoutWizard activeStep={1}></ChechkoutWizard>
      <Form onSubmit={handleSubmit(submitHandler)}>
        <Typography component="h1" variant="h1">
          Shipping Address
        </Typography>
        <List>
          <ListItem>
            <Controller
              name="fullName"
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
                  id="fullName"
                  label="Full Name"
                  error={Boolean(errors.fullName)}
                  helperText={
                    errors.fullName
                      ? errors.fullName.type === "minLength"
                        ? "Full Name length is more than 1"
                        : "Full Name is required"
                      : ""
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Controller
              name="address"
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
                  id="address"
                  label="Address"
                  error={Boolean(errors.address)}
                  helperText={
                    errors.address
                      ? errors.address.type === "minLength"
                        ? "Address length is more than 1"
                        : "Address is required"
                      : ""
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Controller
              name="city"
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
                  id="city"
                  label="City"
                  error={Boolean(errors.city)}
                  helperText={
                    errors.city
                      ? errors.city.type === "minLength"
                        ? "City length is more than 1"
                        : "City is required"
                      : ""
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Controller
              name="postalCode"
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
                  id="postalCode"
                  label="Postal Code"
                  error={Boolean(errors.postalCode)}
                  helperText={
                    errors.postalCode
                      ? errors.postalCode.type === "minLength"
                        ? "Postal Code length is more than 1"
                        : "Postal Code is required"
                      : ""
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Controller
              name="country"
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
                  id="country"
                  label="Country"
                  error={Boolean(errors.country)}
                  helperText={
                    errors.country
                      ? errors.country.type === "minLength"
                        ? "Country length is more than 1"
                        : "Country is required"
                      : ""
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>

          <ListItem>
            <Button variant="contained" type="submit" fullWidth color="primary">
              Continue
            </Button>
          </ListItem>
        </List>
      </Form>
    </div>
  );
};

export default Shipping;
