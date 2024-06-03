import { AcmeData } from '../suppliers/AcmeSupplier';
import { PaperfliesData } from '../suppliers/PaperfliesSupplier';
import { PatagoniaData } from '../suppliers/PatagoniaSupplier';
import { HotelData } from '../stores/ProcessedHotelDataStore';
import { toTitleCase } from '../utilities/Text';

export class HotelDataProcessor {
  constructor(
    private readonly acmeData: AcmeData | undefined,
    private readonly paperFliesData: PaperfliesData | undefined,
    private readonly patagoniaData: PatagoniaData | undefined
  ) {}

  process(): HotelData {
    return {
      id: this.getId(),
      destination_id: this.getDestinationId(),
      name: this.getName(),
      location: {
        lat: this.getLatitude(),
        lng: this.getLongitude(),
        address: this.getAddress(),
        city: this.getCity(),
        country: this.getCountry(),
      },
      description: this.getDescription(),
      amenities: {
        general: this.getGeneralAmenities(),
        room: this.getRoomAmenities(),
      },
      images: {
        rooms: this.getRoomImages(),
        site: this.getSiteImages(),
        amenities: this.getAmenitiesImages(),
      },
      booking_conditions: this.getBookingConditions(),
    };
  }

  private getId(): HotelData['id'] {
    // Where the hotel id come from doesn't matter, since they are all sanitised based on the assumptions
    const id = this.acmeData?.Id ?? this.paperFliesData?.hotel_id ?? this.patagoniaData?.id;

    // Should not be possible to have an undefined id, but check for completeness
    if (!id) {
      throw new Error('No id found in any of the data sources');
    }

    return id;
  }

  private getDestinationId(): HotelData['destination_id'] {
    // Where the destination id come from doesn't matter, since they are all sanitised based on the assumptions
    const destinationId =
      this.acmeData?.DestinationId ?? this.paperFliesData?.destination_id ?? this.patagoniaData?.destination;

    if (!destinationId) {
      throw new Error('No destination id found in any of the data sources');
    }

    return destinationId;
  }

  private getName(): HotelData['name'] {
    /**
     * Patagonia seems to give the most accurate name (Hilton Tokyo Shinjuku) followed by Acme (Hilton Shinjuku Tokyo).
     * Paperflies is used as a last resort since it is the least accurate (Hilton Tokyo).
     */
    const name = this.patagoniaData?.name ?? this.acmeData?.Name ?? this.paperFliesData?.hotel_name;

    if (!name) {
      throw new Error('No name found in any of the data sources');
    }

    return name;
  }

  private getLatitude(): HotelData['location']['lat'] {
    // Order doesn't matter since both suppliers provide the same data
    const lat = this.acmeData?.Latitude ?? this.patagoniaData?.lat;

    if (!lat) {
      throw new Error('No latitude found in any of the data sources');
    }

    return lat;
  }

  private getLongitude(): HotelData['location']['lng'] {
    // Order doesn't matter since both suppliers provide the same data
    const lng = this.acmeData?.Longitude ?? this.patagoniaData?.lng;

    if (!lng) {
      throw new Error('No longitude found in any of the data sources');
    }

    return lng;
  }

  private getAddress(): HotelData['location']['address'] {
    /**
     * Patagonia and Paperflies provide the best address with a postal code, and we fall back on Acme if necessary
     * by concatenating the address and postal code fields.
     *
     * For this specific case, address formatting is left to the client to handle, since the address is not standardised.
     */
    const address =
      this.patagoniaData?.address ??
      this.paperFliesData?.location.address ??
      `${this.acmeData?.Address} ${this.acmeData?.PostalCode}`;

    if (!address) {
      throw new Error('No address found in any of the data sources');
    }

    return address;
  }

  private getCity(): HotelData['location']['city'] {
    // Only Acme has a city
    const city = this.acmeData?.City;

    if (!city) {
      throw new Error('No city found in any of the data sources');
    }

    return city;
  }

  private getCountry(): HotelData['location']['country'] {
    // Order doesn't matter since both suppliers provide the same data
    const country = this.acmeData?.Country ?? this.paperFliesData?.location.country;

    if (!country) {
      throw new Error('No country found in any of the data sources');
    }

    return country;
  }

  private getDescription(): HotelData['description'] {
    // Prefer Patagonia with the most detailed description, followed by Paperflies, and finally Acme
    const description = this.patagoniaData?.info ?? this.paperFliesData?.details ?? this.acmeData?.Description;

    if (!description) {
      throw new Error('No description found in any of the data sources');
    }

    return description;
  }

