import mockAxios from 'axios';
import {
  POSTCODE_API_BASE, CRIME_API_BASE, FOOTBALL_API_BASE,
  getCategories, getCrime,
  getLongLat, getTeam, getStadiums,
  getCrimes,
} from '..';

const headers = { 'X-Auth-Token': process.env.REACT_APP_FOOTBALL_API_KEY };

jest.mock('axios');

describe('Crime API', () => {
  afterEach(jest.clearAllMocks);
  it('fetches crime categories', async () => {
    const data = [
      {
        url: 'all-crime',
        name: 'All crime',
      },
      {
        url: 'anti-social-behaviour',
        name: 'Anti-social behaviour',
      },
      {
        url: 'other-crime',
        name: 'Other crime',
      }];
    mockAxios.get.mockImplementation(() => Promise.resolve({ data }));

    const categories = await getCategories();
    expect(categories).toEqual(data);
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(mockAxios.get).toHaveBeenCalledWith(
      `${CRIME_API_BASE}/crime-categories`,
    );
  });

  it('fetches multiple crimes for a given month', async () => {
    const params = {
      category: 'all-crime',
      stadium: '75 Drayton Park London N5 1BU',
      monthYear: new Date('Mon Feb 01 2021 13:59:23 GMT+0000 (Greenwich Mean Time)'),
    };

    const data = [
      {
        category: 'Anti social behaviour',
        outcome_status: null,
        persistent_id: '',
        id: 90688567,
        month: '02/2021',
      },
      {
        category: 'Criminal damage arson',
        outcome_status: {
          category: 'Investigation complete; no suspect identified',
          date: '2021-02',
        },
        persistent_id: 'aa6fcf56ef357b026b73007551632509b2e0f30ce291c31233cc4903a2ae8e03',
        id: 90710215,
        month: '02/2021',
      }];

    const locationData = {
      result: {
        longitude: -0.106371,
        latitude: 51.556667,
      },
    };

    mockAxios.get.mockImplementation((url) => {
      switch (url) {
        case `${POSTCODE_API_BASE}/postcodes/N5 1BU`:
          return Promise.resolve({
            data: locationData,
          });
        case `${CRIME_API_BASE}/crimes-street/${params.category}?lat=${locationData.result.latitude}&lng=${locationData.result.longitude}&date=2021-02`:
          return Promise.resolve({ data });
        default:
          return Promise.reject(new Error('not found'));
      }
    });

    const crimes = await getCrimes(params.category, params.stadium, params.monthYear);
    const location = await getLongLat(params.stadium);
    expect(mockAxios.get).toHaveBeenCalledTimes(3);
    expect(crimes).toEqual(data);
    expect(mockAxios.get).toHaveBeenCalledWith(
      `${POSTCODE_API_BASE}/postcodes/N5 1BU`,
    );
    expect(mockAxios.get).toHaveBeenCalledWith(
      `${CRIME_API_BASE}/crimes-street/${params.category}?lat=${location.latitude}&lng=${location.longitude}&date=2021-02`,
    );
  });

  it('fetches single crime and orders outcomes by date', async () => {
    const id = '123';
    const data = {
      crime: {
        category: 'Criminal damage arson',
        location: {
          latitude: '51.564090',
          street: {
            id: 971840,
            name: 'On or near Somerfield Road',
          },
          longitude: '-0.101056',
        },
        persistent_id: '123',
        id: 89913256,
        month: '01/2021',
      },
      outcomes: [
        {
          category: {
            code: 'no-further-action',
            name: 'Investigation complete; no suspect identified',
          },
          date: '03/2021',
        },
        {
          category: {
            code: 'under-investigation',
            name: 'Under investigation',
          },
          date: '01/2021',
        },
      ],
    };
    mockAxios.get.mockImplementation(() => Promise.resolve({ data }));

    const crime = await getCrime(id);
    expect(crime).toEqual(data);
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(mockAxios.get).toHaveBeenCalledWith(
      `${CRIME_API_BASE}/outcomes-for-crime/${id}`,
    );
  });
});

describe('Postcode API', () => {
  afterEach(jest.clearAllMocks);

  const address = '75 Drayton Park London N5 1BU';

  it('gets long and lat from postcode', async () => {
    const data = {
      result: {
        longitude: -0.106371,
        latitude: 51.556667,
      },
    };
    mockAxios.get.mockImplementation(() => Promise.resolve({ data }));

    const longLat = await getLongLat(address);
    expect(longLat).toEqual(data.result);
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(mockAxios.get).toHaveBeenCalledWith(
      `${POSTCODE_API_BASE}/postcodes/N5 1BU`,
    );
  });
});

describe('Football API', () => {
  afterEach(jest.clearAllMocks);

  const id = 123;

  it('gets team data', async () => {
    const data = {
      id: 123,
      name: 'Arsenal FC',
      shortName: 'Arsenal',
      address: '75 Drayton Park London N5 1BU',
      phone: '+44 (020) 76195003',
      website: 'http://www.arsenal.com',
      email: 'info@arsenal.co.uk',
      clubColors: 'Red / White',
      venue: 'Emirates Stadium',
    };
    mockAxios.get.mockImplementation(() => Promise.resolve({ data }));

    const team = await getTeam(id);
    expect(team).toEqual(data);
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(mockAxios.get).toHaveBeenCalledWith(
      `${FOOTBALL_API_BASE}/teams/${id}`, { headers },
    );
  });

  it('gets stadiums', async () => {
    const data = {
      teams: [
        {
          address: '75 Drayton Park London N5 1BU',
          venue: 'Emirates Stadium',
        }, {
          address: 'Villa Park Birmingham B6 6HE',
          venue: 'Villa Park',
        }],
    };

    mockAxios.get.mockImplementation(() => Promise.resolve({ data }));

    const stadiums = await getStadiums();
    expect(stadiums).toEqual(data.teams);
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(mockAxios.get).toHaveBeenCalledWith(
      `${FOOTBALL_API_BASE}/competitions/2021/teams`, { headers },
    );
  });
});
