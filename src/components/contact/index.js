import React from 'react';
import PropTypes from 'prop-types';
import Email from '../email';

const Contact = (props) => {
  const { text, email } = props;

  return (

    <p className="govuk-body">
      {text}
      {' '}
      <Email emailAddress={email} />
      .
    </p>
  );
};

Contact.propTypes = {
  text: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default Contact;
