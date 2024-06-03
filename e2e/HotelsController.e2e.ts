import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/Module';
import * as request from 'supertest';

describe('HotelsController', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET /hotels', () => {
    it(`should be able to get all hotels`, () => {
      return request(app.getHttpServer())
        .get('/hotels')
        .expect(200)
        .expect([
          {
            id: 'iJhz',
            destination_id: 5432,
            name: 'Beach Villas Singapore',
            location: {
              lat: 1.264751,
              lng: 103.824006,
              address: '8 Sentosa Gateway, Beach Villas, 098269',
              city: 'Singapore',
              country: 'Singapore',
            },
            description:
              'Located at the western tip of Resorts World Sentosa, guests at the Beach Villas are guaranteed privacy while they enjoy spectacular views of glittering waters. Guests will find themselves in paradise with this series of exquisite tropical sanctuaries, making it the perfect setting for an idyllic retreat. Within each villa, guests will discover living areas and bedrooms that open out to mini gardens, private timber sundecks and verandahs elegantly framing either lush greenery or an expanse of sea. Guests are assured of a superior slumber with goose feather pillows and luxe mattresses paired with 400 thread count Egyptian cotton bed linen, tastefully paired with a full complement of luxurious in-room amenities and bathrooms boasting rain showers and free-standing tubs coupled with an exclusive array of ESPA amenities and toiletries. Guests also get to enjoy complimentary day access to the facilities at Asia’s flagship spa – the world-renowned ESPA.',
            amenities: {
              general: [
                'Outdoor Pool',
                'Indoor Pool',
                'Business Center',
                'Childcare',
                'Pool',
                'Wifi',
                'Dry Cleaning',
                'Breakfast',
              ],
              room: ['Tv', 'Coffee Machine', 'Kettle', 'Hair Dryer', 'Iron', 'Aircon', 'Bathtub'],
            },
            images: {
              rooms: [
                { link: 'https://d2ey9sqrvkqdfs.cloudfront.net/0qZF/2.jpg', description: 'Double room' },
                { link: 'https://d2ey9sqrvkqdfs.cloudfront.net/0qZF/3.jpg', description: 'Double room' },
                { link: 'https://d2ey9sqrvkqdfs.cloudfront.net/0qZF/4.jpg', description: 'Bathroom' },
              ],
              site: [{ link: 'https://d2ey9sqrvkqdfs.cloudfront.net/0qZF/1.jpg', description: 'Front' }],
              amenities: [
                { link: 'https://d2ey9sqrvkqdfs.cloudfront.net/0qZF/0.jpg', description: 'RWS' },
                { link: 'https://d2ey9sqrvkqdfs.cloudfront.net/0qZF/6.jpg', description: 'Sentosa Gateway' },
              ],
            },
            booking_conditions: [
              "All children are welcome. One child under 12 years stays free of charge when using existing beds. One child under 2 years stays free of charge in a child's cot/crib. One child under 4 years stays free of charge when using existing beds. One older child or adult is charged SGD 82.39 per person per night in an extra bed. The maximum number of children's cots/cribs in a room is 1. There is no capacity for extra beds in the room.",
              'Pets are not allowed.',
              'WiFi is available in all areas and is free of charge.',
              'Free private parking is possible on site (reservation is not needed).',
              "Guests are required to show a photo identification and credit card upon check-in. Please note that all Special Requests are subject to availability and additional charges may apply. Payment before arrival via bank transfer is required. The property will contact you after you book to provide instructions. Please note that the full amount of the reservation is due before arrival. Resorts World Sentosa will send a confirmation with detailed payment information. After full payment is taken, the property's details, including the address and where to collect keys, will be emailed to you. Bag checks will be conducted prior to entry to Adventure Cove Waterpark. === Upon check-in, guests will be provided with complimentary Sentosa Pass (monorail) to enjoy unlimited transportation between Sentosa Island and Harbour Front (VivoCity). === Prepayment for non refundable bookings will be charged by RWS Call Centre. === All guests can enjoy complimentary parking during their stay, limited to one exit from the hotel per day. === Room reservation charges will be charged upon check-in. Credit card provided upon reservation is for guarantee purpose. === For reservations made with inclusive breakfast, please note that breakfast is applicable only for number of adults paid in the room rate. Any children or additional adults are charged separately for breakfast and are to paid directly to the hotel.",
            ],
          },
          {
            id: 'f8c9',
            destination_id: 1122,
            name: 'Hilton Tokyo Shinjuku',
            location: {
              lat: 35.6926,
              lng: 139.690965,
              address: '160-0023, SHINJUKU-KU, 6-6-2 NISHI-SHINJUKU, JAPAN',
              city: 'Tokyo',
              country: 'Japan',
            },
            description:
              "This sleek high-rise property is 10 minutes' walk from Shinjuku train station, 6 minutes' walk from the Tokyo Metropolitan Government Building and 3 km from Yoyogi Park. The polished rooms offer Wi-Fi and flat-screen TVs, plus minibars, sitting areas, and tea and coffeemaking facilities. Suites add living rooms, and access to a club lounge serving breakfast and cocktails. A free shuttle to Shinjuku station is offered. There's a chic Chinese restaurant, a sushi bar, and a grill restaurant with an open kitchen, as well as an English pub and a hip cocktail lounge. Other amenities include a gym, rooftop tennis courts, and a spa with an indoor pool.",
            amenities: {
              general: ['Indoor Pool', 'Business Center', 'Wifi', 'Pool', 'Dry Cleaning', 'Breakfast', 'Bar'],
              room: ['Tv', 'Aircon', 'Minibar', 'Bathtub', 'Hair Dryer'],
            },
            images: {
              rooms: [
                { link: 'https://d2ey9sqrvkqdfs.cloudfront.net/YwAr/i1_m.jpg', description: 'Suite' },
                { link: 'https://d2ey9sqrvkqdfs.cloudfront.net/YwAr/i15_m.jpg', description: 'Double room' },
                { link: 'https://d2ey9sqrvkqdfs.cloudfront.net/YwAr/i10_m.jpg', description: 'Suite' },
                { link: 'https://d2ey9sqrvkqdfs.cloudfront.net/YwAr/i11_m.jpg', description: 'Suite - Living room' },
              ],
              site: [{ link: 'https://d2ey9sqrvkqdfs.cloudfront.net/YwAr/i55_m.jpg', description: 'Bar' }],
              amenities: [{ link: 'https://d2ey9sqrvkqdfs.cloudfront.net/YwAr/i57_m.jpg', description: 'Bar' }],
            },
            booking_conditions: [
              'All children are welcome. One child under 6 years stays free of charge when using existing beds. There is no capacity for extra beds in the room.',
              'Pets are not allowed.',
              'Wired internet is available in the hotel rooms and charges are applicable. WiFi is available in the hotel rooms and charges are applicable.',
              'Private parking is possible on site (reservation is not needed) and costs JPY 1500 per day.',
              'When booking more than 9 rooms, different policies and additional supplements may apply.',
              "The hotel's free shuttle is offered from Bus Stop #21 in front of Keio Department Store at Shinjuku Station. It is available every 20-minutes from 08:20-21:40. The hotel's free shuttle is offered from the hotel to Shinjuku Train Station. It is available every 20-minutes from 08:12-21:52. For more details, please contact the hotel directly. At the Executive Lounge a smart casual dress code is strongly recommended. Attires mentioned below are strongly discouraged and may not permitted: - Night attire (slippers, Yukata robe, etc.) - Gym clothes/sportswear (Tank tops, shorts, etc.) - Beachwear (flip-flops, sandals, etc.) and visible tattoos. Please note that due to renovation works, the Executive Lounge will be closed from 03 January 2019 until late April 2019. During this period, guests may experience some noise or minor disturbances. Smoking preference is subject to availability and cannot be guaranteed.",
            ],
          },
        ]);
    });
  });

  describe('GET /hotels?ids', () => {
    it(`should be able to get all hotels by designated ids`, () => {
      return request(app.getHttpServer())
        .get('/hotels?ids=iJhz,f8c9')
        .expect(200)
        .expect([
          {
            id: 'iJhz',
            destination_id: 5432,
            name: 'Beach Villas Singapore',
            location: {
              lat: 1.264751,
              lng: 103.824006,
              address: '8 Sentosa Gateway, Beach Villas, 098269',
              city: 'Singapore',
              country: 'Singapore',
            },
            description:
              'Located at the western tip of Resorts World Sentosa, guests at the Beach Villas are guaranteed privacy while they enjoy spectacular views of glittering waters. Guests will find themselves in paradise with this series of exquisite tropical sanctuaries, making it the perfect setting for an idyllic retreat. Within each villa, guests will discover living areas and bedrooms that open out to mini gardens, private timber sundecks and verandahs elegantly framing either lush greenery or an expanse of sea. Guests are assured of a superior slumber with goose feather pillows and luxe mattresses paired with 400 thread count Egyptian cotton bed linen, tastefully paired with a full complement of luxurious in-room amenities and bathrooms boasting rain showers and free-standing tubs coupled with an exclusive array of ESPA amenities and toiletries. Guests also get to enjoy complimentary day access to the facilities at Asia’s flagship spa – the world-renowned ESPA.',
            amenities: {
              general: [
                'Outdoor Pool',
                'Indoor Pool',
                'Business Center',
                'Childcare',
                'Pool',
                'Wifi',
                'Dry Cleaning',
                'Breakfast',
              ],
              room: ['Tv', 'Coffee Machine', 'Kettle', 'Hair Dryer', 'Iron', 'Aircon', 'Bathtub'],
            },
            images: {
              rooms: [
                { link: 'https://d2ey9sqrvkqdfs.cloudfront.net/0qZF/2.jpg', description: 'Double room' },
                { link: 'https://d2ey9sqrvkqdfs.cloudfront.net/0qZF/3.jpg', description: 'Double room' },
                { link: 'https://d2ey9sqrvkqdfs.cloudfront.net/0qZF/4.jpg', description: 'Bathroom' },
              ],
              site: [{ link: 'https://d2ey9sqrvkqdfs.cloudfront.net/0qZF/1.jpg', description: 'Front' }],
              amenities: [
                { link: 'https://d2ey9sqrvkqdfs.cloudfront.net/0qZF/0.jpg', description: 'RWS' },
                { link: 'https://d2ey9sqrvkqdfs.cloudfront.net/0qZF/6.jpg', description: 'Sentosa Gateway' },
              ],
            },
            booking_conditions: [
              "All children are welcome. One child under 12 years stays free of charge when using existing beds. One child under 2 years stays free of charge in a child's cot/crib. One child under 4 years stays free of charge when using existing beds. One older child or adult is charged SGD 82.39 per person per night in an extra bed. The maximum number of children's cots/cribs in a room is 1. There is no capacity for extra beds in the room.",
              'Pets are not allowed.',
              'WiFi is available in all areas and is free of charge.',
              'Free private parking is possible on site (reservation is not needed).',
              "Guests are required to show a photo identification and credit card upon check-in. Please note that all Special Requests are subject to availability and additional charges may apply. Payment before arrival via bank transfer is required. The property will contact you after you book to provide instructions. Please note that the full amount of the reservation is due before arrival. Resorts World Sentosa will send a confirmation with detailed payment information. After full payment is taken, the property's details, including the address and where to collect keys, will be emailed to you. Bag checks will be conducted prior to entry to Adventure Cove Waterpark. === Upon check-in, guests will be provided with complimentary Sentosa Pass (monorail) to enjoy unlimited transportation between Sentosa Island and Harbour Front (VivoCity). === Prepayment for non refundable bookings will be charged by RWS Call Centre. === All guests can enjoy complimentary parking during their stay, limited to one exit from the hotel per day. === Room reservation charges will be charged upon check-in. Credit card provided upon reservation is for guarantee purpose. === For reservations made with inclusive breakfast, please note that breakfast is applicable only for number of adults paid in the room rate. Any children or additional adults are charged separately for breakfast and are to paid directly to the hotel.",
            ],
          },
          {
            id: 'f8c9',
            destination_id: 1122,
            name: 'Hilton Tokyo Shinjuku',
            location: {
              lat: 35.6926,
              lng: 139.690965,
              address: '160-0023, SHINJUKU-KU, 6-6-2 NISHI-SHINJUKU, JAPAN',
              city: 'Tokyo',
              country: 'Japan',
            },
            description:
              "This sleek high-rise property is 10 minutes' walk from Shinjuku train station, 6 minutes' walk from the Tokyo Metropolitan Government Building and 3 km from Yoyogi Park. The polished rooms offer Wi-Fi and flat-screen TVs, plus minibars, sitting areas, and tea and coffeemaking facilities. Suites add living rooms, and access to a club lounge serving breakfast and cocktails. A free shuttle to Shinjuku station is offered. There's a chic Chinese restaurant, a sushi bar, and a grill restaurant with an open kitchen, as well as an English pub and a hip cocktail lounge. Other amenities include a gym, rooftop tennis courts, and a spa with an indoor pool.",
            amenities: {
              general: ['Indoor Pool', 'Business Center', 'Wifi', 'Pool', 'Dry Cleaning', 'Breakfast', 'Bar'],
              room: ['Tv', 'Aircon', 'Minibar', 'Bathtub', 'Hair Dryer'],
            },
            images: {
              rooms: [
                { link: 'https://d2ey9sqrvkqdfs.cloudfront.net/YwAr/i1_m.jpg', description: 'Suite' },
                { link: 'https://d2ey9sqrvkqdfs.cloudfront.net/YwAr/i15_m.jpg', description: 'Double room' },
                { link: 'https://d2ey9sqrvkqdfs.cloudfront.net/YwAr/i10_m.jpg', description: 'Suite' },
                { link: 'https://d2ey9sqrvkqdfs.cloudfront.net/YwAr/i11_m.jpg', description: 'Suite - Living room' },
              ],
              site: [{ link: 'https://d2ey9sqrvkqdfs.cloudfront.net/YwAr/i55_m.jpg', description: 'Bar' }],
              amenities: [{ link: 'https://d2ey9sqrvkqdfs.cloudfront.net/YwAr/i57_m.jpg', description: 'Bar' }],
            },
            booking_conditions: [
              'All children are welcome. One child under 6 years stays free of charge when using existing beds. There is no capacity for extra beds in the room.',
              'Pets are not allowed.',
              'Wired internet is available in the hotel rooms and charges are applicable. WiFi is available in the hotel rooms and charges are applicable.',
              'Private parking is possible on site (reservation is not needed) and costs JPY 1500 per day.',
              'When booking more than 9 rooms, different policies and additional supplements may apply.',
              "The hotel's free shuttle is offered from Bus Stop #21 in front of Keio Department Store at Shinjuku Station. It is available every 20-minutes from 08:20-21:40. The hotel's free shuttle is offered from the hotel to Shinjuku Train Station. It is available every 20-minutes from 08:12-21:52. For more details, please contact the hotel directly. At the Executive Lounge a smart casual dress code is strongly recommended. Attires mentioned below are strongly discouraged and may not permitted: - Night attire (slippers, Yukata robe, etc.) - Gym clothes/sportswear (Tank tops, shorts, etc.) - Beachwear (flip-flops, sandals, etc.) and visible tattoos. Please note that due to renovation works, the Executive Lounge will be closed from 03 January 2019 until late April 2019. During this period, guests may experience some noise or minor disturbances. Smoking preference is subject to availability and cannot be guaranteed.",
            ],
          },
        ]);
    });

    it(`should return an empty array if ids do not exist`, () => {
      return request(app.getHttpServer()).get('/hotels?ids=abc,123').expect(200).expect([]);
    });

    it('should return the correct result if some ids are found and some are not', () => {
      return request(app.getHttpServer())
        .get('/hotels?ids=iJhz,abc123')
        .expect(200)
        .expect([
          {
            id: 'iJhz',
            destination_id: 5432,
            name: 'Beach Villas Singapore',
            location: {
              lat: 1.264751,
              lng: 103.824006,
              address: '8 Sentosa Gateway, Beach Villas, 098269',
              city: 'Singapore',
              country: 'Singapore',
            },
            description:
              'Located at the western tip of Resorts World Sentosa, guests at the Beach Villas are guaranteed privacy while they enjoy spectacular views of glittering waters. Guests will find themselves in paradise with this series of exquisite tropical sanctuaries, making it the perfect setting for an idyllic retreat. Within each villa, guests will discover living areas and bedrooms that open out to mini gardens, private timber sundecks and verandahs elegantly framing either lush greenery or an expanse of sea. Guests are assured of a superior slumber with goose feather pillows and luxe mattresses paired with 400 thread count Egyptian cotton bed linen, tastefully paired with a full complement of luxurious in-room amenities and bathrooms boasting rain showers and free-standing tubs coupled with an exclusive array of ESPA amenities and toiletries. Guests also get to enjoy complimentary day access to the facilities at Asia’s flagship spa – the world-renowned ESPA.',
            amenities: {
              general: [
                'Outdoor Pool',
                'Indoor Pool',
                'Business Center',
                'Childcare',
                'Pool',
                'Wifi',
                'Dry Cleaning',
                'Breakfast',
              ],
              room: ['Tv', 'Coffee Machine', 'Kettle', 'Hair Dryer', 'Iron', 'Aircon', 'Bathtub'],
            },
            images: {
              rooms: [
                { link: 'https://d2ey9sqrvkqdfs.cloudfront.net/0qZF/2.jpg', description: 'Double room' },
                { link: 'https://d2ey9sqrvkqdfs.cloudfront.net/0qZF/3.jpg', description: 'Double room' },
                { link: 'https://d2ey9sqrvkqdfs.cloudfront.net/0qZF/4.jpg', description: 'Bathroom' },
              ],
              site: [{ link: 'https://d2ey9sqrvkqdfs.cloudfront.net/0qZF/1.jpg', description: 'Front' }],
              amenities: [
                { link: 'https://d2ey9sqrvkqdfs.cloudfront.net/0qZF/0.jpg', description: 'RWS' },
                { link: 'https://d2ey9sqrvkqdfs.cloudfront.net/0qZF/6.jpg', description: 'Sentosa Gateway' },
              ],
            },
            booking_conditions: [
              "All children are welcome. One child under 12 years stays free of charge when using existing beds. One child under 2 years stays free of charge in a child's cot/crib. One child under 4 years stays free of charge when using existing beds. One older child or adult is charged SGD 82.39 per person per night in an extra bed. The maximum number of children's cots/cribs in a room is 1. There is no capacity for extra beds in the room.",
              'Pets are not allowed.',
              'WiFi is available in all areas and is free of charge.',
              'Free private parking is possible on site (reservation is not needed).',
              "Guests are required to show a photo identification and credit card upon check-in. Please note that all Special Requests are subject to availability and additional charges may apply. Payment before arrival via bank transfer is required. The property will contact you after you book to provide instructions. Please note that the full amount of the reservation is due before arrival. Resorts World Sentosa will send a confirmation with detailed payment information. After full payment is taken, the property's details, including the address and where to collect keys, will be emailed to you. Bag checks will be conducted prior to entry to Adventure Cove Waterpark. === Upon check-in, guests will be provided with complimentary Sentosa Pass (monorail) to enjoy unlimited transportation between Sentosa Island and Harbour Front (VivoCity). === Prepayment for non refundable bookings will be charged by RWS Call Centre. === All guests can enjoy complimentary parking during their stay, limited to one exit from the hotel per day. === Room reservation charges will be charged upon check-in. Credit card provided upon reservation is for guarantee purpose. === For reservations made with inclusive breakfast, please note that breakfast is applicable only for number of adults paid in the room rate. Any children or additional adults are charged separately for breakfast and are to paid directly to the hotel.",
            ],
          },
        ]);
    });
  });

  describe('GET /hotels/:id', () => {
    it('should be able to get hotel by hotel id', () => {
      return request(app.getHttpServer())
        .get('/hotels/iJhz')
        .expect(200)
        .expect({
          id: 'iJhz',
          destination_id: 5432,
          name: 'Beach Villas Singapore',
          location: {
            lat: 1.264751,
            lng: 103.824006,
            address: '8 Sentosa Gateway, Beach Villas, 098269',
            city: 'Singapore',
            country: 'Singapore',
          },
          description:
            'Located at the western tip of Resorts World Sentosa, guests at the Beach Villas are guaranteed privacy while they enjoy spectacular views of glittering waters. Guests will find themselves in paradise with this series of exquisite tropical sanctuaries, making it the perfect setting for an idyllic retreat. Within each villa, guests will discover living areas and bedrooms that open out to mini gardens, private timber sundecks and verandahs elegantly framing either lush greenery or an expanse of sea. Guests are assured of a superior slumber with goose feather pillows and luxe mattresses paired with 400 thread count Egyptian cotton bed linen, tastefully paired with a full complement of luxurious in-room amenities and bathrooms boasting rain showers and free-standing tubs coupled with an exclusive array of ESPA amenities and toiletries. Guests also get to enjoy complimentary day access to the facilities at Asia’s flagship spa – the world-renowned ESPA.',
          amenities: {
            general: [
              'Outdoor Pool',
              'Indoor Pool',
              'Business Center',
              'Childcare',
              'Pool',
              'Wifi',
              'Dry Cleaning',
              'Breakfast',
            ],
            room: ['Tv', 'Coffee Machine', 'Kettle', 'Hair Dryer', 'Iron', 'Aircon', 'Bathtub'],
          },
          images: {
            rooms: [
              { link: 'https://d2ey9sqrvkqdfs.cloudfront.net/0qZF/2.jpg', description: 'Double room' },
              { link: 'https://d2ey9sqrvkqdfs.cloudfront.net/0qZF/3.jpg', description: 'Double room' },
              { link: 'https://d2ey9sqrvkqdfs.cloudfront.net/0qZF/4.jpg', description: 'Bathroom' },
            ],
            site: [{ link: 'https://d2ey9sqrvkqdfs.cloudfront.net/0qZF/1.jpg', description: 'Front' }],
            amenities: [
              { link: 'https://d2ey9sqrvkqdfs.cloudfront.net/0qZF/0.jpg', description: 'RWS' },
              { link: 'https://d2ey9sqrvkqdfs.cloudfront.net/0qZF/6.jpg', description: 'Sentosa Gateway' },
            ],
          },
          booking_conditions: [
            "All children are welcome. One child under 12 years stays free of charge when using existing beds. One child under 2 years stays free of charge in a child's cot/crib. One child under 4 years stays free of charge when using existing beds. One older child or adult is charged SGD 82.39 per person per night in an extra bed. The maximum number of children's cots/cribs in a room is 1. There is no capacity for extra beds in the room.",
            'Pets are not allowed.',
            'WiFi is available in all areas and is free of charge.',
            'Free private parking is possible on site (reservation is not needed).',
            "Guests are required to show a photo identification and credit card upon check-in. Please note that all Special Requests are subject to availability and additional charges may apply. Payment before arrival via bank transfer is required. The property will contact you after you book to provide instructions. Please note that the full amount of the reservation is due before arrival. Resorts World Sentosa will send a confirmation with detailed payment information. After full payment is taken, the property's details, including the address and where to collect keys, will be emailed to you. Bag checks will be conducted prior to entry to Adventure Cove Waterpark. === Upon check-in, guests will be provided with complimentary Sentosa Pass (monorail) to enjoy unlimited transportation between Sentosa Island and Harbour Front (VivoCity). === Prepayment for non refundable bookings will be charged by RWS Call Centre. === All guests can enjoy complimentary parking during their stay, limited to one exit from the hotel per day. === Room reservation charges will be charged upon check-in. Credit card provided upon reservation is for guarantee purpose. === For reservations made with inclusive breakfast, please note that breakfast is applicable only for number of adults paid in the room rate. Any children or additional adults are charged separately for breakfast and are to paid directly to the hotel.",
          ],
        });
    });

    it('should return a 404 if hotel id does not exist', () => {
      return request(app.getHttpServer())
        .get('/hotels/abc123')
        .expect(404)
        .expect({ message: 'Not Found', statusCode: 404 });
    });
  });

  describe('GET /hotels/destination/:id', () => {
    it('should be able to get hotels by destination id', () => {
      return request(app.getHttpServer())
        .get('/hotels/destination/5432')
        .expect(200)
        .expect([
          {
            id: 'iJhz',
            destination_id: 5432,
            name: 'Beach Villas Singapore',
            location: {
              lat: 1.264751,
              lng: 103.824006,
              address: '8 Sentosa Gateway, Beach Villas, 098269',
              city: 'Singapore',
              country: 'Singapore',
            },
            description:
              'Located at the western tip of Resorts World Sentosa, guests at the Beach Villas are guaranteed privacy while they enjoy spectacular views of glittering waters. Guests will find themselves in paradise with this series of exquisite tropical sanctuaries, making it the perfect setting for an idyllic retreat. Within each villa, guests will discover living areas and bedrooms that open out to mini gardens, private timber sundecks and verandahs elegantly framing either lush greenery or an expanse of sea. Guests are assured of a superior slumber with goose feather pillows and luxe mattresses paired with 400 thread count Egyptian cotton bed linen, tastefully paired with a full complement of luxurious in-room amenities and bathrooms boasting rain showers and free-standing tubs coupled with an exclusive array of ESPA amenities and toiletries. Guests also get to enjoy complimentary day access to the facilities at Asia’s flagship spa – the world-renowned ESPA.',
            amenities: {
              general: [
                'Outdoor Pool',
                'Indoor Pool',
                'Business Center',
                'Childcare',
                'Pool',
                'Wifi',
                'Dry Cleaning',
                'Breakfast',
              ],
              room: ['Tv', 'Coffee Machine', 'Kettle', 'Hair Dryer', 'Iron', 'Aircon', 'Bathtub'],
            },
            images: {
              rooms: [
                { link: 'https://d2ey9sqrvkqdfs.cloudfront.net/0qZF/2.jpg', description: 'Double room' },
                { link: 'https://d2ey9sqrvkqdfs.cloudfront.net/0qZF/3.jpg', description: 'Double room' },
                { link: 'https://d2ey9sqrvkqdfs.cloudfront.net/0qZF/4.jpg', description: 'Bathroom' },
              ],
              site: [{ link: 'https://d2ey9sqrvkqdfs.cloudfront.net/0qZF/1.jpg', description: 'Front' }],
              amenities: [
                { link: 'https://d2ey9sqrvkqdfs.cloudfront.net/0qZF/0.jpg', description: 'RWS' },
                { link: 'https://d2ey9sqrvkqdfs.cloudfront.net/0qZF/6.jpg', description: 'Sentosa Gateway' },
              ],
            },
            booking_conditions: [
              "All children are welcome. One child under 12 years stays free of charge when using existing beds. One child under 2 years stays free of charge in a child's cot/crib. One child under 4 years stays free of charge when using existing beds. One older child or adult is charged SGD 82.39 per person per night in an extra bed. The maximum number of children's cots/cribs in a room is 1. There is no capacity for extra beds in the room.",
              'Pets are not allowed.',
              'WiFi is available in all areas and is free of charge.',
              'Free private parking is possible on site (reservation is not needed).',
              "Guests are required to show a photo identification and credit card upon check-in. Please note that all Special Requests are subject to availability and additional charges may apply. Payment before arrival via bank transfer is required. The property will contact you after you book to provide instructions. Please note that the full amount of the reservation is due before arrival. Resorts World Sentosa will send a confirmation with detailed payment information. After full payment is taken, the property's details, including the address and where to collect keys, will be emailed to you. Bag checks will be conducted prior to entry to Adventure Cove Waterpark. === Upon check-in, guests will be provided with complimentary Sentosa Pass (monorail) to enjoy unlimited transportation between Sentosa Island and Harbour Front (VivoCity). === Prepayment for non refundable bookings will be charged by RWS Call Centre. === All guests can enjoy complimentary parking during their stay, limited to one exit from the hotel per day. === Room reservation charges will be charged upon check-in. Credit card provided upon reservation is for guarantee purpose. === For reservations made with inclusive breakfast, please note that breakfast is applicable only for number of adults paid in the room rate. Any children or additional adults are charged separately for breakfast and are to paid directly to the hotel.",
            ],
          },
        ]);
    });

    it('should return an empty array for a destination id with no hotels', () => {
      return request(app.getHttpServer()).get('/hotels/destination/123456').expect(200).expect([]);
    });
  });
});
