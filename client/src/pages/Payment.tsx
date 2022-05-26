import { Button, FormControl, FormControlLabel, List, ListItem, Radio, RadioGroup, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import ChechkoutWizard from '../components/ChechkoutWizard';
import Form from '../components/Form';
import { savePaymentMethod } from '../store/cart';
import { useAppDispatch, useAppSelector } from '../store/configueStore';

const Payment = () => {
const navigate = useNavigate();
const dispatch = useAppDispatch();

const { shippingAddress, paymentMethod,cartItems } = useAppSelector(
  (state) => state.entities.cart
);

  const [paymentMethodName, setPaymentMethodName] = useState(paymentMethod || "PayPal");

  const submitHandler = () => {
    dispatch(savePaymentMethod(paymentMethodName));
    navigate("/placeorder");
  };
  
   useEffect(() => {
     if (!shippingAddress) {
       navigate("/shipping");
     }
   }, [shippingAddress, navigate]);

  return (
    <div>
      <ChechkoutWizard activeStep={2}></ChechkoutWizard>
      <Form onSubmit={submitHandler}>
        <Typography component="h1" variant="h1">
          Payment Method
        </Typography>
        <List>
          <ListItem>
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="Payment Method"
                name="paymentMethod"
                value={paymentMethodName}
                onChange={(e) => setPaymentMethodName(e.target.value)}
              >
                <FormControlLabel
                  label="PayPal"
                  value="PayPal"
                  checked={paymentMethodName === "PayPal"}
                  control={<Radio />}
                ></FormControlLabel>
                <FormControlLabel
                  label="Stripe"
                  value="Stripe"
                  control={<Radio />}
                ></FormControlLabel>
                <FormControlLabel
                  label="Cash"
                  value="Cash"
                  control={<Radio />}
                ></FormControlLabel>
              </RadioGroup>
            </FormControl>
          </ListItem>
          <ListItem>
            <Button fullWidth type="submit" variant="contained" color="primary">
              Continue
            </Button>
          </ListItem>
          <ListItem>
            <Button
              fullWidth
              type="button"
              variant="contained"
              color="secondary"
              // onClick={() => router.push("/shipping")}
            >
              Back
            </Button>
          </ListItem>
        </List>
      </Form>
    </div>
  );
}

export default Payment