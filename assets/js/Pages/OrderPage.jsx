import React, { useContext } from 'react';
import Header from '../Components/Header';
import StepForm from '../Components/StepForm';
import { LangContext } from '../Context/LangContext';

const OrderPage = ({ match }) => {

  const { lang } = useContext(LangContext);

  return (
    <>
      <Header title={lang.toOrder} />
      <div className="container">
        <div className="row justify-content-center">
          <form className="d-flex blockStep">
            <StepForm match={match} />
          </form>
        </div>
      </div>
    </>
  );
}

export default OrderPage;