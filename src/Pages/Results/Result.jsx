import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Layout from '../Layout/Layout';
import axios from 'axios';
import ProductsCard from '../../components/Products/ProductsCard';
import classes from "./Result.module.css";
import {productUrl} from "../../API/EndPoints"
import Load from '../../components/Load/Load';

function Result() {
    const [results,setResults]=useState([]);
    const {categoryName}=useParams();
     const [isLoading,setIsloding]=useState(false)

    useEffect(()=>{
    setIsloding(true)
 
        axios
          .get(`${productUrl}/products/category/${categoryName}`)
          .then((res) => {
            console.log(res);
            setResults(res.data);
            setIsloding(false)
            console.log(results)
          })
          .catch((err) => {
            console.log(err);
          });



    },[])
    
    
  return (
    <Layout>
        {isLoading?(<Load/>):( <section>
            <h1 style={{padding:"30px"}}>Results</h1>
            <p style={{padding:"30px"}}>Category/{categoryName}</p>
            <hr/> 
            <div className={classes.products_container}>
                {
                    results?.map((product)=>(
                    
                       <ProductsCard

                        key={product.id}
                        product={product}
                        renderDesc={false}
                        renderAdd={true}
                        />
                    ))
                    
                }


            </div>
        </section>)}
       
    </Layout>
  )
}

export default Result
