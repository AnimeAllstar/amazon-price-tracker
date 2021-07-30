import React from 'react';
import Card from 'react-bootstrap/Card';

const Product = ({ img, url, title, currency, priceLog }) => {
  return (
    <Card className="mt-3">
      <Card.Img variant="top" src={img} style={{ height: '120px', width: 'auto', alignSelf: 'center', paddingTop: '0.5rem' }} />
      <Card.Body>
        <a target="_blank" rel="noreferrer" href={url}>
          <Card.Title>{title}</Card.Title>
        </a>
        <Card.Text>
          Current price: {currency} {priceLog[priceLog.length - 1].price}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
