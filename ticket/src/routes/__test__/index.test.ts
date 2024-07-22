import request from 'supertest';
import { app } from '../../app';

const saveTicket = ()=>request(app).post('/api/tickets').set('Cookie',global.signin()).send({title:'test',price:20});


it('can fetch a list of tickets', async () => {
    await saveTicket();
    await saveTicket();
    await saveTicket();
    const response = await request(app)
    .get('/api/tickets')
    .send()
    .expect(200)
    expect(response.body.length).toEqual(3);
});