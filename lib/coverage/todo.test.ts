import * as request from "supertest";
let server;
describe("api/todos", () => {
  beforeEach(() => {
    server = require("../server");
  });
  afterEach(() => {
    server.close();
  });
  describe("Get request", () => {
    it("Should return 200 OK", async () => {
      let result = await request(server).get("/api/todos");
      expect(result.status).toBe(200);
    });
  });
});
