import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import {
  Button, Select,
  Table, InsetText,
} from 'govuk-react-jsx';
import DatePicker from 'react-datepicker';
import { getCategories, getCrimes, getStadiums } from '../../api';
import Loader from '../../components/loader';
import Title from '../../components/title';
import Header from '../../components/header';
import Results from '../../components/results';

const CrimeLookup = (props) => {
  const { location } = props;
  const history = useHistory();

  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [stadiums, setStadiums] = useState([]);
  const [category, setCategory] = useState('');
  const [stadium, setStadium] = useState('');
  const [monthYear, setMonthYear] = useState(location.state?.monthYear
    ? location.state?.monthYear : new Date());
  const [isFetching, setIsFetching] = useState(false);
  const [crimes, setCrimes] = useState([]);
  const [error, setError] = useState(null);

  const getCrimeList = (categoryItem, stadiumItem) => {
    setIsFetching(true);
    getCrimes(categoryItem, stadiumItem, monthYear)
      .then((crimeList) => setCrimes(crimeList))
      .then(() => setIsFetching(false))
      .catch((e) => setError(e));
  };

  useEffect(() => {
    Promise.all([getCategories(), getStadiums()])
      .then(([categoriesList, stadiumsList]) => {
        const categoryItem = location.state?.category
          ? location.state.category : categoriesList[0].url;
        const stadiumItem = location.state?.stadium
          ? location.state.stadium : stadiumsList[0].address;
        setCategory(categoryItem);
        setCategories(categoriesList);
        setStadium(stadiumItem);
        setStadiums(stadiumsList);
        setIsLoading(false);
        getCrimeList(categoryItem, stadiumItem);
      })
      .catch((e) => setError(e))
      .then(() => setIsLoading(false));
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();
    setIsFetching(true);
    getCrimeList(category, stadium);
  };

  if (isLoading || isFetching) return <Loader />;
  if (error) history.push('/500');

  return (
    <>
      <Title title="Home" />
      <Header text="Football Crime Lookup" />

      <form onSubmit={handleSearch}>
        <Select
          className="govuk-!-width-full"
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          items={categories.length && categories.map((item) => ({
            children: item.name,
            value: item.url,
          }))}
        />

        <Select
          className="govuk-!-width-full"
          name="stadium"
          value={stadium}
          onChange={(e) => setStadium(e.target.value)}
          items={stadiums.length && stadiums.map((item) => ({
            children: `${item.venue}, ${item.address}`,
            value: item.address,
          }))}
        />

        <InsetText>
          <Link to={{ pathname: `/crime-lookup/team/${stadiums.length && stadiums.find((el) => el.address === stadium)?.id}`, state: { stadium, category, monthYear } }} className="govuk-body govuk-link">View team details</Link>
        </InsetText>

        <DatePicker
          className="govuk-input"
          name="monthYear"
          selected={monthYear}
          onChange={(date) => setMonthYear(date)}
          dateFormat="MM/yyyy"
          showMonthYearPicker
        />

        <hr className="govuk-section-break govuk-section-break--m" />

        <Button
          type="submit"
        >
          Search
        </Button>

      </form>

      <Results number={crimes.length || 0} />

      <Table
        head={[
          {
            children: 'Crime',
          },
          {
            children: 'Date',
          },
          {
            children: 'Status',
          },
          {
            children: '',
          },
        ]}
        rows={crimes.length && crimes.map((row) => (
          [
            {
              children: row.category,
            },
            {
              children: row.month,
            },
            {
              children: row.outcome_status ? row.outcome_status.category : 'Not available',
            },
            {
              children: row.persistent_id ? <Link to={{ pathname: `/crime-lookup/crime/${row.persistent_id}`, state: { stadium, category, monthYear } }} className="govuk-body govuk-link">View</Link> : '',
            },
          ]
        ))}
      />
    </>
  );
};

CrimeLookup.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      category: PropTypes.string,
      stadium: PropTypes.string,
      monthYear: PropTypes.instanceOf(Date),
    }),
  }).isRequired,
};

export default CrimeLookup;
