import React from 'react';
import { Line } from 'react-chartjs-2';
import { Container, Row, Col } from 'react-bootstrap';

const ProductPriceChart = ({ priceLog }) => {
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

export default ProductPriceChart;
