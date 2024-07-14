import request from 'supertest';
import { app } from '../../app';
import { response } from 'express';

it('returns a 201 on successful signup', async()=>{
    return request(app)
    .post("/api/users/signup")
    .send({
        email: 'akirauekita2002@gmail.com',
        password:'password'
    }).expect(201);
});