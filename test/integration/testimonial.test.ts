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
    await server.close();
  });

  afterAll(async () => {
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

      await Testimonial.insertMany(testimonials);

      const res = await request(server).get('/testimonials');

      expect(res.status).toBe(200);
      expect(res.body.data.length).toBe(2);

      await Testimonial.collection.drop();
    });
  });

  describe('GET /:id', () => {
    it('should return a testimonial if valid id is passed', async () => {
      const testimonials = new Testimonial({
        author: 'Author1',
        description: 'description1',
        authorDesignation: 'Developer',
      });

      await testimonials.save();

      const res = await request(server).get(`/testimonial/${testimonials._id}`);

      expect(res.status).toBe(200);
      expect(res.body.data.author).toBe(testimonials.author);

      await Testimonial.collection.drop();
    });

    it('should return 404 if no testimonial with given id exists', async () => {
      const id = new mongoose.Types.ObjectId();
      const res = await request(server).get(`/testimonial/${id}`);

      expect(res.status).toBe(404);
    });
  });
});
