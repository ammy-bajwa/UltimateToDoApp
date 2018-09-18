import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Dialog from "./Dialog";
import { deleteTodos, updateTodos } from "../actions";

const styles = theme => ({
  main: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  },
  root: {
    color: "#f0925d",
    "&$checked": {
      color: "#f0925d"
    }
  },
  checked: {},
  todo: {
    marginTop: "1rem"
  },
  rootGrid: {
    maxWidth: "530px"
  },
  typographyHeader: {
    fontFamily: "Roboto",
    color: "#7a7a7a",
    fontWeight: "500",
    fontSize: "20px",
    textAlign: "start"
  },
  typographyPara: {
    fontFamily: "Roboto",
    color: "#7a7a7a",
    fontWeight: "400",
    fontSize: "16px",
    textAlign: "start"
  },
  button: {
    color: "#f0925d",
    fontSize: "16px",
    textTransform: "capitalize",
    background: "rgba(240, 142, 92, 0.08)"
  },
  label: {
    textTransform: "capitalize",
    color: "#ef865a",
    fontSize: "16px"
  },
  checkbox: {
    color: "green"
  },
  formLabel: {
    marginLeft: "15px",
    color: "#f0925d",
    "&$label": {
      color: "#f0925d"
    }
  },
  disabled: {
    textDecoration: "line-through"
  }
});

class TodoItem extends React.Component {
  state = {
    open: false
  };
  handleClickOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  handleDelete = () => {
    this.props.dispatch(deleteTodos(this.props._id));
    console.log(this.props._id);
    this.setState({ open: false });
  };
  handleCheck = () => {
    this.props.dispatch(updateTodos(!this.props.done, this.props._id));
  };
  render() {
    const props = this.props;
    const { classes } = props;
    return (
      <div className={classes.todo}>
        <Paper className={classes.main} style={{ borderRadius: "13px" }}>
          <Grid container className={classes.rootGrid}>
            <Grid item xs={8}>
              <Typography
                variant="headline"
                component="h3"
                className={classes.typographyHeader}
              >
                <span className={props.done && classes.disabled}>
                  {props.title}
                </span>
              </Typography>
              <Typography component="p" className={classes.typographyPara}>
                <span className={props.done && classes.disabled}>
                  {props.description}
                </span>
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Button className={classes.button} onClick={this.handleClickOpen}>
                Delete Todo
              </Button>
              <Dialog
                open={this.state.open}
                handleClose={this.handleClose}
                handleDelete={this.handleDelete}
              />
              <FormGroup>
                <FormControlLabel
                  className={classes.formLabel}
                  classes={{ label: classes.label, root: classes.root }}
                  control={
                    <Checkbox
                      checked={props.done}
                      value="checked"
                      classes={{ root: classes.root, checked: classes.checked }}
                      onChange={this.handleCheck}
                    />
                  }
                  label="Done"
                />
              </FormGroup>
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }
}

export default connect()(withStyles(styles)(TodoItem));
