import { getCountryName } from './CountryCode';

describe('CountryCode', () => {
  it('should return the fully qualified country name for known countries', () => {
    expect(getCountryName('SG')).toStrictEqual('Singapore');
    expect(getCountryName('US')).toStrictEqual('United States');
    expect(getCountryName('GB')).toStrictEqual('United Kingdom');
  });

  it('should return whatever was passed in for unknown inputs', () => {
    expect(getCountryName('ZZ')).toStrictEqual('ZZ');
    expect(getCountryName('XX')).toStrictEqual('XX');
    expect(getCountryName('YY')).toStrictEqual('YY');
  });
});
