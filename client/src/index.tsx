import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import "react-alice-carousel/lib/alice-carousel.css";
import store from './store/configueStore';
import { Provider } from "react-redux";
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

//const store = configureStore();

const initialOptions = {
  "client-id": "test",
  currency: "USD",
  intent: "capture",
  "data-client-token": "abc123xyz==",
};

ReactDOM.render(
  <Provider store={store}>

        <PayPalScriptProvider deferLoading={true} options={initialOptions}>
      <App />
      </PayPalScriptProvider>
  </Provider>,

  document.getElementById("root")
);

