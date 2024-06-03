import { PatagoniaSupplier } from './PatagoniaSupplier';

describe('PatagoniaSupplier', () => {
  beforeAll(() => {
    // Suppress the type error since we only want to mock the returned value of `.json()` and not the entire result
    // We can check error cases later
    // @ts-ignore
    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve([
            {
              id: 'iJhz',
              destination: 5432,
              name: 'Beach Villas Singapore',
              lat: 1.264751,
              lng: 103.824006,
              address: '8 Sentosa Gateway, Beach Villas, 098269',
              info: 'Located at the western tip of Resorts World Sentosa, guests at the Beach Villas are guaranteed privacy while they enjoy spectacular views of glittering waters. Guests will find themselves in paradise with this series of exquisite tropical sanctuaries, making it the perfect setting for an idyllic retreat. Within each villa, guests will discover living areas and bedrooms that open out to mini gardens, private timber sundecks and verandahs elegantly framing either lush greenery or an expanse of sea. Guests are assured of a superior slumber with goose feather pillows and luxe mattresses paired with 400 thread count Egyptian cotton bed linen, tastefully paired with a full complement of luxurious in-room amenities and bathrooms boasting rain showers and free-standing tubs coupled with an exclusive array of ESPA amenities and toiletries. Guests also get to enjoy complimentary day access to the facilities at Asia’s flagship spa – the world-renowned ESPA.',
              amenities: ['Aircon', 'Tv', 'Coffee machine', 'Kettle', 'Hair dryer', 'Iron', 'Tub'],
              images: {
                rooms: [
                  {
                    url: 'https://d2ey9sqrvkqdfs.cloudfront.net/0qZF/2.jpg',
                    description: 'Double room',
                  },
                  {
                    url: 'https://d2ey9sqrvkqdfs.cloudfront.net/0qZF/4.jpg',
                    description: 'Bathroom',
                  },
                ],
                amenities: [
                  {
                    url: 'https://d2ey9sqrvkqdfs.cloudfront.net/0qZF/0.jpg',
                    description: 'RWS',
                  },
                  {
                    url: 'https://d2ey9sqrvkqdfs.cloudfront.net/0qZF/6.jpg',
                    description: 'Sentosa Gateway',
                  },
                ],
              },
            },
            {
              id: 'f8c9',
              destination: 1122,
              name: 'Hilton Tokyo Shinjuku',
              lat: 35.6926,
              lng: 139.690965,
              address: null,
              info: null,
              amenities: null,
              images: {
                rooms: [
                  {
                    url: 'https://d2ey9sqrvkqdfs.cloudfront.net/YwAr/i10_m.jpg',
                    description: 'Suite',
                  },
                  {
                    url: 'https://d2ey9sqrvkqdfs.cloudfront.net/YwAr/i11_m.jpg',
                    description: 'Suite - Living room',
                  },
                ],
                amenities: [
                  {
                    url: 'https://d2ey9sqrvkqdfs.cloudfront.net/YwAr/i57_m.jpg',
                    description: 'Bar',
                  },
                ],
              },
            },
          ]),
      })
    );
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should correctly process and clean results', async () => {
    const patagoniaSupplier = new PatagoniaSupplier();

    await expect(patagoniaSupplier.getPatagoniaData()).resolves.toStrictEqual([
      {
        id: 'iJhz',
        destination: 5432,
        name: 'Beach Villas Singapore',
        lat: 1.264751,
        lng: 103.824006,
        address: '8 Sentosa Gateway, Beach Villas, 098269',
        info: 'Located at the western tip of Resorts World Sentosa, guests at the Beach Villas are guaranteed privacy while they enjoy spectacular views of glittering waters. Guests will find themselves in paradise with this series of exquisite tropical sanctuaries, making it the perfect setting for an idyllic retreat. Within each villa, guests will discover living areas and bedrooms that open out to mini gardens, private timber sundecks and verandahs elegantly framing either lush greenery or an expanse of sea. Guests are assured of a superior slumber with goose feather pillows and luxe mattresses paired with 400 thread count Egyptian cotton bed linen, tastefully paired with a full complement of luxurious in-room amenities and bathrooms boasting rain showers and free-standing tubs coupled with an exclusive array of ESPA amenities and toiletries. Guests also get to enjoy complimentary day access to the facilities at Asia’s flagship spa – the world-renowned ESPA.',
        amenities: ['Aircon', 'Tv', 'Coffee Machine', 'Kettle', 'Hair Dryer', 'Iron', 'Bathtub'],
        images: {
          rooms: [
            {
              url: 'https://d2ey9sqrvkqdfs.cloudfront.net/0qZF/2.jpg',
              description: 'Double room',
            },
            {
              url: 'https://d2ey9sqrvkqdfs.cloudfront.net/0qZF/4.jpg',
              description: 'Bathroom',
            },
          ],
          amenities: [
            {
              url: 'https://d2ey9sqrvkqdfs.cloudfront.net/0qZF/0.jpg',
              description: 'RWS',
            },
            {
              url: 'https://d2ey9sqrvkqdfs.cloudfront.net/0qZF/6.jpg',
              description: 'Sentosa Gateway',
            },
          ],
        },
      },
      {
        id: 'f8c9',
        destination: 1122,
        name: 'Hilton Tokyo Shinjuku',
        lat: 35.6926,
        lng: 139.690965,
        address: null,
        info: null,
        amenities: null,
        images: {
          rooms: [
            {
              url: 'https://d2ey9sqrvkqdfs.cloudfront.net/YwAr/i10_m.jpg',
              description: 'Suite',
            },
            {
              url: 'https://d2ey9sqrvkqdfs.cloudfront.net/YwAr/i11_m.jpg',
              description: 'Suite - Living room',
            },
          ],
          amenities: [
            {
              url: 'https://d2ey9sqrvkqdfs.cloudfront.net/YwAr/i57_m.jpg',
              description: 'Bar',
            },
          ],
        },
      },
    ]);
  });
});
