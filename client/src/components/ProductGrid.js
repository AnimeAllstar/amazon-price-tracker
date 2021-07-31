import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ProductCard from './ProductCard';
import { useEffect } from 'react';

const ProductGrid = ({ products, setProducts }) => {
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
      <Container fluid className="m-0 mb-3">
        <Row xs={1} sm={2} md={3} lg={4} className="m-0">
          {products.map((prod) => {
            return (
              <Col key={prod.asin}>
                <ProductCard {...prod} />
              </Col>
            );
          })}
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default ProductGrid;
