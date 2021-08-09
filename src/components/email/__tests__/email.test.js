import React from 'react';
import renderer from 'react-test-renderer';
import Email from '..';

describe('<Email/>', () => {
  it('renders <Email/> component', () => {
    const tree = renderer
      .create(<Email emailAddress="test@email.com" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
