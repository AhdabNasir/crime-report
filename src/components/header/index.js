import React from 'react';
import PropTypes from 'prop-types';

const Header = (props) => {
  const { text } = props;

  return (
    <h1 className="govuk-heading-l">
      {text}
    </h1>
  );
};

Header.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Header;
