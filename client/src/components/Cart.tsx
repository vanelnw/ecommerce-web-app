import {
  Avatar,
  Button,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemAvatar,
  NativeSelect,
} from "@mui/material";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { cartRemoved } from "../store/cart";
import { useAppDispatch, useAppSelector } from "../store/configueStore";
import Rating from "./Rating";
import emptyCart from "../assets/Empty-cart.png";
import { cartChanged } from "../store/cart";

const Cart = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.entities.cart);

  const [total, setTotal] = useState<number>(0);

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  useEffect(() => {
    setTotal(
      cart?.cartItems?.reduce(
        (prev, curr) => prev + Number(curr.price) * curr.qty,
        0
      )
    );
  }, [cart]);

  return (
    <div className={classes.root}>
      <div className={classes.productContainer}>
        {cart.cartItems.length ? (
          <List
            component="nav"
            aria-label="main mailbox folders"
            className={classes.list}
          >
            {cart?.cartItems?.map((prod) => (
              <ListItem button className={classes.product}>
                <ListItemAvatar>
                  <Avatar alt={prod.name} src={prod.image} />
                </ListItemAvatar>
                <span>{prod.name}</span>
                <span>₹ {prod.price}</span>
                <Rating rating={prod.ratings} />
                <FormControl className={classes.margin}>
                  <InputLabel htmlFor="demo-customized-select-native">
                    Qty
                  </InputLabel>
                  <NativeSelect
                    id="demo-customized-select-native"
                    value={prod.qty}
                    onChange={(e) =>
                      dispatch(
                        cartChanged({
                          id: prod._id,
                          qty: Number(e.target.value),
                        })
                      )
                    }
                  >
                    <option aria-label="None" value="" />
                    {[...Array(prod.inStock)].map((_, x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </NativeSelect>
                </FormControl>
                <Button
                  variant="contained"
                  onClick={() => dispatch(cartRemoved(prod._id))}
                >
                  <AiFillDelete fontSize="20px" color="red" />
                </Button>
              </ListItem>
            ))}
          </List>
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <img
              src={emptyCart}
              alt="empty cart"
              style={{ width: 500, height: 500 }}
            />
          </Box>
        )}
      </div>
      <div className={classes.filterSummary}>
        <span className="title">
          Subtotal ({cart?.cartItems?.length}) items
        </span>
        <span style={{ fontWeight: 700, fontSize: 20, marginTop: 20 }}>
          Total: ₹ {total}
        </span>
        <Button
          variant="contained"
          disabled={cart?.cartItems?.length === 0}
          style={{ background: "green", color: "white", marginTop: "20px" }}
          onClick={checkoutHandler}
        >
          Proceed to Checkout
        </Button>
        <Link to="/">
          <Button
            variant="contained"
            disabled={cart?.cartItems?.length === 0}
            style={{
              background: "black",
              color: "white",
              marginTop: "20px",
              width: "100%",
            }}
          >
            Continue to Shopping
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Cart;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    margin: {
      //margin: theme.spacing(1),
    },
    productContainer: {
      display: "flex",
      width: "78%",
      padding: "20px",
      flexWrap: "wrap",
      //justifyContent:"space-around"
    },
    list: {
      width: "100%",
    },
    product: {
      display: "flex",
      alignItems: "center",
      width: "100%",
      justifyContent: "space-between",
      height: "100px",
      backgroundColor: "#F5F5DC",
    },
    filterSummary: {
      backgroundColor: "#343a40",
      width: "30%",
      color: "white",
      padding: "20px",
      margin: "20px",
      display: "flex",
      flexDirection: "column",
    },
  })
);
