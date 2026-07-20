const request = require("supertest");
const app = require("../app");

describe("POST /add", () => {
  test("should add two numbers", async () => {
    const response = await request(app)
      .post("/add")
      .send({
        a: 10,
        b: 5,
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      result: 15,
    });
  });

  test("should return 400 if a is missing", async () => {
    const response = await request(app)
      .post("/add")
      .send({
        b: 5,
      });

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      message: "Both a and b must be numbers.",
    });
  });

  test("should return 400 if values are not numbers", async () => {
    const response = await request(app)
      .post("/add")
      .send({
        a: "10",
        b: 5,
      });

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      message: "Both a and b must be numbers.",
    });
  });

  test("should add negative numbers", async () => {
    const response = await request(app)
      .post("/add")
      .send({
        a: -5,
        b: 2,
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.result).toBe(-3);
  });
});