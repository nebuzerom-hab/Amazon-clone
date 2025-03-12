import React from 'react'
import Layout from '../Layout/Layout';
import Category from '../../components/Category/Category';
import Carousel  from '../../components/Carousel/Carousel';
import Products from '../../components/Products/Products';

function Landing() {
  return (
    
      <Layout>
      <Carousel />
      <Category />
      <Products />
      </Layout>
    
  );
}

export default Landing
