import React, { useEffect,useState } from 'react'
import axios from "axios"
import ProductsCard from './ProductsCard';
import classes from "./Product.module.css";
import Load from '../Load/Load';


function Products() {
    const [products,setproducts]=useState([])
    const [isLoading,setIsloding]=useState(false)
useEffect(()=>{
    setIsloding(true)
    axios.get("https://fakestoreapi.com/products")
    .then((res)=>{
        console.log(res.data)
        setproducts(res.data)
        setIsloding(false)
    }).catch((err)=>{
         console.log(err)
    });



},[])

  return (
    <>
      {isLoading ? (
        <Load />
      ) : (
        <section className={classes.products_container}>
          {products.map((singleProduct) => {
            console.log(singleProduct);
            return (
              <ProductsCard product={singleProduct} key={singleProduct.id} renderAdd={true}/>
            );
          })}
        </section>
      )}
    </>
  );
}

export default Products
