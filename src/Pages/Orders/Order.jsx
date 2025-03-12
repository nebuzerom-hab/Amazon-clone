import React, { useContext, useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import { db } from "../../Utility/Firebase";
import { DataContent } from "../../components/DataProvider/DataProvider";
import classes from "./Order.module.css";
import ProductsCard from "../../components/Products/ProductsCard";

function Order() {
  const [{ user }, dispatch] = useContext(DataContent);
  const [orders, setOrders] = useState([]);
  console.log(user);

  useEffect(() => {
    console.log(user);
    if (user) {
      db.collection("user")
        .doc(user.uid)
        .collection("orders")
        .orderBy("created", "desc")
        .onSnapshot((snapshot) => {
          console.log(snapshot);
          setOrders(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        });
    } else {
      setOrders([]);
    }
  }, [user]);

  return (
    <Layout>
      <section className={classes.container}>
        <div className={classes.Orders_container}>
          <h2> Your order</h2>
          {
            orders?.length==0 && <div style={{padding:"20px"}}> you don't have an order yet.

            </div>
          }
          <div>
            {orders?.map((eachorder, i) => {
              return (
                <div key={i}>
                  <hr />
                  <p>Order ID:{eachorder?.id}</p>
                  {eachorder?.data?.basket?.map((order) => (
                    <ProductsCard flex={true} product={order} key={order.id} />
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Order;
