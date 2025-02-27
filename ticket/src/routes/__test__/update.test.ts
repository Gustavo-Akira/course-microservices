import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';

it('returns a 404 if the provided id does not exist', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
        .put(`/api/tickets/${id}`)
        .set("Cookie", global.signin())
        .send({
            title: 'dsffad',
            price: 20
        }).expect(404);
});

it('returns a 401 if the user is not authenticated', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
        .put(`/api/tickets/${id}`)
        .send({
            title: 'dsffad',
            price: 20
        }).expect(401);
});

it('returns a 401 if the user does not own ticket', async () => {
    const response = await request(app)
        .post(`/api/tickets`)
        .set('Cookie', global.signin())
        .send({
            title: 'dsffad',
            price: 20
        }).expect(201);

    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', global.signin())
        .send({
            title: 'dsffad',
            price: 20
        }).expect(401);

});

it('returns a 400 if the user provides an invalid title or price', async () => {
    const response = await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title: 'test',
            price: 2
        }).expect(201);
    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', global.signin())
        .send({
            title: 'test',
            price: 0
        }).expect(400);
    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', global.signin())
        .send({
            title: 'test',
            price: -10
        }).expect(400);
    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', global.signin())
        .send({
            title: 'test'
        }).expect(400);
    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', global.signin())
        .send({
            title: '',
            price: 10.0
        }).expect(400);
    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', global.signin())
        .send({
            price: 10.0
        }).expect(400);
});

it('update the ticket if everthing is valid and the user owns the ticket', async () => {
    const cookie = global.signin();

    const response = await request(app)
        .post('/api/tickets')
        .set('Cookie', cookie)
        .send({title: 'test', price: 20}).expect(201);

    await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
        title: 'updated',
        price: 20
    }).expect(200);

    const ticketResponse = await request(app).get(`/api/tickets/${response.body.id}`).send();

    expect(ticketResponse.body.title).toEqual("updated");
    expect(ticketResponse.body.price).toEqual(20);
});
