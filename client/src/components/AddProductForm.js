import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useState } from 'react';

const AddProductForm = ({ products, setProducts }) => {
  const [url, setUrl] = useState('');

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
    </React.Fragment>
  );
};

export default AddProductForm;
