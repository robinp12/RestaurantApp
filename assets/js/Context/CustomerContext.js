import { createContext } from "react";

export const CustomerContext = createContext({
  customer: {
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    zipcode: "",
    phoneNumber: "",
  },
  setCustomer: (e) => {},
});
