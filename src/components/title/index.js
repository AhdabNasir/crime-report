import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

const Title = (props) => {
  const { title } = props;

  return (
    <Helmet>
      <title>
        {title}
        {' '}
        |
        Football Crime Lookup
      </title>
    </Helmet>
  );
};

Title.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Title;
