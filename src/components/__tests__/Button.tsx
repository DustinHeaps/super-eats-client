import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { Button } from '../Button'

describe('<Button />', () => {
  it('should render OK with props', () => {
    const { debug, getByText } = render(
      <Button isValid={true} loading={false} actionText={'test'} />
    );
    // debug()
    getByText('test');
  });

  it('should display loading', () => {
    const { getByText, container } = render(
      <Button isValid={false} loading={true} actionText={'test'} />
    );

    getByText('Loading...');
    expect(container.firstChild).toHaveClass('pointer-events-none');
  });
});