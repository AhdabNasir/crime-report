import React from 'react';
import renderer from 'react-test-renderer';
import Title from '..';

describe('<Title/>', () => {
  it('renders <Title/> component', () => {
    const tree = renderer
      .create(<Title title="Page title" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
