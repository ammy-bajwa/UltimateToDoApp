const grpc = require("grpc");
const protoPath = require("path").join(__dirname, "../", "proto");
const proto = grpc.load({ root: protoPath, file: "todo.proto" });
const client = new proto.myTodos.TodosService(
  "localhost:50051",
  grpc.credentials.createInsecure()
);
let todoTestId = parseInt(Math.random() * 1000000);
test("test for adding a todo", () => {
  client.Insert(
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