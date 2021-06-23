const supertest = require("supertest");
const app = require("../app");

const request = supertest(app);

it('should return token if request contain valid username and password', async function () {
    const res = await request.post("/api/v1/auth").send({username:"123",password:"123"});
    expect(res.statusCode).toBe(200);
    expect(Object.keys(res.body)).toContain("token");
});

it('should return error message if request body does not contain username or password', async function () {
    const res = await request.post("/api/v1/auth").send({});
    expect(res.statusCode).toBe(400);
});