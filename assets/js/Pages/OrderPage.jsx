import React from 'react';
import { useState } from 'react';
import ClientForm from '../Components/Form/ClientForm';
import OrderInformation from '../Components/Form/OrderInformation';
import OrderSummary from '../Components/Form/OrderSummary';
import PaymentForm from '../Components/Form/PaymentForm';
import Header from '../Components/Header';
import Menu from '../Components/Menu';



const OrderPage = () => {
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

  function order() {
    console.log(there, away)
    switch (choose) {
      case 1:
        switch (there) {
          case 1:
            return (<>Apres emporter
              <button className="btn-primary btn" onClick={() => setThere(step => step - 1)}>Retour</button>
            </>);
          default:
            return (
              <>
                <button className="btn-primary btn float-left" onClick={() => setChoose(0)}>Retour</button>
                <button className="btn-primary btn float-right" onClick={() => setThere(step => step + 1)}>Suivant</button>
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
                  <button className="btn-primary btn float-left" onClick={() => setAway(step => step - 1)}>Retour</button>
                  <button className="btn-primary btn float-right" onClick={() => setAway(step => step + 1)}>Suivant</button>

                </div>
              </>);
          case 2: // Order informations
            return (
              <>
                <div className="container">
                  <OrderInformation />
                  <button className="btn-primary btn float-left" onClick={() => setAway(step => step - 1)}>Retour</button>
                  <button className="btn-primary btn float-right" onClick={() => setAway(step => step + 1)}>Suivant</button>
                </div>
              </>);
          case 3: // Order summary
            return (
              <>
                <div className="container">
                  <OrderSummary />
                  <button className="btn-primary btn float-left" onClick={() => setAway(step => step - 1)}>Retour</button>
                  <button className="btn-primary btn float-right" onClick={() => setAway(step => step + 1)}>Confirmer</button>
                </div>
              </>);
          case 4: // Payment
            return (
              <>
                <div className="container">
                  <h3>Paiement</h3>
                  <PaymentForm />
                  <button className="btn-primary btn float-left" onClick={() => setAway(step => step - 1)}>Retour</button>
                  <button className="btn-primary btn float-right" onClick={() => setAway(step => step + 1)}>Payer</button>
                </div>
              </>);
          case 5: // Payment validation
            return (
              <>
                <div className="container">
                  <h3>Confirmation du payement</h3>

                  <button className="btn-primary btn float-right" onClick={() => { setChoose(0); setAway(0) }}>OK</button>
                </div>
              </>);
          default: // Client informations
            return (
              <>
                <div className="container">
                  <ClientForm />
                  <button className="btn-primary btn float-left" onClick={() => setChoose(0)}>Retour</button>
                  <button className="btn-primary btn float-right" onClick={() => setAway(step => step + 1)}>Suivant</button>
                </div>
              </>);
        };

      default:
        return (<>
          <div className="container">
            <div className="d-flex justify-content-center align-items-center">
              <a className="btn text-primary border-primary orderBtn" onClick={() => setChoose(1)}><h3>Sur place</h3></a>
              <a className="btn text-dark border-dark orderBtn" onClick={() => setChoose(2)}><h3>À emporter</h3></a>
            </div>
          </div>
        </>);
    }
  }

  return (
    <>
      <h2 className="card-title"><Header title={"Commande"} /></h2>
      <div className="container">
        <div className="row justify-content-center">
          <form className="formBlock ">
            {order()}
          </form>
        </div>
      </div>
    </>
  );
}

export default OrderPage;