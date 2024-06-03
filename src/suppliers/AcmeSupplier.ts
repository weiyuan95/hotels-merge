import { isUpperCase, toTitleCase } from '../utilities/Text';
import { getCountryName } from '../utilities/CountryCode';

export type RawAcmeData = {
  Id: string;
  DestinationId: number;
  Name: string;
  Latitude: number | null | string;
  Longitude: number | null | string;
  Address: string;
  City: string;
  Country: string;
  PostalCode: string;
  Description: string;
  Facilities: string[];
};

export type AcmeData = {
  Id: string;
  DestinationId: number;
  Name: string;
  Latitude: number | null;
  Longitude: number | null;
  Address: string;
  City: string;
  Country: string;
  PostalCode: string;
  Description: string;
  Facilities: string[];
};

/**
 * This class requests the raw response from the ACME supplier and provides cleaned data to its consumer.
 */
export class AcmeSupplier {
  // If necessary, any other API connection configuration options for this supplier can go into this class.
  private readonly endpoint = 'https://5f2be0b4ffc88500167b85a0.mockapi.io/suppliers/acme';

  async getAcmeData(): Promise<AcmeData[]> {
    const response = await fetch(this.endpoint);
    const jsonResp = await response.json();

    // We do not validate the response shape here since we assume that the API supplier will not make breaking changes
    return this.process(jsonResp);
  }

  /**
   * Process the data (values) from the API response in-place, keeping the shape of the response intact.
   * @param acmeResponse
   */
  private process(acmeResponse: RawAcmeData[]): AcmeData[] {
    const processors = [this.cleanStrings, this.cleanFacilities, this.cleanLatAndLong, this.countryNameFromCode];

    acmeResponse.map((data) => {
      processors.forEach((process) => {
        // Data is processed in-place
        process(data);
      });
    });

    return acmeResponse as AcmeData[];
  }

  private cleanStrings(data: RawAcmeData): AcmeData {
    for (const [key, value] of Object.entries(data)) {
      if (typeof value === 'string') {
        // Suppressing the strict TS error here since we know that the `value` is definitely a string, and the `key` is definitely
        // and existing key of the data. If we really want to assert and make the compiler happy, we'll need to write a type guard
        // which seems unnecessarily complex
        // @ts-ignore
        data[key] = data[key].trim();
      }
    }

    // Data has been cleaned, safe to type cast
    return data as AcmeData;
  }

  private cleanLatAndLong(data: RawAcmeData): AcmeData {
    data.Latitude = typeof data.Latitude === 'number' ? data.Latitude : null;
    data.Longitude = typeof data.Longitude === 'number' ? data.Longitude : null;

    // Data has been cleaned, safe to type cast
    return data as AcmeData;
  }

  /**
   * Best-effort basis to clean up the facility keywords, so that words like 'BusinessCenter' are properly split.
   * Changes the words to title case for better readability.
   * @param data
   * @private
   */
  private cleanFacilities(data: RawAcmeData): AcmeData {
    data.Facilities = data.Facilities.map((facility) => {
      const trimmed = facility.trim();

      // 'WiFi is a special case, we don't want to split it into 'Wi Fi'
      if (trimmed === 'WiFi') {
        return 'Wifi';
      }

      return toTitleCase(
        facility
          .split('')
          .map((char) => {
            // Add a space before each uppercase character to split the words up
            return isUpperCase(char) ? ' ' + char : char;
          })
          .join('')
          .trim()
      );
    });

    // Data has been cleaned, safe to type cast
    return data as AcmeData;
  }

  private countryNameFromCode(data: RawAcmeData): AcmeData {
    data.Country = getCountryName(data.Country);

    // Data has been cleaned, safe to type cast
    return data as AcmeData;
  }
}
