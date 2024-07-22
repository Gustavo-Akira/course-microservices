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
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
        .put(`/api/tickets/${id}`)
        .set('Cookie', global.signin())
        .send({
            title: 'dsffad',
            price: 20
        }).expect(401);
});

it('returns a 400 if the user provides an invalid title or price', async () => {
    await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title: 'test',
            price: 0
        }).expect(400);
    await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title: 'test',
            price: -10
        }).expect(400);
    await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title: 'test'
        }).expect(400);
    await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title: '',
            price: 10.0
        }).expect(400);
    await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            price: 10.0
        }).expect(400);
});

it('update the ticket if everthing is valid and the user owns the ticket', async () => {
    const title  = 'updated';
    const price = 20;
});
