import React from 'react';
import renderer from 'react-test-renderer';
import Header from '..';

describe('<Header/>', () => {
  it('renders <Header/> component', () => {
    const tree = renderer
      .create(<Header text="Page header" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
