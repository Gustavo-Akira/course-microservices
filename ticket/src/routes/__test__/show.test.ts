import request from 'supertest';
import {app} from '../../app';
import mongoose from 'mongoose';

it('returns a 404 if the ticket is not found', async ()=> {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app).get(`/api/tickets/${id}`).send().expect(404);
});

it('returns thet ticket if the ticket is found', async ()=> {
    const response = await request(app)
    .post('/api/tickets')
    .set('Cookie',global.signin())
    .send({
        title:"ticket",
        price:20
    }).expect(201);

    const ticketResponse = await request(app)
        .get(`/api/tickets/${response.body.id}`)
        .send().expect(200);

    expect(ticketResponse.body.title).toEqual("ticket");
    expect(ticketResponse.body.price).toEqual(20);
});