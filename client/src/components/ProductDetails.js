import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import ProductPriceChart from './ProductPriceChart';

const ProductDetails = () => {
  const { asin } = useParams();
  const [product, setProduct] = useState({});
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const getProduct = async () => {
      const response = await fetch(`http://localhost:8080/product/${asin}`);
      const data = await response.json();
      setProduct(data[0]);
      setLoading(false);
    };

    getProduct();
  }, [asin]);

  return (
    <div className="m-2">
      <Link to="/">
        <Button variant="outline-primary">Home</Button>
      </Link>
      <div className="text-center">
        <h3>{product.title}</h3>
        {!isLoading ? <ProductPriceChart {...product} /> : <p> loading </p>}
      </div>
    </div>
  );
};

export default ProductDetails;
