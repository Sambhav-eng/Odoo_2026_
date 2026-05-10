const request = require("supertest");
const app = require("../server");
const db = require("../config/db");

const waitForDb = () => new Promise(resolve => setTimeout(resolve, 100));

let userToken;

beforeAll(async () => {
    await waitForDb();
    // Register and login to get a token
    const res = await request(app)
        .post("/api/users/register")
        .send({ name: "Trip User", email: "trip@example.com", password: "password123" });
    userToken = res.body.token;
});

afterAll((done) => {
    db.close(done);
});

describe("Trip API", () => {
    let tripId;

    it("should fetch general recommendations without auth", async () => {
        const res = await request(app).get("/api/recommendations");
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("recommended");
        expect(Array.isArray(res.body.recommended)).toBe(true);
    });

    it("should return 401 for protected routes without token", async () => {
        const res = await request(app).get("/api/trips");
        expect(res.statusCode).toEqual(401);
    });

    it("should create a new trip", async () => {
        const res = await request(app)
            .post("/api/trips")
            .set("Authorization", `Bearer ${userToken}`)
            .send({
                name: "Summer Vacation",
                description: "Going to the beach",
                start_date: "2026-06-01",
                end_date: "2026-06-10",
                cover_photo: ""
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("message", "Trip created successfully");
        expect(res.body).toHaveProperty("tripId");
        tripId = res.body.tripId;
    });

    it("should fetch user trips", async () => {
        const res = await request(app)
            .get("/api/trips")
            .set("Authorization", `Bearer ${userToken}`);

        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
        expect(res.body[0].name).toBe("Summer Vacation");
    });
});
