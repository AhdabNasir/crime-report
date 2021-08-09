import React from 'react';
import renderer from 'react-test-renderer';
import Contact from '..';

describe('<Contact/>', () => {
  it('renders <Contact/> component', () => {
    const tree = renderer
      .create(<Contact text="Please email" email="test@email.com" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
