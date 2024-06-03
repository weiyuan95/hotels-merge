import { toTitleCase } from '../utilities/Text';

export interface PatagoniaData {
  id: string;
  destination: number;
  name: string;
  lat: number;
  lng: number;
  address: string | null;
  info: string | null;
  amenities: string[] | null;
  images: {
    rooms: {
      url: string;
      description: string;
    }[];
    amenities: {
      url: string;
      description: string;
    }[];
  };
}

/**
 * This class requests the raw response from the Patagonia supplier and provides cleaned data to its consumer.
 */
export class PatagoniaSupplier {
  // If necessary, any other API configuration options for this supplier can go into this class.
  private readonly endpoint = 'https://5f2be0b4ffc88500167b85a0.mockapi.io/suppliers/patagonia';

  async getPatagoniaData(): Promise<PatagoniaData[]> {
    const response = await fetch(this.endpoint);
    const jsonResp = await response.json();

    // We do not validate the response shape here since we assume that the API supplier will not make breaking changes
    return this.process(jsonResp);
  }

  /**
   * Process the data (values) from the API response in-place, keeping the shape of the response intact.
   * @param patagoniaResponse
   */
  private process(patagoniaResponse: PatagoniaData[]): PatagoniaData[] {
    const processors = [this.cleanStrings, this.cleanAmenities];

    patagoniaResponse.map((data) => {
      processors.forEach((process) => {
        // Data is processed in-place
        process(data);
      });
    });

    return patagoniaResponse;
  }

  private cleanStrings(data: PatagoniaData): PatagoniaData {
    for (const [key, value] of Object.entries(data)) {
      if (typeof value === 'string') {
        // Suppressing the strict TS error here since we know that the `value` is definitely a string, and the `key` is definitely
        // and existing key of the data. If we really want to assert and make the compiler happy, we'll need to write a type guard
        // which seems unnecessarily complex
        // @ts-ignore
        data[key] = data[key].trim();
      }
    }

    return data;
  }

  private cleanAmenities(data: PatagoniaData): PatagoniaData {
    if (data.amenities) {
      data.amenities = data.amenities.map((amenity) => {
        let cleaned = amenity;

        // Special case for the word tub since it refers to a bathtub
        // This is for consistency with the other suppliers
        if (cleaned.toLowerCase() === 'tub') {
          cleaned = 'bathtub';
        }

        return toTitleCase(cleaned);
      });
    }

    return data;
  }
}
