import React from "react";
import renderer from "react-test-renderer/";
import Dialog from "../../Components/Dialog";
import Header from "../../Components/Header";
import TodoInput from "../../Components/TodoInput";
import TodoItem from "../../Components/TodoItem";
import TodosList from "../../Components/TodosList";

describe("Snapshots of React Components", () => {
  it("Should Match Header Snapshot", () => {
    const tree = renderer.create(<Header />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("Should TodoInput Header Snapshot", () => {
    const tree = renderer.create(<TodoInput />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
