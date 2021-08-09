import axios from 'axios';
import moment from 'moment';
import { formatDate, formatHyphenText } from '../helpers';

const CRIME_API_BASE = process.env.REACT_APP_CRIME_API_BASE;
const FOOTBALL_API_BASE = process.env.REACT_APP_FOOTBALL_API_BASE;
const POSTCODE_API_BASE = process.env.REACT_APP_POSTCODE_API_BASE;

const headers = { 'X-Auth-Token': process.env.REACT_APP_FOOTBALL_API_KEY };

const getCategories = async () => {
  try {
    const { data } = await axios.get(`${CRIME_API_BASE}/crime-categories`);
    return data;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const getStadiums = async () => {
  try {
    const { data } = await axios.get(`${FOOTBALL_API_BASE}/competitions/2021/teams`, { headers });
    return data.teams;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const getLongLat = async (address) => {
  const postcode = address.split(' ').splice(-2).join(' ');
  try {
    const { data } = await axios.get(`${POSTCODE_API_BASE}/postcodes/${postcode}`);
    return {
      latitude: data.result.latitude,
      longitude: data.result.longitude,
    };
  } catch (error) {
    console.log(error);
    return false;
  }
};

const getCrimes = async (category, stadium, monthYear) => {
  const date = moment(monthYear).format('YYYY-MM');
  try {
    const location = await getLongLat(stadium);
    const { data } = await axios.get(`${CRIME_API_BASE}/crimes-street/${category}?lat=${location.latitude}&lng=${location.longitude}&date=${date}`);
    data.forEach((e) => {
      e.month = formatDate(e.month);
      e.category = formatHyphenText(e.category);
    });
    return data;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const getCrime = async (id) => {
  try {
    const { data } = await axios.get(`${CRIME_API_BASE}/outcomes-for-crime/${id}`);
    data.crime.month = formatDate(data.crime.month);
    data.crime.category = formatHyphenText(data.crime.category);
    data.outcomes.forEach((e) => {
      e.date = formatDate(e.date);
    });
    data.outcomes.sort((a, b) => moment(b.date, 'MM/YYYY').valueOf() - moment(a.date, 'MM/YYYY').valueOf());
    return data;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const getTeam = async (id) => {
  try {
    const { data } = await axios.get(`${FOOTBALL_API_BASE}/teams/${id}`, { headers });
    return data;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export {
  POSTCODE_API_BASE, CRIME_API_BASE, FOOTBALL_API_BASE,
  getCategories, getCrimes,
  getCrime, getStadiums,
  getTeam, getLongLat,
};
