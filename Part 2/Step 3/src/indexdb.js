import {
  //   IS_LOADING,
  GET_TODOS,
  POST_TODO,
  DELETE_TODO,
  UPDATE_TODO,
  GET_ERRORS
} from "./types";
var db;
const get = dispatch => {
  var request = window.indexedDB.open("todoDB", 1);
  let todos = [];
  request.onerror = function(event) {
    console.log("error: ");
  };
  let self = this;
  request.onsuccess = function(event) {
    db = request.result;
    var objectStore = db.transaction("todo").objectStore("todo");
    objectStore.openCursor().onsuccess = function(event) {
      var cursor = event.target.result;
      if (cursor) {
        console.log(cursor.value);
        todos.push(cursor.value);
        cursor.continue();
      } else {
        dispatch({ type: GET_TODOS, payload: todos });
        console.log("todo loaded!");
      }
    };
  };
};
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
  var objectStore = db.createObjectStore("todo", { keyPath: "_id" });
};
const add = (todo, dispatch) => {
  //check for support
  var request = db
    .transaction(["todo"], "readwrite")
    .objectStore("todo")
    .add(todo);

  request.onsuccess = function(event) {
    console.log("Todo has been added to your database.");
    dispatch({ type: POST_TODO, payload: todo });
  };

  request.onerror = function(event) {
    console.log(
      "Unable to add data\r\nTodo is aready exist in your database! "
    );
    dispatch({ type: GET_ERRORS, payload: "error" });
  };
};

let remove = (_id, dispatch) => {
  var request = db
    .transaction(["todo"], "readwrite")
    .objectStore("todo")
    .delete(_id);

  request.onsuccess = function(event) {
    dispatch({
      type: DELETE_TODO,
      _id
    });
    console.log("Todo's entry has been removed from your database.");
  };
};

let update = (_id,dispatch) => {
  var request = db
    .transaction(["todo"], "readwrite")
    .objectStore("todo")
    .get(_id);
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
      dispatch({
        type: UPDATE_TODO,
        payload:data.done,
        _id
      });
    };
    console.log("Todo has been added to your database.");
  };

  request.onerror = function(event) {
    console.log(
      "Unable to add data\r\nTodo is aready exist in your database! "
    );
  };
};
export { add, remove, update, get };
