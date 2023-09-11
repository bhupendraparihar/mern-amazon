import { useEffect, useReducer } from 'react';
import axios from 'axios';

type ProductType = {
  _id: string;
  name: string;
  slug: string;
  image: string;
  rating: number;
  numReviews: number;
  price: number;
  countInStock: number;
};
type ProductState = {
  loading: boolean;
  error: string;
  products: ProductType[]; // You should replace 'any' with a specific product type if available
};

type FetchRequestAction = { type: 'FETCH_REQUEST' };
type FetchSuccessAction = { type: 'FETCH_SUCCESS'; payload: any[] };
type FetchFailedAction = { type: 'FETCH_FAILED'; payload: string };

type ProductAction =
  | FetchRequestAction
  | FetchSuccessAction
  | FetchFailedAction;

const reducer = (state: ProductState, action: ProductAction) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, products: action.payload, loading: false };
    case 'FETCH_FAILED':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
function useGetProductList() {
  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    products: [],
    loading: true,
    error: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('/api/products');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err: any) {
        dispatch({ type: 'FETCH_FAILED', payload: err.message });
      }
    };

    fetchData();
  }, []);

  return { loading, error, products };
}

export default useGetProductList;
