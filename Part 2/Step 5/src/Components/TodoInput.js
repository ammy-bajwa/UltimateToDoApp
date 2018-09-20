import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    padding: "1rem 2.3rem"
  },
  input: {
    margin: "12px",
    "&:hover": {
      borderBottom: "1px solid rgb(241, 157, 96)"
    },
    "&:after": {
      borderBottom: "1px solid rgb(241, 157, 96)"
    },
    "&:before": {
      borderBottom: "1px solid rgb(241, 157, 96)"
    }
  },
  Button: {
    background: "linear-gradient(to bottom, #ffa562 0%, #ff875a 100%)",
    borderRadius: "50px",
    color: "#fff",
    padding: "20px 4rem 20px",
    fontSize: "21px"
  },
  paper: {
    borderRadius: "13px"
  }
});

class Inputs extends React.Component {
  state = {
    title: "",
    description: "",
    error: ""
  };

  _handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  _handleSubmit = e => {
    e.preventDefault();
    if (!this.state.title || !this.state.description) {
      this.setState({ error: "Please fill both the feilds" });
    } else if (this.state.title && this.state.description) {
      const todo = {
        title: this.state.title,
        description: this.state.description
      };
      this.props.onSubmit(todo);
      this.setState({ error: "", title: "", description: "" });
      console.log(todo);
    }
  };
  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.paper}>
        <form onSubmit={this._handleSubmit} className={classes.container}>
          <Input
            fullWidth
            className={classes.input}
            value={this.state.title}
            onChange={this._handleChange("title")}
            inputProps={{ "aria-label": "Title" }}
            placeholder="Write the todo title"
          />
          <Input
            fullWidth
            className={classes.input}
            value={this.state.description}
            onChange={this._handleChange("description")}
            inputProps={{ "aria-label": "Description" }}
            placeholder="Write the description about what needs to be done"
            multiline
            rows="3"
          />
          {this.state.error && <p>{this.state.error}</p>}
          <Button color="secondary" type="submit" className={classes.Button}>
            Add todo
          </Button>
        </form>
      </Paper>
    );
  }
}

export default withStyles(styles)(Inputs);
