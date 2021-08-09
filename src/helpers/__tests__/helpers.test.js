import { formatDate, formatHyphenText } from '..';

describe('formatDate function', () => {
  test('it should format date to MM/YYYY', () => {
    expect(formatDate('2020-11-26')).toEqual('11/2020');
  });
});

describe('formatHyphenText function', () => {
  test('it should remove hyphen from word and format', () => {
    expect(formatHyphenText('anti-social-behaviour')).toEqual('Anti social behaviour');
  });
});
