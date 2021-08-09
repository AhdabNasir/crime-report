import React from 'react';
import PropTypes from 'prop-types';

const Results = (props) => {
  const { number } = props;

  return (

    <p className="govuk-body">
      Showing
      {' '}
      {number}
      {' '}
      results
    </p>
  );
};

Results.propTypes = {
  number: PropTypes.number.isRequired,
};

export default Results;
