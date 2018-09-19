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

let remove = id => {
  var request = db
    .transaction(["todo"], "readwrite")
    .objectStore("todo")
    .delete(id);

  request.onsuccess = function(event) {
    console.log("Todo's entry has been removed from your database.");
  };
};

let update = todo => {
  var request = db
    .transaction(["todo"], "readwrite")
    .objectStore("todo")
    .get(todo.id);
  request.onsuccess = function(event) {
    let data = request.result;
    data.done = !data.done;
    var updateTitleRequest = db
      .transaction(["todo"], "readwrite")
      .objectStore("todo")
      .put(data);

    // Log the transaction that originated this request
    console.log(
      "The transaction that originated this request is " +
        updateTitleRequest.transaction
    );

    // When this new request succeeds, run the displayData() function again to update the display
    updateTitleRequest.onsuccess = function() {
      console.log("updated Successfully");
    };
    console.log("Todo has been added to your database.");
  };

  request.onerror = function(event) {
    console.log(
      "Unable to add data\r\nTodo is aready exist in your database! "
    );
  };
};
