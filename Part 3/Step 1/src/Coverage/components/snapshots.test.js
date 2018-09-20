import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

// import Dialog from "../../Components/Dialog";
import Header from "../../Components/Header";
import TodoInput from "../../Components/TodoInput";
import TodoItem from "../../Components/TodoItem";
import TodosList from "../../Components/TodosList";
import todos from "../todos";
import { Provider } from "react-redux";
import { store } from "../../store";
import { Dialog } from "@material-ui/core";

describe("Snapshots of React Components", () => {
  it("Should Match Header Snapshot", () => {
    const wrapper = shallow(<Header />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it("Should Match TodoInput Snapshot", () => {
    const wrapper = shallow(<TodoInput />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it("Should Match TodoList  Snapshot", () => {
    const wrapper = shallow(<TodosList todos={todos} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it("Should Match TodoItem  Snapshot", () => {
    const wrapper = shallow(
      <Provider store={store}>
        <TodoItem
          title={todos[0].title}
          description={todos[0].description}
          done={todos[0].done}
          id={todos[0].id}
        />
      </Provider>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it("Should Match TodoItem  Snapshot", () => {
    const wrapper = shallow(
      <Provider store={store}>
        <Dialog open={false} />
      </Provider>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
