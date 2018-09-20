const grpc = require("grpc");
const path = require("path");
const protoPath = path.join(__dirname, "./", "proto");
const proto = grpc.load({ root: protoPath, file: "todo.proto" });
const client = new proto.myTodos.TodosService(
  "localhost:50051",
  grpc.credentials.createInsecure()
);
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(cors());

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
var jsonParser = bodyParser.json({
  limit: 1024 * 1024 * 20,
  type: "application/json"
});
var urlencodedParser = bodyParser.urlencoded({
  extended: true,
  limit: 1024 * 1024 * 20,
  type: "application/x-www-form-urlencoding"
});
app.use(urlencodedParser);
app.use(jsonParser);
app.get("/", (req, res) => {
  client.List({}, (error, response) => {
    if (!error) {
      res.json(response);
      //   console.log("Response : ", response);
    } else {
      res.json(error.message);
      //   console.log("Error:", error.message);
    }
  });
});
app.post("/add", (req, res) => {
  //   console.log(req.body.todo);
  client.Insert(req.body.todo, (error, response) => {
    if (!error) {
      res.json(response);
      //   console.log("Response : ", response);
    } else {
      res.json(error.message);
      console.log("Error:", error.message);
    }
  });
});
app.put("/update", (req, res) => {
  //   console.log(req.body.payload);
  client.update(req.body.payload, (error, response) => {
    if (!error) {
      res.json(response);
      //   console.log("Response : ", response);
    } else {
      res.json(error.message);
      //   console.log("Error:", error.message);
    }
  });
});
app.delete("/delete", (req, res) => {
  //   console.log(req.body);
  client.remove(
    {
      id: req.body.id //parseInt(Math.random() * 1000000)
    },
    (error, response) => {
      if (!error) {
        res.json(response);
        // console.log("Response : ", response);
      } else {
        res.json(error.message);
        // console.log("Error:", error.message);
      }
    }
  );
});

app.listen(3000, (err, server) => {
  if (err) console.log(err);
  console.log("server is up at 3000");
});
