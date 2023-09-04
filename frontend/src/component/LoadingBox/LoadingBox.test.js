import { render, screen } from '@testing-library/react';
import LoadingBox from './LoadingBox';

describe('LoadingBox:', () => {
  test('renders correctly', () => {
    render(<LoadingBox />);

    const spanElement = screen.getByRole('status');
    expect(spanElement).toBeInTheDocument();
    expect(spanElement).toHaveTextContent('Loading...');
  });
});
