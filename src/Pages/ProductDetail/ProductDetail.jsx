import React, { useEffect } from 'react'
import { useState } from "react";
import { useParams } from 'react-router-dom'
import axios, { Axios } from 'axios';
import { productUrl } from '../../API/EndPoints';
import Layout from '../Layout/Layout';
import ProductsCard from '../../components/Products/ProductsCard';
import Load from '../../components/Load/Load';


function ProductDetail() {
    const {productId}=useParams();
    const [product, setproduct] = useState({});
    const [isLoading,setIsloding]=useState(false)

    useEffect(() => {
        setIsloding(true)
        
        axios.get(`${productUrl}/products/${productId}`)
          .then((res) => {
            console.log(res);

            setproduct(res.data);
            setIsloding(false)
          })
          .catch((err) => {
            console.log(err);
            setIsloding(false)
          });
            
        },[])
    
  return (
    <Layout>
      {isLoading ? (
        <Load />
      ) : (
        <ProductsCard product={product} flex={true} renderDesc={true} renderAdd={true}  />
      )}
    </Layout>
  );
}

export default ProductDetail;
