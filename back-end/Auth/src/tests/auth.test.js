const supertest = require("supertest");
const app = require("../app");

const request = supertest(app);

describe("/auth",()=>{
  describe("POST",() => {
    it("should return token and username if request contain valid username and password", async function () {
      const res = await request
          .post("/api/v1/auth")
          .send({ username: "Operation", password: "123" });
      expect(res.statusCode).toBe(200);
      expect(Object.keys(res.body)).toContain("token");
      expect(Object.keys(res.body)).toContain("username");
    });

    it("should return error message if request body does not contain username or password", async function () {
      const res = await request.post("/api/v1/auth").send({});
      expect(res.statusCode).toBe(400);
    });

    it('should return error message if username does not find in database', async function () {
      const res = await request.post("/api/v1/auth").send({username:"Admin",password:"123"});
      expect(res.statusCode).toBe(404);
    });

    it('should return error message if password does not match username in database', async function () {
      const res = await request.post("/api/v1/auth").send({username:"Operation",password:"111"});
      expect(res.statusCode).toBe(401);
    });
  })
})






