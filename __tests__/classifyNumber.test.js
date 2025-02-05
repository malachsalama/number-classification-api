const request = require("supertest");
const app = require("../app");

describe("Number Classification API", () => {
  // Test valid input
  it("Should classify a valid number and return it's properties", async () => {
    const res = await request(app)
      .get("/api/classify-number?number=28")
      .expect(200);

    expect(res.body).toEqual({
      number: 28,
      is_prime: false,
      is_perfect: true,
      properties: ["even"],
      digit_sum: 10,
      fun_fact: expect.any(String), // Fun fact is dynamic, so we use expect.any
    });
  });
});
