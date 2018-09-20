import axios from "axios";
import { getTodos } from "./actions";


export const get = (dispatch) => {
  axios
    .get("http://localhost:3000/")
    .then(response => {
      dispatch(getTodos(response.data.todo));
    })
    .catch(err => console.log(err));
};
export const add = payload => {
  axios
    .post("http://localhost:3000/add", {
      todo: payload
    })
    .then(function(response) {
      console.log(response);
    })
    .catch(function(error) {
      // handle error
      console.log(error);
    });
};
export const dell = id => {
  axios
    .delete("http://localhost:3000/delete", {
      data: {
        id: id
      }
    })
    .then(function(response) {
      console.log(response);
    })
    .catch(function(error) {
      console.log(error);
    });
};
export const update = payload => {
  axios
    .put("http://localhost:3000/update", {
      payload
    })
    .then(function(response) {
      console.log(response);
    })
    .catch(function(error) {
      console.log(error);
    });
};
