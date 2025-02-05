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

  //  Test invalid input (non-numeric)
  it("Should return an error for non-numeric input", async () => {
    const res = await request(app)
      .get("/api/classify-number?number=malach")
      .expect(400);
    expect(res.body).toEqual({
      number: "malach",
      error: true,
    });
  });

  //   Test missing input
  it("Should return an error if the number parameter is not provided", async () => {
    const res = await request(app).get("/api/classify-number").expect(400);
    expect(res.body).toEqual({
      number: null,
      error: true,
    });
  });

  // Test edge case: number 1
  it("Should handle the number 1 correctly", async () => {
    const res = await request(app)
      .get("/api/classify-number?number=1")
      .expect(200);

    expect(res.body).toEqual({
      number: 1,
      is_prime: false,
      is_perfect: false,
      properties: ["armstrong", "odd"],
      digit_sum: 1,
      fun_fact: expect.any(String),
    });
  });

  // Test edge case: number 2 (smallest prime)
  it("should handle the number 2 correctly", async () => {
    const res = await request(app)
      .get("/api/classify-number?number=2")
      .expect(200);

    expect(res.body).toEqual({
      number: 2,
      is_prime: true,
      is_perfect: false,
      properties: ["armstrong", "even"],
      digit_sum: 2,
      fun_fact: expect.any(String),
    });
  });

  // Test edge case: number 6 (smallest perfect number)
  it("should handle the number 6 correctly", async () => {
    const res = await request(app)
      .get("/api/classify-number?number=6")
      .expect(200);

    expect(res.body).toEqual({
      number: 6,
      is_prime: false,
      is_perfect: true,
      properties: ["armstrong", "even"],
      digit_sum: 6,
      fun_fact: expect.any(String),
    });
  });

  //   Test edge case: number -28
  it("should handle the number -28 correctly", async () => {
    const res = await request(app)
      .get("/api/classify-number?number=-28")
      .expect(200);

    expect(res.body).toEqual({
      number: -28,
      is_prime: false,
      is_perfect: false,
      properties: ["even"],
      digit_sum: -10,
      fun_fact: expect.any(String),
    });
  });
});
