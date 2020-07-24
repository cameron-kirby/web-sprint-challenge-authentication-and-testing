const supertest = require("supertest");

const server = require("./server.js");
const { TestScheduler } = require("jest");

describe("server", function () {
    it("runs the tests", function () {
        expect(true).toBe(true);
    });

    describe("POST /api/auth/register works", function () {
        it("should respond with 201 OK", function () {
            return supertest(server)
                .post("/api/auth/register")
                .send({username: "testuser2", password: "testpassword"})
                .then(res => {
                    expect(res.status).toBe(201);
                });
        });

        it("should respond with bad request", function () {
            return supertest(server)
                .post("/api/auth/register")
                .send({username: "testuser"})
                .then(res => {
                    expect(res.status).toBe(400);
                });
        });
    });
    describe("POST /api/auth/login works", function () {
        it("should respond with 201 OK", function () {
            return supertest(server)
                .post("/api/auth/login")
                .send({username: "testuser", password: "testpassword"})
                .then(res => {
                    expect(res.status).toBe(200);
                });
        });
        it("should respond with 400", function () {
            return supertest(server)
                .post("/api/auth/login")
                .send({username: "testuser", password: "wrongpassword"})
                .then(res => {
                    expect(res.status).toBe(401);
                });
        });
    });

    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxLCJ1c2VybmFtZSI6ImRlbW91c2VyIiwiaWF0IjoxNTk1NjA1MTUxLCJleHAiOjE1OTU2MDg3NTF9.SpthuG-zhImTjxiqq1fpQ8XrMR9gAs8Z6bcZBBeaj7Q"
    describe("GET jokes works", function () {
        it("should respond with jokes", function() {
            return supertest(server)
                .get("/api/jokes")
                .set('Authorization', token)
                .then(res => {
                    expect(res.status).toBe(200);
                });
        })
        it("should respond with fail because no token", function() {
            return supertest(server)
                .get("/api/jokes")
                .then(res => {
                    expect(res.status).toBe(401);
                });
        })
    })
});