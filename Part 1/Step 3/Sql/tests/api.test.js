const grpc = require("grpc");
const protoPath = require("path").join(__dirname, "../", "proto");
const proto = grpc.load({ root: protoPath, file: "todo.proto" });
const client = new proto.myTodos.TodosService(
  "localhost:50051",
  grpc.credentials.createInsecure()
);
let todoTestId = parseInt(Math.random() * 1000000);
test("test for Updating a todo", async () => {
  await client.update(
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
test("test for getting all the todos", async () => {
  await client.List({}, (error, response) => {
    if (!error) {
      expect(response).not.toBeNull();
    } else {
      console.log("Error:", error.message);
    }
  });
});
test("test for adding a todo", async () => {
  await client.Insert(
    {
      todo_id: todoTestId,
      title: "test",
      description: "testing insert"
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
test("test for removing a todo", async () => {
  await client.remove(
    {
      todo_id: 279765 //parseInt(Math.random() * 1000000)
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
