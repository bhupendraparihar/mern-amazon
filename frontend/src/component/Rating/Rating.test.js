import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { StoreProvider } from '../Store';
import Rating from './Rating';

describe('Rating:', () => {
  test('should render only 3 full stars', () => {
    const product = {
      rating: 3,
      numReviews: 10,
    };

    const { container } = render(
      <Rating rating={product.rating} numReviews={product.numReviews} />
    );

    const fullStars = container.querySelectorAll('.fas.fa-star');
    expect(fullStars.length).toBe(3);

    const halfStars = container.querySelectorAll('.fas.fa-star-half-alt');
    expect(halfStars.length).toBe(0);
  });

  test('should render only 3.5 stars', () => {
    const product = {
      rating: 3.5,
      numReviews: 10,
    };

    const { container } = render(
      <Rating rating={product.rating} numReviews={product.numReviews} />
    );

    const fullStars = container.querySelectorAll('.fas.fa-star');
    expect(fullStars.length).toBe(3);

    const halfStars = container.querySelectorAll('.fas.fa-star-half-alt');
    expect(halfStars.length).toBe(1);
  });

  test('should render all blank stars', () => {
    const product = {
      rating: 0,
      numReviews: 10,
    };

    const { container } = render(
      <Rating rating={product.rating} numReviews={product.numReviews} />
    );

    const fullStars = container.querySelectorAll('.fas.fa-star');
    expect(fullStars.length).toBe(0);

    const halfStars = container.querySelectorAll('.fas.fa-star-half-alt');
    expect(halfStars.length).toBe(0);

    const emptyStars = container.querySelectorAll('.far.fa-star');
    expect(emptyStars.length).toBe(5);
  });
});
