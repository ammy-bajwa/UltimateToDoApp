const grpc = require("grpc");
const protoPath = require("path").join(__dirname, "../", "proto");
const proto = grpc.load({ root: protoPath, file: "todo.proto" });
const client = new proto.myTodos.TodosService(
  "localhost:50051",
  grpc.credentials.createInsecure()
);
let todoTestId = parseInt(Math.random() * 1000000);
test("test for adding a todo", done => {
  client.Insert(
    {
      todo_id: todoTestId,
      title: "test",
      description: "testing insert",
      done: false
    },
    (error, response) => {
      if (!error) {
      } else {
        console.log("Error:", error.message);
      }
    }
  );
});
test("test for getting all the todos", () => {
  client.List({}, (error, response) => {
    if (!error) {
      expect(response).not.toBeNull();
    } else {
      console.log("Error:", error.message);
    }
  });
});

test("test for Updating a todo", () => {
  client.update(
    {
      todo_id: 279765, //parseInt(Math.random() * 1000000)
      title: "test Updated",
      description: "testing Update"
    },
    (error, response) => {
      if (!error) {
        expect(response).not.toBeNull();
      } else {
        console.log("Error:", error.message);
      }
    }
  );
});