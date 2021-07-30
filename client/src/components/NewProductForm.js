import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import Product from './Product';

const NewProduct = () => {
  const [products, setProducts] = useState([]);
  const [url, setUrl] = useState('');

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const response = await fetch('http://localhost:8080/products');
    const productsJson = await response.json();
    setProducts(productsJson);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        url: url,
      }),
    };
    const response = await fetch('http://localhost:8080/add-product', options);
    const data = await response.json();
    setProducts((products) => {
      return [...products, data];
    });
  };

  return (
    <React.Fragment>
      <Container fluid="xs" className="mt-4">
        <Form onSubmit={handleSubmit}>
          <Row className="justify-content-center m-0">
            <Col xs="8" md="5">
              <Form.Label htmlFor="inlineFormInput" visuallyHidden>
                Name
              </Form.Label>
              <Form.Control
                className="mb-2"
                id="inlineFormInput"
                placeholder="Add Product"
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </Col>
            <Col className="p-0" xs="2" md="auto">
              <Button type="submit" className="mb-2">
                Add
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
      <Container fluid className="m-0">
        <Row xs={1} sm={2} md={3} lg={4} className="m-0">
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

export default NewProduct;
