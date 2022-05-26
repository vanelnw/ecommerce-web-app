import {
  Alert,
  Box,
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
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/configueStore";
import {
  PayPalButtons,
  SCRIPT_LOADING_STATE,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { getOrderDetails, orderPayReset, payOrder } from "../store/order";
import { toast } from "react-toastify";
import { appAxios } from "../config";

const OrderScreen: React.FC = () => {
  const dispatch = useAppDispatch();

  const params = useParams();
  const { id: orderId } = params;

  const { userInfo } = useAppSelector((state) => state.auth);
  const { order, loading, error, loadingPay, successPay } = useAppSelector(
    (state) => state.entities.order
  );

  const {
    shippingAddress,
    paymentMethod,
    orderItems,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    isPaid,
    paidAt,
    isDelivered,
    deliveredAt,
  } = order;

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  function createOrder(data: any, actions: any) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: order.totalPrice },
          },
        ],
      })
      .then((orderID: any) => {
        return orderID;
      });
  }

  function onApprove(data: any, actions: any) {
    return actions.order.capture().then(async function (paymentResult: any) {
      dispatch(payOrder(orderId, paymentResult));

      if (!error) toast.success("Order is paid");
      else toast.error(error);
    });
  }

  function onError(error: any) {
    toast.error((error as Error).message);
  }

  useEffect(() => {
    if (!order._id || successPay || (order._id && order._id !== orderId)) {
      dispatch(getOrderDetails(orderId));

      if (successPay) {
        dispatch(orderPayReset(""));
      }
    } else {
      const loadPaypalScript = async () => {
        const { data: clientId } = await appAxios.get("/api/keys/paypal", {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });

        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": clientId,
            currency: "USD",
          },
        });

        paypalDispatch({
          type: "setLoadingStatus",
          value: SCRIPT_LOADING_STATE.PENDING,
        });
      };

      loadPaypalScript();
    }
  }, [dispatch, successPay, order, orderId, userInfo, paypalDispatch]);

  return (
    <Box sx={{ p: 2 }}>
      <Typography component="h1" variant="h3">
        Order
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert variant="outlined">{error}</Alert>
      ) : (
        <Grid container spacing={1}>
          <Grid item md={9} xs={12}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography component="h2" variant="h5" mb={2}>
                Shipping Address
              </Typography>
              <span>
                {shippingAddress!.fullName}, {shippingAddress!.address},{" "}
                {shippingAddress!.city}, {shippingAddress!.postalCode},{" "}
                {shippingAddress!.country}
              </span>
              <span>
                Status:{" "}
                {isDelivered ? `delivered at ${deliveredAt}` : "not delivered"}
              </span>
            </Paper>

            <Paper elevation={3} sx={{ p: 2, my: 1 }}>
              <Typography component="h2" variant="h5" mb={2}>
                Payment Metod
              </Typography>
              <span>Status: {isPaid ? `paid at ${paidAt}` : "not paid"}</span>
            </Paper>

            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography component="h2" variant="h5">
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
                    {orderItems.map((item: any, i: any) => (
                      <TableRow key={item.i}>
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
              <Typography variant="h5">Order Summary</Typography>
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
                {!order.isPaid && (
                  <Box>
                    {isPending ? (
                      <CircularProgress />
                    ) : (
                      <div>
                        <PayPalButtons
                          createOrder={createOrder}
                          onApprove={onApprove}
                          onError={onError}
                        ></PayPalButtons>
                      </div>
                    )}
                    {loadingPay && <CircularProgress />}
                  </Box>
                )}
              </Box>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default OrderScreen;
