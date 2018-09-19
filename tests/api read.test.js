const grpc = require("grpc");
const protoPath = require("path").join(__dirname, "../", "proto");
const proto = grpc.load({ root: protoPath, file: "todo.proto" });
const client = new proto.myTodos.TodosService(
  "localhost:50051",
  grpc.credentials.createInsecure()
);
test("test for getting all the todos", () => {
  client.List({}, (error, response) => {
    if (!error) {
      expect(response).not.toBeNull();
    } else {
      console.log("Error:", error.message);
    }
  });
});
