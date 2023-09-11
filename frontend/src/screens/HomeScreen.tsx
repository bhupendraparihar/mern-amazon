// import data from '../data';
import { useEffect, useReducer } from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Product from '../component/Product/Product';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../component/LoadingBox/LoadingBox';
import MessageBox from '../component/MessageBox';
import useGetProductList from '../hooks/GetProductList';

export default function HomeScreen() {
  const { loading, error, products } = useGetProductList();

  return (
    <div>
      <Helmet>
        <title>mern-Amazon</title>
      </Helmet>
      <h1>Featured Products</h1>
      <div className="products">
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <Row>
            {products.map((product: any) => (
              <Col key={product.slug} sm={6} md={4} lg={3} className="mb-3">
                <Product product={product} />
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
}
