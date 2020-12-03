import React from 'react';
import { useState } from 'react';
import ClientForm from '../Components/Form/ClientForm';
import OrderInformation from '../Components/Form/OrderInformation';
import OrderSummary from '../Components/Form/OrderSummary';
import PaymentForm from '../Components/Form/PaymentForm';
import Header from '../Components/Header';
import Menu from '../Components/Menu';
import lang from "../Lang/en_EN.json"
//Mise ne place dans le state
const handleChange = ({ currentTarget }) => {
  const { value, name } = currentTarget;
  setLogin({ ...login, [name]: value });
};

const OrderPage = ({ lang }) => {
  const [there, setThere] = useState(0);
  const [away, setAway] = useState(0);
  const [choose, setChoose] = useState(0);

  const [data, setData] = useState({});
  const [client, setClient] = useState({
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    address: data.address,
    city: data.city,
    zipcode: data.zipcode,
    phoneNumber: data.phoneNumber
  });
  console.log(client);
  function order() {
    console.log(there, away)
    switch (choose) {
      case 1:
        switch (there) {
          case 1:
            return (<>Apres emporter
              <button className="btn-primary btn" onClick={() => setThere(step => step - 1)}>{lang.back}</button>
            </>);
          default:
            return (
              <>
                <button className="btn-primary btn float-left" onClick={() => setChoose(0)}>{lang.back}</button>
                <button className="btn-primary btn float-right" onClick={() => setThere(step => step + 1)}>{lang.next}</button>
              </>);
        }
      case 2:
        switch (away) {
          case 1: // Menu choice
            return (
              <>
                <div className="container">
                  <Menu />
                  <br />
                  <button className="btn-primary btn float-left" onClick={() => setAway(step => step - 1)}>{lang.back}</button>
                  <button className="btn-primary btn float-right" onClick={() => setAway(step => step + 1)}>{lang.next}</button>

                </div>
              </>);
          case 2: // Order informations
            return (
              <>
                <div className="container">
                  <OrderInformation />
                  <button className="btn-primary btn float-left" onClick={() => setAway(step => step - 1)}>{lang.back}</button>
                  <button className="btn-primary btn float-right" onClick={() => setAway(step => step + 1)}>{lang.next}</button>
                </div>
              </>);
          case 3: // Order summary
            return (
              <>
                <div className="container">
                  <OrderSummary />
                  <button className="btn-primary btn float-left" onClick={() => setAway(step => step - 1)}>{lang.back}</button>
                  <button className="btn-primary btn float-right" onClick={() => setAway(step => step + 1)}>{lang.confirm}</button>
                </div>
              </>);
          case 4: // Payment
            return (
              <>
                <div className="container">
                  <h3>{lang.payment}</h3>
                  <PaymentForm />
                  <button className="btn-primary btn float-left" onClick={() => setAway(step => step - 1)}>{lang.back}</button>
                  <button className="btn-primary btn float-right" onClick={() => setAway(step => step + 1)}>{lang.pay}</button>
                </div>
              </>);
          case 5: // Payment validation
            return (
              <>
                <div className="container">
                  <h3>{lang.paymentConfirmation}</h3>

                  <button className="btn-primary btn float-right" onClick={() => { setChoose(0); setAway(0) }}>OK</button>
                </div>
              </>);
          default: // Client informations
            return (
              <>
                <div className="container">
                  <ClientForm setClient={setClient} />
                  <button className="btn-primary btn float-left" onClick={() => setChoose(0)}>{lang.back}</button>
                  <button className="btn-primary btn float-right" onClick={() => setAway(step => step + 1)}>{lang.next}</button>
                </div>
              </>);
        };

      default:
        return (<>
          <div className="container">
            <div className="d-flex justify-content-center align-items-center">
              <a className="btn text-primary border-primary orderBtn" onClick={() => setChoose(1)}><h3>{lang.there}</h3></a>
              <a className="btn text-dark border-dark orderBtn" onClick={() => setChoose(2)}><h3>{lang.takeAway}</h3></a>
            </div>
          </div>
        </>);
    }
  }

  return (
    <>
      <h2 className="card-title"><Header title={lang.toOrder} /></h2>
      <div className="container">
        <div className="row justify-content-center">
          <form className="formBlock form">
            {order()}
          </form>
        </div>
      </div>
    </>
  );
}

export default OrderPage;