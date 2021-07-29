import React from 'react';
import Card from 'react-bootstrap/Card';

const Product = ({ url, currency, priceLog }) => {
  return (
    <Card className="mt-3">
      <Card.Body>
        <Card.Title>{url}</Card.Title>
        <Card.Text>
          Current price: {currency} {priceLog[priceLog.length - 1].price}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
