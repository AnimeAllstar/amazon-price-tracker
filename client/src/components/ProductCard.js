import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Product = ({ asin, img, url, title, currency, priceLog }) => {
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
        <Link to={`/product/${asin}`}>
          <Button variant="outline-primary">history</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default Product;
