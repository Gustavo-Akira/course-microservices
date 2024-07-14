import request from "supertest";
import { app } from "../../app";


it("fails when a email that doesn't exist is passed", async () => {
    await request(app)
        .post('/api/users/signin').send({
            email: "test@test.com",
            password: 'password'
        }).expect(400);
});

it("fails when a incorrect password is passed", async () => {
    await request(app)
        .post('/api/users/signup').send({
            email: "test@test.com",
            password: 'password'
        }).expect(201);
    await request(app)
        .post('/api/users/signin').send({
            email: "test@test.com",
            password: 'pa'
        }).expect(400);
});

it('should have a cookie when given valid credentials', async () => {
    await request(app)
        .post('/api/users/signup').send({
            email: "test@test.com",
            password: 'password'
        }).expect(201);
    const response = await request(app)
        .post('/api/users/signin').send({
            email: "test@test.com",
            password: 'password'
        }).expect(200);
    expect(response.get('Set-Cookie')).toBeDefined();
});