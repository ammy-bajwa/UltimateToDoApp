import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Input, Button } from "@material-ui/core";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  input: {
    margin: theme.spacing.unit
  }
});

class Inputs extends React.Component {
  state = {
    todo: ""
  };

  _handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  _handleSubmit = e => {
    e.preventDefault();
    const todo = this.state.todo;
    this.props.onSubmit(todo);
    console.log(todo);
  };
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <form onSubmit={this._handleSubmit}>
          <Input
            className={classes.input}
            value={this.state.todo}
            onChange={this._handleChange("todo")}
            inputProps={{ "aria-label": "Description" }}
          />
          <Button color="secondary" type="submit">
            Add todo
          </Button>
        </form>
      </div>
    );
  }
}

export default withStyles(styles)(Inputs);
