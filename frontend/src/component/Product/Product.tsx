import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Rating from '../Rating/Rating';
import axios from 'axios';
import { useContext, useEffect, useRef, useState } from 'react';
import { Store } from '../../Store';
import ProductType from '../../types/ProductType';
import ActionEnum from '../../enums/Action';

type ProductProps = {
  product: ProductType;
};

function Product(props: ProductProps) {
  const { product } = props;
  // const { state, dispatch: ctxDispatch } = useContext(Store);
  // const { product } = props;
  const { state, dispatch: ctxDispatch } = useContext(Store) ?? {
    state: null,
    dispatch: () => {},
  };

  const [isIntersecting, setIsIntersecting] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  const {
    cart: { cartItems },
  } = state!;

  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    });
    observer.observe(ref.current!);
    return () => observer.disconnect();
  }, [isIntersecting]);

  useEffect(() => {
    if (isIntersecting) {
      setImageUrl(product.image);
    }
  }, [isIntersecting, imageUrl, product.image]);

  if (!state) {
    // Handle the case where the context value is undefined
    // You can choose to show a loading indicator or provide a default value for state
    return <div>Loading...</div>;
  }

  const addToCartHandler = async (item: any) => {
    const existItem = cartItems.find((x: any) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${item._id}`);

    if (data.countInStock < quantity) {
      window.alert('Sorry, Product is out of stock');
      return;
    }
    ctxDispatch({
      type: ActionEnum.CART_ADD_ITEM,
      payload: { ...item, quantity },
    });
  };

  return (
    <Card className="product" key={product.slug}>
      <Link to={`/product/${product.slug}`}>
        <img
          src={imageUrl}
          className="card-img-top"
          alt={product.name}
          ref={ref}
        />
      </Link>
      <Card.Body>
        <Link to={`/product/${product.slug}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <Card.Text>${product.price}</Card.Text>
        {product.countInStock === 0 ? (
          <Button variant="light" disabled>
            Out of Stock
          </Button>
        ) : (
          <Button onClick={() => addToCartHandler(product)}>Add to Cart</Button>
        )}
      </Card.Body>
    </Card>
  );
}

export default Product;
