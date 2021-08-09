import moment from 'moment';

const formatDate = (date) => moment(new Date(date)).format('MM/YYYY');

const formatHyphenText = (text) => text.charAt(0).toUpperCase() + text.substring(1).replace(/-/g, ' ');

export {
  formatDate, formatHyphenText,
};
