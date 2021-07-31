import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ProductCard from './ProductCard';
import { useEffect } from 'react';
import fetchDb from '../utils/fetchDb';

const ProductGrid = ({ products, setProducts }) => {
  useEffect(() => {
    const getProducts = async () => {
      const data = await fetchDb('products');
      setProducts(data);
    };
    getProducts();
  }, [setProducts]);

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
