import React from "react";
// import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import DeleteForeverRounded from "@material-ui/icons/DeleteForeverRounded";

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  disabed: {
    textDecoration: "line-through #000 dashed",
    color: "#505050"
  }
});

class CheckboxList extends React.Component {
  state = {
    checked: true
  };
  handleCheckChange = (event, checked, id) => {
    this.props.handleCheck(checked, id);
    console.log(event.target.checked, id);
  };
  _handleDelete = (e, id) => {
    this.props.handleDelete(id);
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <List>
          {this.props.todos.map(item => (
            <div key={item.id}>
              <ListItem dense button className={classes.listItem}>
                <Checkbox
                  checked={item.checked}
                  tabIndex={-1}
                  disableRipple
                  onChange={e =>
                    this.handleCheckChange(e, item.checked, item.id)
                  }
                />
                {
                  <ListItemText
                    primary={`${item.todo}`}
                    className={item.checked ? classes.disabed : ""}
                  />
                }
                <ListItemSecondaryAction>
                  <IconButton
                    aria-label="Comments"
                    onClick={e => this._handleDelete(e, item.id)}
                  >
                    <DeleteForeverRounded />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />
            </div>
          ))}
        </List>
      </div>
    );
  }
}

export default withStyles(styles)(CheckboxList);
