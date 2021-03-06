import { render } from '@testing-library/react';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Restaurant } from '../Restaurant';


describe('<Restaurant />', () => {
  it('renders OK with props', () => {
    const restaurantProps = {
      id: '1',
      name: 'testName',
      image: 'x',
      categoryName: 'categoryTest',
    };

    const { getByText, container } = render(
      <Router>
        <Restaurant {...restaurantProps} />
      </Router>
    );
    getByText(restaurantProps.name);
    getByText(restaurantProps.categoryName);
    expect(container.firstElementChild).toHaveAttribute(
      'href',
      `/restaurants/${restaurantProps.id}`
    );
  });
});