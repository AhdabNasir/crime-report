import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { SummaryList, Table } from 'govuk-react-jsx';
import { getCrime } from '../../api';
import Loader from '../../components/loader';
import Title from '../../components/title';
import Header from '../../components/header';

const CrimeDetails = (props) => {
  const { match, location } = props;
  const history = useHistory();

  const [crimeDetail, setCrimeDetail] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getCrime(match.params.id)
      .then((crime) => setCrimeDetail(crime))
      .then(() => setIsLoading(false))
      .catch((e) => setError(e))
      .then(() => setIsLoading(false));
  }, [match.params.id]);

  if (isLoading) return <Loader />;
  if (error) history.push('/500');

  return (
    <>
      <Link
        to={{
          pathname: '/crime-lookup',
          state: {
            category: location.state?.category,
            stadium: location.state?.stadium,
            monthYear: location.state?.monthYear,
          },
        }}
        className="govuk-back-link"
      >
        Back
      </Link>

      <Title title="Crime details" />

      <Header text={location.state?.stadium} />

      <SummaryList
        rows={[
          {
            key: {
              children: 'Category',
            },
            value: {
              children: crimeDetail.crime.category,
            },
          },
          {
            key: {
              children: 'Street',
            },
            value: {
              children: crimeDetail.crime.location.street.name,
            },
          },
          {
            key: {
              children: 'Date',
            },
            value: {
              children: crimeDetail.crime.month,
            },
          },
          {
            className: 'govuk-summary-list__row--no-border',
            key: {
              children: 'Outcomes',
            },
            value: {
              children: crimeDetail.outcomes.length >= 1 ? (
                <Table
                  head={[
                    {
                      children: 'Category',
                    },
                    {
                      children: 'Date',
                    },
                  ]}
                  rows={crimeDetail.outcomes.map((row) => (
                    [
                      {
                        children: row.category.name,
                      },
                      {
                        children: row.date,
                      },
                    ]
                  ))}
                />
              ) : 'No data available',
            },
          },
        ]}
      />

    </>
  );
};

CrimeDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  location: PropTypes.shape({
    state: PropTypes.shape({
      stadium: PropTypes.string,
      category: PropTypes.string,
      monthYear: PropTypes.instanceOf(Date),
    }),
  }).isRequired,
};

export default CrimeDetails;
