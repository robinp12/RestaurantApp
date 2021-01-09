import React, { useContext, useState } from 'react';
import Header from '../Components/Header';
import StepForm from '../Components/StepForm';
import { LangContext } from '../Context/LangContext';

const OrderPage = ({ match }) => {

  const { lang } = useContext(LangContext);
  const [where, setWhere] = useState();

  return (
    <>
      <Header title={typeof (where) == "undefined" ? lang.toOrder : where == 1 ? lang.orderThere : lang.orderAway} />
      <div className="container">
        <div className="row justify-content-center">
          <div className="d-flex blockStep">
            <StepForm match={match} setWhere={setWhere} />
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderPage;