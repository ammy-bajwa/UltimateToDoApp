const grpc = require("grpc");

const protoPath = require("path").join(__dirname, "../..", "proto");
const proto = grpc.load({ root: protoPath, file: "todo.proto" });
const client = new proto.myTodos.TodosService(
  "localhost:50051",
  grpc.credentials.createInsecure()
);

client.List({}, (error, response) => {
  if (!error) {
    console.log("Response : ", response);
  } else {
    console.log("Error:", error.message);
  }
});

client.Insert(
  {
    id: parseInt(Math.random() * 1000000),
    title: "buy Mil",
    description: "buy from diary good one",
    done:false
  },
  (error, response) => {
    if (!error) {
      console.log("Response : ", response);
    } else {
      console.log("Error:", error.message);
    }
  }
);
client.remove(
  {
    id: 288054 //parseInt(Math.random() * 1000000)
  },
  (error, response) => {
    if (!error) {
      console.log("Response : ", response);
    } else {
      console.log("Error:", error.message);
    }
  }
);
client.update(
    {
      id: 928333, //parseInt(Math.random() * 1000000)
      title:'Updated Title',
      description:'Updated Description',
      done:true
    },
    (error, response) => {
      if (!error) {
        console.log("Response : ", response);
      } else {
        console.log("Error:", error.message);
      }
    }
  );
