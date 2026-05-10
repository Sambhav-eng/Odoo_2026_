const request = require("supertest");
const app = require("../server");
const db = require("../config/db");

// Helper to wait for DB initialization if needed
const waitForDb = () => new Promise(resolve => setTimeout(resolve, 100));

beforeAll(async () => {
    await waitForDb(); // allow db.serialize to finish
});

afterAll((done) => {
    db.close(done);
});

describe("User API", () => {
    const testUser = {
        name: "Test User",
        email: "test@example.com",
        password: "password123"
    };

    it("should register a new user", async () => {
        const res = await request(app)
            .post("/api/users/register")
            .send(testUser);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("token");
        expect(res.body.user).toHaveProperty("email", testUser.email);
    });

    it("should not register a user with an existing email", async () => {
        const res = await request(app)
            .post("/api/users/register")
            .send(testUser);

        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty("message", "User already exists");
    });

    it("should login the user", async () => {
        const res = await request(app)
            .post("/api/users/login")
            .send({ email: testUser.email, password: testUser.password });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("token");
    });

    it("should not login with wrong password", async () => {
        const res = await request(app)
            .post("/api/users/login")
            .send({ email: testUser.email, password: "wrongpassword" });

        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty("message", "Invalid credentials");
    });
});
