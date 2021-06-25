const supertest = require("supertest");
const User = require("../model/user");
const app = require("../app");

const request = supertest(app);

describe("/user",()=>{
    describe("POST",() => {
        it("should return token and username if user sign up with new record ", async function () {
            const res = await request
                .post("/api/v1/user")
                .send({ username: `Operation${Math.random()}`, password: "123" });
            expect(res.statusCode).toBe(201);
            expect(Object.keys(res.body)).toContain("token");
            expect(Object.keys(res.body)).toContain("username");
        });

        it("should return error message if request body does not contain username or password", async function () {
            const res = await request.post("/api/v1/user").send({});
            expect(res.statusCode).toBe(400);
        });

        it('should return error message if username already exist in database', async function () {
            const res = await request.post("/api/v1/user").send({username:"Operation",password:"123"});
            expect(res.statusCode).toBe(409);
        });
    })
})


