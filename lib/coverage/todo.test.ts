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
      title: "Buy Some Milk",
      description: "Some Description: buy from Hassan dairy",
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
    it("Should return 200 OK", async () => {
      let result = await request(server).get("/api/todos");
      expect(result.status).toBe(200);
    });
  });


  // POST endpoint tests
  describe("POST api/todos", () => {
    it("Should return 200 OK", async () => {
      let result = await request(server)
        .post("/api/todos")
        .send(todoItem);
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
