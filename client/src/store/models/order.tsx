interface ILocation {
  lat: number;
  lng: number;
  address: string;
  name: string;
  vicinity: string;
  googleAddressId: string;
}

interface IshippingAddress {
  fullName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  //location: ILocation;
}

interface IpaymentResult {
  id: string;
  status: string;
  update_time: string;
  email_address: string;
}

export interface IOrder {
  userId: string;
  products: { productId: string; quantity: number };
  shippingAddress: IshippingAddress;
  paymentMethod: string;
  paymentResult: IpaymentResult;
  itemsPrice:number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
  isPaid: boolean;
  paidAt: Date ;
  isDelivered: boolean;
  deliveredAt: Date ;
}
