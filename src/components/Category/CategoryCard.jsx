import React from 'react'
import Category from './Category';
import classes from "./Category.module.css"
import { Link } from 'react-router-dom';


function CategoryCard({data}) {
  return (
    <div className={classes.category}>
      <Link to={`/category/${data.category}`}>
        <span>
          <h2>{data.category}</h2>
        </span>
        <img src={data.image} alt="" />
        <p>shop now</p>
      </Link>
    </div>
  );
}

export default CategoryCard
