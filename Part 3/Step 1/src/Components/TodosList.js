import React from "react";
// import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TodoItem from "./TodoItem";
const styles = theme => ({
  root: {
    width: "100%"
  },
  disabed: {
    textDecoration: "line-through #000 dashed",
    color: "#505050"
  }
});

class CheckboxList extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        {this.props.todos.map((item,i) => (
          <div key={i}>
            <TodoItem
              title={item.title}
              description={item.description}
              done={item.done}
              _id={item._id}
            />
          </div>
        ))}
      </div>
    );
  }
}

export default withStyles(styles)(CheckboxList);
