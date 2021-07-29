import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Product from './Product';
import { useState, useEffect } from 'react';

const ProductGrid = () => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const response = await fetch('http://localhost:8080/products');
    const productsJson = await response.json();
    setProducts(productsJson);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <React.Fragment>
      <Container fluid className="m-0">
        <Row xs={1} md={2} lg={3} className="m-0">
          {products.map((prod) => {
            return (
              <Col key={prod.asin}>
                <Product {...prod} />
              </Col>
            );
          })}
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default ProductGrid;
