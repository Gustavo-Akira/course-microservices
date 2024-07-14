import request from "supertest";
import { app } from "../../app";

it('return with details of the logged user', async()=>{
    const cookie = await global.signin(); 
    const response = await request(app)
    .get('/api/users/currentuser').set('Cookie',cookie).send().expect(200);
    expect(response.body.currentUser.email).toEqual('test@test.com');
});

it('return null if not authenticated', async()=>{
    const response = await request(app)
    .get('/api/users/currentuser').send().expect(200);
    expect(response.body.currentUser).toBeUndefined();
});