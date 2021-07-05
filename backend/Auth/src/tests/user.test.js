const supertest = require("supertest");
const UserTest = require("../model/user");
const app = require("../app");
const {generateToken} = require("../utils/auth");
const {setup} = require("./setup");

const request = supertest(app);
const TOKEN = generateToken({ id: 'test' });

describe("/user",()=>{
    beforeAll(async () => {
        await setup();
    });

    afterAll(async () => {
        await setup();
    });

    describe("POST",() => {
        it("should return token and username if user sign up with new record ", async function () {
            const res = await request
                .post("/api/v1/user")
                .send({ username: `newUser`, password: "123" }).set('Authorization', `Bearer ${TOKEN}`);
            expect(res.statusCode).toBe(201);
            expect(Object.keys(res.body)).toContain("token");
            expect(Object.keys(res.body)).toContain("username");
        });

        it("should return error message if request body does not contain username or password", async function () {
            const res = await request.post("/api/v1/user").send({}).set('Authorization', `Bearer ${TOKEN}`);
            expect(res.statusCode).toBe(400);
        });

        it('should return error message if username already exist in database', async function () {
            const res = await request.post("/api/v1/user").send({username:"admin",password:"123"}).set('Authorization', `Bearer ${TOKEN}`);
            expect(res.statusCode).toBe(409);
        });
    })
})


