import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';

const ProductDetails = () => {
  const { asin } = useParams();
  const [product, setProduct] = useState({});
  const [isLoading, setLoading] = useState(true);

  const getProduct = async () => {
    const response = await fetch(`http://localhost:8080/product/${asin}`);
    const data = await response.json();
    setProduct(data[0]);
    setLoading(false);
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div className="m-2">
      <Link to="/">
        <Button variant="outline-primary">Home</Button>
      </Link>
      <div className="text-center">
        <h3>{product.title}</h3>
        {!isLoading ? <Chart {...product} /> : <p> loading </p>}
      </div>
    </div>
  );
};

const Chart = ({ priceLog }) => {
  const chartData = {
    labels: priceLog.map((entry) => {
      const date = new Date(parseInt(entry.timestamp));
      const day = date.getUTCDate();
      const month = date.getUTCMonth() + 1;
      return `${day}/${month}`;
    }),
    datasets: [
      {
        label: 'Price',
        data: priceLog.map((entry) => {
          return entry.price;
        }),
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
      },
    ],
  };
  return (
    <Container fluid="xs">
      <Row xs={1} lg={2} className="justify-content-md-center">
        <Col lg={8}>
          <Line data={chartData} />
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetails;
