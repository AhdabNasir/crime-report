import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { SummaryList } from 'govuk-react-jsx';
import { getTeam } from '../../api';
import Loader from '../../components/loader';
import Title from '../../components/title';
import Header from '../../components/header';
import Email from '../../components/email';
import External from '../../components/external';

const TeamDetails = (props) => {
  const { match, location } = props;
  const history = useHistory();

  const [teamDetail, setTeamDetail] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getTeam(match.params.id)
      .then((team) => setTeamDetail(team))
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

      <Title title="Team details" />

      <Header text={teamDetail.venue} />

      <SummaryList
        rows={[
          {
            key: {
              children: 'Team',
            },
            value: {
              children: teamDetail.name,
            },
          },
          {
            key: {
              children: 'Address',
            },
            value: {
              children: teamDetail.address,
            },
          },
          {
            key: {
              children: 'Club colours',
            },
            value: {
              children: teamDetail.clubColors,
            },
          },
          {
            key: {
              children: 'Email',
            },
            value: {
              children: <Email emailAddress={teamDetail.email} />,
            },
          },
          {
            key: {
              children: 'Phone',
            },
            value: {
              children: teamDetail.phone,
            },
          },
          {
            key: {
              children: 'Website',
            },
            value: {
              children: <External link={teamDetail.website} name={teamDetail.website} />,
            },
          },
        ]}
      />

    </>
  );
};

TeamDetails.propTypes = {
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

export default TeamDetails;
