import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Announce from "./components/Announce";
import Cart from "./components/Cart";
import Header from "./components/Header";
import ProductDetails from "./components/ProductDetails";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProductsList from "./pages/ProductsList";
import Register from "./pages/Register";
import Shipping from "./pages/Shipping";
import "react-toastify/dist/ReactToastify.css";
import Payment from "./pages/Payment";
import PlaceOrder from "./pages/PlaceOrder";
import OrderScreen from "./pages/OrderScreen";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <Announce />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductsList />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/placeorder" element={<PlaceOrder />} />
        <Route path="/order/:id" element={<OrderScreen />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
