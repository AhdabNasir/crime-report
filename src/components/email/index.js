import React from 'react';
import PropTypes from 'prop-types';

const Email = (props) => {
  const { emailAddress } = props;

  return (
    <a href={`mailto:${emailAddress}`} className="govuk-link">{emailAddress}</a>
  );
};

Email.propTypes = {
  emailAddress: PropTypes.string.isRequired,
};

export default Email;
