import { toTitleCase } from '../utilities/Text';

export interface PaperfliesData {
  hotel_id: string;
  destination_id: number;
  hotel_name: string;
  location: {
    address: string;
    country: string;
  };
  details: string;
  amenities: {
    general: string[];
    room: string[];
  };
  images: {
    rooms: {
      link: string;
      caption: string;
    }[];
    site: {
      link: string;
      caption: string;
    }[];
  };
  booking_conditions: string[];
}

/**
 * This class requests the raw response from the Paperflies supplier and provides cleaned data to its consumer.
 */
export class PaperfliesSupplier {
  // If necessary, any other API connection configuration options for this supplier can go into this class.
  private readonly endpoint = 'https://5f2be0b4ffc88500167b85a0.mockapi.io/suppliers/paperflies';

  async getPaperfliesData(): Promise<PaperfliesData[]> {
    const response = await fetch(this.endpoint);
    const jsonResp = await response.json();

    // We do not validate the response shape here since we assume that the API supplier will not make breaking changes
    return this.process(jsonResp);
  }

  /**
   * Process the data (values) from the API response in-place, keeping the shape of the response intact.
   * @param paperfliesResponse
   */
  private process(paperfliesResponse: PaperfliesData[]): PaperfliesData[] {
    const processors = [this.cleanStrings, this.titleText];

    paperfliesResponse.map((data) => {
      processors.forEach((process) => {
        // Data is cleaned in-place
        process(data);
      });
    });

    return paperfliesResponse;
  }

  private cleanStrings(data: PaperfliesData): PaperfliesData {
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

  private titleText(data: PaperfliesData): PaperfliesData {
    data.amenities.general = data.amenities.general.map(toTitleCase);
    data.amenities.room = data.amenities.room.map(toTitleCase);

    return data;
  }
}
