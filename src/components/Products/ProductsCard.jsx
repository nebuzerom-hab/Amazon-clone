import React from 'react'
import Rating from "@mui/material/Rating"
import CurrencyFormat from '../CurrencyFormat/Currencyformat';
import classes from "./Product.module.css"
import  {Link} from 'react-router-dom';
import { DataContent } from '../DataProvider/DataProvider';
import { useContext } from 'react';
import { Type } from '../../Utility/action.type';

function ProductsCard({product,flex,renderDesc,renderAdd}) {
    const { image, title, id, rating, price, description } = product;
    const [state,dispatch] = useContext(DataContent);

    console.log(state)
    const addToCart=()=>{
        dispatch({
          type: Type.ADD_TO_BASKET,
          item: { image, title, id, rating, price, description },
        });
    }
  return (
    <div
      className={`${classes.card_container}  ${
        flex ? classes.product_flexed : ""
      }`}
    >
      <Link to={`/products/${id}`}>
        <img src={image} alt="" />
      </Link>
      <div>
        <h3>{title}</h3>
        {renderDesc && <div style={{ maxWidth: "750px" }}> {description} </div>}

        <div className={classes.rating}>
          <Rating value={rating?.rate || 0} precision={0.1} />
          <small>{rating?.count || 0}</small>
        </div>
        <div>
          <CurrencyFormat amount={price} />
        </div>
        {renderAdd && (
          <button className={classes.button} onClick={addToCart}>
            Add to cart
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductsCard
