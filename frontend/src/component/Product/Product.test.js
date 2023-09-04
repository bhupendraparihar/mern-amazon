import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Product from './Product';
import { StoreProvider } from '../Store';

describe('Product', () => {
  test('render all the elements', () => {
    const product = {
      name: 'Nike Slim shirt',
      slug: 'nike-slim-shirt',
      category: 'Shirts',
      image: '/images/p1.jpg', // 679px × 829px
      price: 120,
      countInStock: 10,
      brand: 'Nike',
      rating: 4.5,
      numReviews: 10,
      description: 'high quality shirt',
    };

    render(
      <MemoryRouter>
        <StoreProvider>
          <Product product={product} />
        </StoreProvider>
      </MemoryRouter>
    );

    const imageElement = screen.getByAltText('Nike Slim shirt');
    expect(imageElement).toBeInTheDocument();

    const titleElement = screen.getByText('Nike Slim shirt');
    expect(titleElement).toBeInTheDocument();

    const priceElement = screen.getByText('$120');
    expect(priceElement).toBeInTheDocument();

    const reviewElement = screen.getByText('10 reviews');
    expect(reviewElement).toBeInTheDocument();

    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent('Add to Cart');
  });

  test('render Out of Stock button', () => {
    const product = {
      name: 'Nike Slim shirt',
      slug: 'nike-slim-shirt',
      category: 'Shirts',
      image: '/images/p1.jpg', // 679px × 829px
      price: 120,
      countInStock: 0,
      brand: 'Nike',
      rating: 4.5,
      numReviews: 10,
      description: 'high quality shirt',
    };

    render(
      <MemoryRouter>
        <StoreProvider>
          <Product product={product} />
        </StoreProvider>
      </MemoryRouter>
    );

    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent('Out of Stock');
  });
});
