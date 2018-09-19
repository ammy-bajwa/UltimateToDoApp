
var db;
var request = window.indexedDB.open("todoDB", 1);

request.onerror = function(event) {
  console.log("error: ");
};

request.onsuccess = function(event) {
  db = request.result;
  console.log("success: " + db);
};

request.onupgradeneeded = function(event) {
  var db = event.target.result;
  var objectStore = db.createObjectStore("todo", { keyPath: "id" });
};
const add = todo => {
  //check for support
  var request = db
    .transaction(["todo"], "readwrite")
    .objectStore("todo")
    .add(todo);

  request.onsuccess = function(event) {
    console.log("Todo has been added to your database.");
  };

  request.onerror = function(event) {
    console.log(
      "Unable to add data\r\nTodo is aready exist in your database! "
    );
  };
};