import React, { useEffect } from 'react';
import { useState } from 'react';
import CustomerForm from '../Components/Form/CustomerForm';
import OrderForm from '../Components/Form/OrderForm';
import OrderSummary from '../Components/Form/OrderSummary';
import PaymentForm from '../Components/Form/PaymentForm';
import Header from '../Components/Header';
import { MenuOrder } from '../Components/Menu';
import categoriesAPI from '../Services/categoriesAPI';
import productsAPI from '../Services/productsAPI';
import Field from '../Components/Form/Input/Field';

//Mise ne place dans le state
// const handleChange = ({ currentTarget }) => {
//   const { value, name } = currentTarget;
//   setLogin({ ...login, [name]: value });
// };

const OrderPage = ({ lang }) => {

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cart, setCart] = useState([]);

  // const [there, setThere] = useState(0);
  const [away, setAway] = useState(0);
  const [choose, setChoose] = useState(0);

  const [client, setClient] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    zipcode: "",
    phoneNumber: ""
  });
  const [errors, setErrors] = useState({
    lastName: "",
    firstName: "",
    email: "",
    address: "",
    zipcode: "",
    city: "",
    phoneNumber: ""
  });

  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    setClient({ ...client, [name]: value });
  };
  const fetchCat = async () => {
    try {
      const cat = await categoriesAPI.getAllCategories();
      setCategories(cat);
    } catch (error) {
      console.log(error.response);
    }
  }
  const fetchProd = async () => {
    try {
      const prod = await productsAPI.getAllProducts();
      setProducts(prod);
    } catch (error) {
      console.log(error.response);
    }
  }

  const ButtonOrder = ({ children, next, back, disabled }) => {
    return (
      <div className="container">
        {children}
        <button className="btn-primary btn float-left mt-4" onClick={() => setAway(step => step - 1)}>{back}</button>
        <button className="btn-primary btn float-right mt-4" onClick={() => setAway(step => step + 1)} disabled={disabled}>{next}</button>
      </div>
    )
  }

  useEffect(() => {
    fetchCat();
    fetchProd();
  }, [])

  function orderForm() {
    if (choose == 1) {

      // switch (there) {
      //   case 1:
      //     return (<>Apres emporter
      //       <button className="btn-primary btn" onClick={() => setThere(step => step - 1)}>{lang.back}</button>
      //     </>);
      //   default:
      //     return (
      //       <>
      //         <button className="btn-primary btn float-left" onClick={() => setChoose(0)}>{lang.back}</button>
      //         <button className="btn-primary btn float-right" onClick={() => setThere(step => step + 1)}>{lang.next}</button>
      //       </>);
      // }
    }
    else if (choose == 2) {
      switch (away) {
        case 1: // Menu choice
          return (
            <ButtonOrder back={lang.back} next={lang.next}
            // disabled={!cart.length}
            >
              <MenuOrder products={products} categories={categories} setCart={setCart} cart={cart} />
            </ButtonOrder>
          );
        case 2: // Order informations
          return (
            <ButtonOrder back={lang.back} next={lang.next}>
              <OrderForm />
            </ButtonOrder>
          );
        case 3: // Order summary
          return (
            <ButtonOrder back={lang.back} next={lang.confirm}>
              <OrderSummary client={client} />
            </ButtonOrder>
          );
        case 4: // Payment
          return (
            <ButtonOrder back={lang.back} next={lang.next}>
              <h3>{lang.payment}</h3>
              <PaymentForm />
            </ButtonOrder>
          );
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
                <CustomerForm client={client} errors={errors} handleChange={handleChange} />
                <button className="btn-primary btn float-left" onClick={() => setChoose(0)}>{lang.back}</button>
                <button className="btn-primary btn float-right" onClick={() => setAway(step => step + 1)}
                // disabled={!(
                //   client.firstName &&
                //   client.lastName &&
                //   client.email &&
                //   client.zipcode &&
                //   client.city &&
                //   client.phoneNumber &&
                //   client.address
                // )}
                >{lang.next}</button>
              </div>
            </>);
      };
    }
    else {
      return (<>
        <div className="container">
          <div className="d-flex justify-content-center align-items-center">
            {/* <a className="btn text-primary border-primary orderBtn mt-5" onClick={() => setChoose(1)}><h3>{lang.there}</h3></a> */}
            <a className="btn text-dark border-dark orderBtn mt-5" onClick={() => setChoose(2)}><h3>{lang.takeAway}</h3></a>
          </div>
        </div>
      </>);
    }
  }

  const deleteItem = (name) => {

    for (var item in cart) {
      if (cart[item].name === name) {
        cart[item].count--;
        if (cart[item].count === 0) {
          cart.splice(item, 1);
        }
        break;
      }
    }
    console.log(cart)
    setCart([...cart])
  }

  const [bool, setBool] = useState(false);

  return (
    <>
      <h2 className="card-title"><Header title={lang.toOrder} right={"Panier : " + <><button className="btn btn-primary">{cart.length}</button></>} /></h2>
      <div className="container">
        <div className="row justify-content-center">
          <form className="formBlock form">
            {orderForm()}
          </form>
          {cart.length &&
            <div className="form">
              <div className="row">
                <div className="col border-bottom mb-2">
                  <h4>Panier</h4>
                  <button onClick={() => setBool(!bool)} className='btn btn-primary float-right'>x</button>
                </div>
              </div>
              <div className="row">

                <div className="col">
                  {console.log(cart.length)
                  }
                  {bool &&
                    cart.map((e, index) =>
                      <div key={index} className="row">
                        <div className="col">
                          <span className="align-middle">{e.name}</span>
                        </div>
                        <div className="col-2 float-right">
                          <Field type="number" value={e.count} />
                        </div>
                        <div className="col">
                          <button onClick={() => deleteItem(e.name)} className='btn btn-primary float-right'>x</button>
                        </div>
                      </div>
                    )
                  }
                </div>
              </div>
            </div>
            || <></>}
        </div>
      </div>
    </>
  );
}

export default OrderPage;