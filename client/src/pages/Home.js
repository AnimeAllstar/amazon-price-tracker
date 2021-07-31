import React from 'react';
import ProductGrid from '../components/ProductGrid';
import AddProductForm from '../components/AddProductForm';
import { useState } from 'react';

const Home = () => {
  const [products, setProducts] = useState([]);

  return (
    <React.Fragment>
      <AddProductForm products={products} setProducts={setProducts} />
      <ProductGrid products={products} setProducts={setProducts} />
    </React.Fragment>
  );
};

export default Home;
