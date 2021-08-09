import React from 'react';
import renderer from 'react-test-renderer';
import Results from '..';

describe('<Results/>', () => {
  it('renders <Results/> component', () => {
    const tree = renderer
      .create(<Results number={10} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
