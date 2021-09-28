const request = require('supertest');
const app = require('../server/app.js');

describe('componentWillMount initial request', () => {
  it('returns status code 200', async () => {
    const res = await request(app).get('/get');
    expect(res.status).toEqual(200);
  });

  it('responds with object', async () => {
    const res = await request(app).get('/get');
    expect(res.text).toEqual('[{"id":1,"title":"bear.jpg","img_path":"bear.jpg-1632783034211.jpg"},{"id":2,"title":"cat.jpg","img_path":"cat.jpg-1632783034212.jpg"},{"id":3,"title":"dog.jpg","img_path":"dog.jpg-1632783034213.jpg"},{"id":4,"title":"dolphin.jpg","img_path":"dolphin.jpg-1632783034214.jpg"},{"id":5,"title":"elephant.jpg","img_path":"elephant.jpg-1632783034214.jpg"},{"id":6,"title":"panda.jpg","img_path":"panda.jpg-1632783034215.jpg"},{"id":7,"title":"peacock.jpg","img_path":"peacock.jpg-1632783034215.jpg"},{"id":8,"title":"pig.jpg","img_path":"pig.jpg-1632783034216.jpg"},{"id":9,"title":"sqirrel.jpg","img_path":"sqirrel.jpg-1632783034218.jpg"},{"id":10,"title":"tiger.jpg","img_path":"tiger.jpg-1632783034218.jpg"}]');
  });
});

describe('populate keywords', () => {
  it('returns status code 200', async () => {
    const res = await request(app).get('/keywords/bear.jpg');
    expect(res.status).toEqual(200);
  });
  it('returns default data', async () => {
    const res = await request(app).get('/keywords/bear.jpg');
    expect(res.text).toEqual('[{"keyword":"brown"},{"keyword":"omnivore"},{"keyword":"bear"},{"keyword":"black"},{"keyword":"fur"}]');
  })
});