  private getGeneralAmenities(): HotelData['amenities']['general'] {
    const commonAmenities = new Set([
      'wifi',
      'parking',
      'pool',
      'gym',
      'restaurant',
      'bar',
      'spa',
      'breakfast',
      'dry cleaning',
    ]);

    // Start with Paperflies data
    const amenities = new Set<string>(
      this.paperFliesData?.amenities.general.map((amenity) => amenity.toLowerCase()) ?? []
    );

    // Merge with Acme data, where we need to check that the 'facility' is a common general amenity since
    // there is no clear distinction between general and room amenities
    (this.acmeData?.Facilities ?? []).forEach((facility) => {
      const lowerCaseFacility = facility.toLowerCase();
      if (!amenities.has(lowerCaseFacility) && commonAmenities.has(lowerCaseFacility)) {
        amenities.add(lowerCaseFacility);
      }
    });

    // Convert all amenities to title case
    const amenitiesArray = Array.from(amenities).map(toTitleCase);

    if (amenitiesArray.length === 0) {
      throw new Error('No room amenities found in any of the data sources');
    }

    return amenitiesArray;
  }

  private getRoomAmenities(): HotelData['amenities']['room'] {
    const commonAmenities = new Set(['tv', 'coffee machine', 'bathtub', 'toilet', 'hairdryer', 'iron', 'aircon']);

    // Start with Paperflies data
    const amenities = new Set<string>(
      this.paperFliesData?.amenities.room.map((amenity) => amenity.toLowerCase()) ?? []
    );

    // Merge with Patagonia data, where all amenities are room amenities
    (this.patagoniaData?.amenities ?? []).forEach((amenity) => {
      const lowerCaseAmenity = amenity.toLowerCase();
      if (!amenities.has(lowerCaseAmenity)) {
        amenities.add(lowerCaseAmenity);
      }
    });

    // Merge with Acme data, where we need to check that the 'facility' is a common room amenity since
    // there is no clear distinction between general and room amenities
    (this.acmeData?.Facilities ?? []).forEach((facility) => {
      const lowerCaseFacility = facility.toLowerCase();
      if (!amenities.has(lowerCaseFacility) && commonAmenities.has(lowerCaseFacility)) {
        amenities.add(lowerCaseFacility);
      }
    });

    // Convert all amenities to title case
    const amenitiesArray = Array.from(amenities).map(toTitleCase);

    if (amenitiesArray.length === 0) {
      throw new Error('No room amenities found in any of the data sources');
    }

    return amenitiesArray;
  }

  private getRoomImages(): HotelData['images']['rooms'] {
    // Assume that each unique URL points to a different image
    const uniqueLinks = new Set<string>();
    const imageData: HotelData['images']['rooms'] = [];

    // Acme has no image data, so we just merge Paperflies and Patagonia data
    if (this.paperFliesData?.images.rooms) {
      this.paperFliesData.images.rooms.forEach((image) => {
        if (!uniqueLinks.has(image.link)) {
          imageData.push({
            link: image.link,
            description: image.caption,
          });
          uniqueLinks.add(image.link);
        }
      });
    }

    if (this.patagoniaData?.images.rooms) {
      this.patagoniaData.images.rooms.forEach((image) => {
        if (!uniqueLinks.has(image.url)) {
          imageData.push({
            link: image.url,
            description: image.description,
          });
          uniqueLinks.add(image.url);
        }
      });
    }

    if (!imageData) {
      throw new Error('No room images found in any of the data sources');
    }

    return imageData;
  }

  private getSiteImages(): HotelData['images']['site'] {
    // Only Paperflies has site images
    const images = this.paperFliesData?.images.site;

    if (!images) {
      throw new Error('No site images found in any of the data sources');
    }

    return images.map((image) => ({ link: image.link, description: image.caption }));
  }

  private getAmenitiesImages(): HotelData['images']['amenities'] {
    // Only Paperflies has amenities images
    const images = this.patagoniaData?.images.amenities;

    if (!images) {
      throw new Error('No amenities images found in any of the data sources');
    }

    return images.map((image) => ({ link: image.url, description: image.description }));
  }

  private getBookingConditions(): HotelData['booking_conditions'] {
    // Only Paperflies has booking conditions
    const bookingCondition = this.paperFliesData?.booking_conditions;

    if (!bookingCondition) {
      throw new Error('No booking conditions found in any of the data sources');
    }

    return bookingCondition;
  }
}
