import * as request from "supertest";
import * as uuid from 'uuid/v4'
let pg = require('pg');

let pool = new pg.Pool({
  port: 5432,
  user: 'postgres',
  password: 'root',
  host: 'localhost',
  database: 'react_postgresql_todo',
  max: 10,
});

let server;
let todoId;
let todo;
let todoItem;
describe("api/todos", () => {
  beforeEach(async () => {
    server = require("../server");
    todoId = uuid();
    todoItem = {
      id: todoId,
      title:"This is my title",
      description:"This is my description",
      done: true
    };
    todo = pool.connect((err,db,done)=>{
      if(err){
          return err;
      }
     
  })
  });

  // GET endpoint tests
  describe("GET api/todos", () => {
    it("Return 200 OK", async () => {
      let result = await request(server).get("/api/todos");
      expect(result.status).toBe(200);
    });
  });


  // POST endpoint tests
  describe("POST api/todos", () => {

    it("Return 400 error if description not define", async () => {
      let result = await request(server)
        .post("/api/todos")
        .send({
          id: todoId,
          title: "title",
          done: true
        });
      expect(result.status).toBe(400);
    });

    it("Return 400 error if title not define", async () => {
      let result = await request(server)
        .post("/api/todos")
        .send({
          id: todoId,
          description: "description",
          done: true
        });
      expect(result.status).toBe(400);
    });

    it("Return 200 OK", async () => {
      let result = await request(server)
        .post("/api/todos")
        .send(todoItem);
      expect(result.status).toBe(200);
    });
  });

  // PUT endpoint tests
  describe("PUT api/todos/:id", () => {
    it("Return 200 OK on Update", async () => {
      let result = await request(server)
        .put(`/api/todos/${todoId}`)
        .send({ done: true });
      expect(result.status).toBe(200);
    });
  });

  //DELETE endpoint tests
  describe("DELETE api/todos/:id", () => {
    it("Return 200 OK on Delete", async () => {
      let result = await request(server).delete(`/api/todos/${todoId}`);
      expect(result.status).toBe(200);
    });
  });

  afterEach(async () => {
    await server.close();
    await pool.connect((err,db,done)=>{
      if(err){
          return err;
      }
     else {
         db.end();
     }
  });
  });
});
