import React, { useState } from "react";
import { useContext } from "react";
import Layout from "../Layout/Layout";
import { DataContent } from "../../components/DataProvider/DataProvider";
import classes from "./Payment.module.css";
import ProductsCard from "../../components/Products/ProductsCard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "../../components/CurrencyFormat/Currencyformat";
import { axiosInstance } from "../../API/axios";
import { ClipLoader } from "react-spinners";
import { db } from "../../Utility/Firebase";
import { useNavigate } from "react-router-dom";
import { Type } from "../../Utility/action.type";



function Payment() {
  const [{ user, basket },dispatch] = useContext(DataContent);
  console.log(user);

  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);
  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);
  const [cardErr, setCardErr] = useState(null);
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const navigate=useNavigate()

  const handleChange = (e) => {
    e?.error?.message ? setCardErr(e.error.message) : setCardErr("");
  };


  const handlePayment = async (e) => {
    e.preventDefault();

    try {
      setProcessing(true)
      //1.backend || function---->contact to the client secret
      const response = await axiosInstance({
        method: "POST",
        url: `/payment/create?total=${total * 100}`,
        responseType: "json",
      });
      //console.log(response.data);
      const clientSecret = response.data.clientSecret;
      //console.log(clientSecret)
      // client secret confirmation (react side)
      const {paymentIntent} = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });
      // console.log(paymentIntent);
      //3.after confirmation ---> order firbase database to save
      await db
      .collection("user")
      .doc(user.uid)
      .collection("orders")
      .doc(paymentIntent.id)
      .set({

         basket:basket,
         amount:paymentIntent.amount,
         created:paymentIntent.created,


      });
      dispatch({type:Type.SET_BASKET_EMPTY})
      setProcessing(false);
      navigate("/orders",{state:{msg:"you have placed a new order"}})
    } catch (error) {
      console.log(error)
      setProcessing(false)
    }
  };

  return (
    <Layout>
      {/* Render when basket is empty */}
      {basket?.length === 0 && <p>Oops! No item in your cart</p>}

      {/* Render checkout when basket has items */}
      {basket?.length > 0 && (
        <>
          <div className={classes.payment_header}>
            Checkout ({totalItem}) items
          </div>
          <section className={classes.payment}>
            <div className={classes.flex}>
              <h3>Delivery Address</h3>
              <div>
                <div>{user ? user.email : "Loading..."}</div>
                <div>123 Reat</div>
                <div>ky, lousive</div>
              </div>
            </div>
            <hr />
            <div className={classes.flex}>
              <h3>Review items and delivery</h3>
              <div>
                {basket?.map((item, i) => (
                  <ProductsCard product={item} flex={true} key={item.id} />
                ))}
              </div>
            </div>
            <hr />
            <div className={classes.flex}>
              <h3>Payment method</h3>
              <div className={classes.payment_card_container}>
                <div className={classes.payment_detail}>
                  <form onSubmit={handlePayment}>
                    {cardErr && (
                      <small style={{ color: "red" }}>{cardErr}</small>
                    )}
                    <CardElement onChange={handleChange} />
                    <div className={classes.payment_price}>
                      <div>
                        <span style={{ display: "flex", gap: "10px" }}>
                          Total Order | <CurrencyFormat amount={total} />
                        </span>
                      </div>
                      <button type="submit">
                        {processing ? (
                          <div className={classes.ClipLoader}>
                            <ClipLoader
                              size={12}
                              color="grey"
                              speedMultiplier={1}
                            />
                            <p>Please wait</p>
                          </div>
                        ) : (
                          "Pay Now"
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </Layout>
  );
}

export default Payment;
