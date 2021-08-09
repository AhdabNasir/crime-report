import React from 'react';
import PropTypes from 'prop-types';

const External = (props) => {
  const { link, name } = props;

  return (
    <a rel="noopener noreferrer" target="_blank" className="govuk-link" href={link}>{name}</a>
  );
};

External.propTypes = {
  link: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default External;
