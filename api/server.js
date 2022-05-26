const express = require("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { getProductsCategories } = require("./controllers/productController");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");

const cors = require("cors");

const connectDB = require("./config/db");

dotenv.config();

connectDB();

//app.use(cors());
app.use(
  cors({
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200,
  })
);

app.use(express.json());

app.get("/api/keys/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || "sb");
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

app.use(
  express.static(path.join(__dirname, "/client/build"))
);

app.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "/<client>/build", "index.html")
  );
});

app.listen(process.env.PORT || 8000, () => {
  console.log("Backennd server is running");
});
