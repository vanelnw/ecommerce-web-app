import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ChechkoutWizard from "../components/ChechkoutWizard";
import { useAppDispatch, useAppSelector } from "../store/configueStore";
import { createOrder, orderReset } from "../store/order";
import { toast } from "react-toastify";

const PlaceOrder: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { shippingAddress, paymentMethod, cartItems } = useAppSelector(
    (state) => state.entities.cart
  );

  const { order, loading, success, error } = useAppSelector(
    (state) => state.entities.order
  );

  const round2 = (num: number) => Math.round(num * 100 + Number.EPSILON) / 100; // 123.456 => 123.46
  const itemsPrice = round2(
    cartItems.reduce((a, c) => a + Number(c.price) * c.qty, 0)
  );
  const shippingPrice = itemsPrice > 200 ? 0 : 15;
  const taxPrice = round2(itemsPrice * 0.15);
  const totalPrice = round2(itemsPrice + shippingPrice + taxPrice);

  const placeOrderHandler = async () => {
    dispatch(
      createOrder({
        orderItems: cartItems,
        shippingAddress: shippingAddress,
        paymentMethod: paymentMethod,
        itemsPrice: itemsPrice,
        shippingPrice: shippingPrice,
        taxPrice: taxPrice,
        totalPrice: totalPrice,
      })
    );
  };

  useEffect(() => {
    if (!paymentMethod) {
      navigate("/payment");
    }
  }, [paymentMethod, navigate]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }

    if (success) {
      navigate(`/order/${order._id}`);
      // dispatch(orderReset(''));
    }
  }, [navigate, dispatch, success, order, error]);

  return (
    <Box sx={{ p: 2 }}>
      <ChechkoutWizard activeStep={3}></ChechkoutWizard>
      <Typography component="h1" variant="h4">
        Place Order
      </Typography>

      <Grid container spacing={1}>
        <Grid item md={9} xs={12}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography component="h2" variant="h5">
              Shipping Address
            </Typography>
            <span>
              {shippingAddress!.fullName}, {shippingAddress!.address},{" "}
              {shippingAddress!.city}, {shippingAddress!.postalCode},{" "}
              {shippingAddress!.country}
            </span>
            <Button
              onClick={() => navigate("/shipping")}
              variant="contained"
              color="secondary"
            >
              Edit
            </Button>
          </Paper>

          <Paper elevation={3} sx={{ p: 2, my: 2 }}>
            <Typography component="h2" variant="h5" mb={2}>
              Payment Metod
            </Typography>
            <span>{paymentMethod}</span>
          </Paper>

          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography component="h2" variant="h5" mb={2}>
              OrderItems
            </Typography>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Image</TableCell>
                    <TableCell align="right">Name</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cartItems.map((item) => (
                    <TableRow key={item._id}>
                      <TableCell>
                        <img
                          src={item.image}
                          alt={item.name}
                          width={50}
                          height={50}
                        />
                      </TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.qty}</TableCell>
                      <TableCell>${item.price}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
        <Grid item md={3} xs={12}>
          <Paper elevation={4} sx={{ p: 2 }}>
            <Typography variant="h4" mb={2}>
              Order Summary
            </Typography>
            <Box>
              <Typography>Items:</Typography>
              <Typography align="right">${itemsPrice}</Typography>
            </Box>
            <Box>
              <Typography>Shipping:</Typography>
              <Typography align="right">${shippingPrice}</Typography>
            </Box>
            <Box>
              <Typography>Tax:</Typography>
              <Typography align="right">${taxPrice}</Typography>
            </Box>
            <Box>
              <Typography>
                <strong>Total:</strong>
              </Typography>
              <Typography align="right">
                <strong>${totalPrice}</strong>
              </Typography>

              <Button
                onClick={placeOrderHandler}
                variant="contained"
                type="submit"
                color="primary"
                fullWidth
                disabled={loading}
              >
                Place Order
              </Button>
              {loading && <CircularProgress />}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PlaceOrder;
