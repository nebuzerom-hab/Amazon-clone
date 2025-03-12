import React from 'react'
import { categoryInfo } from './CategoryInfo'
import CategoryCard from './CategoryCard'

import classes from "./Category.module.css";
function Category() {
  return (
    
      <section className={classes.category_container}>
        {
          categoryInfo.map((infos)=>{
            
         return    <CategoryCard data={infos}/>
          })  
        }
      </section>
    
  )
}

export default Category
