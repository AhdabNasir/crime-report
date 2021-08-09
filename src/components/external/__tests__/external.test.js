import React from 'react';
import renderer from 'react-test-renderer';
import External from '..';

describe('<External/>', () => {
  it('renders <External/> component', () => {
    const tree = renderer
      .create(<External link="www.google.com" name="Google" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
