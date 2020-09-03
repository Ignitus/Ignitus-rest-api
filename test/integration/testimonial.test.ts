import request from 'supertest';
import mongoose from 'mongoose';
import { Testimonial } from '../../api/Models/testimonialModel';
import { config } from '../../api/Configuration/config';

mongoose.createConnection(config.mongoUrlTest, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

let server: any;

describe('/testimonials', () => {
  beforeEach(() => {
    server = require('../../api/index');
  });

  afterEach(async () => {
    await Testimonial.collection.drop();
    await server.close();
    await mongoose.connection.close();
  });

  describe('GET /', () => {
    it('should return all testimonials', async () => {
      const testimonials = [
        {
          author: 'Author1',
          description: 'description1',
          authorDesignation: 'Developer',
        },
        {
          author: 'Author2',
          description: 'Description2',
          authorDesignation: 'Tester',
        },
      ];

      Testimonial.insertMany(testimonials);

      const res = await request(server).get('/testimonials');

      expect(res.status).toBe(200);
      expect(res.body.data.length).toBe(2);
    });
  });
});
