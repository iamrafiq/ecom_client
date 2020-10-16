import React, { Fragment, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StarBorder from "@material-ui/icons/StarBorder";
import { useEffect } from "react";
import { spacing } from "@material-ui/system";
import Box from "@material-ui/core/Box";
import CardMedia from "@material-ui/core/CardMedia";
import Avatar from "@material-ui/core/Avatar";
import { Link, withRouter } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  selectedItem: {
    color: "#022775",
    paddingTop: theme.spacing(0.4),
    paddingLeft: theme.spacing(0.5),
    fontSize: "63px",
  },
  unselectedItem: {
    color: theme.palette.text.primary,
    paddingTop: theme.spacing(0.4),
    paddingLeft: theme.spacing(0.5),
    fontSize: "63px",
  },
}));

export default function NestedList(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [state, setState] = useState({});
  const { tree, selectedItemName = "none" } = props;

  const handleOnClick = (name) => (event) => {
    console.log("handle click....", state[name]);
    setState((prev) => ({
      ...prev,
      [name]: !state[name],
    }));
  };



  useEffect(() => {
    console.log("USe effect.........");
    initState(props.tree);
  }, [props]);

  const initState = (children, depth = 0, branch = 0) => {
    return children.map((subOption, index) => {
      if (!subOption.children) {
        setState((prev) => ({
          ...prev,
          [subOption.name]: false,
        }));
      } else {
        setState((prev) => ({
          ...prev,
          [subOption.name]: false,
        }));
        initState(subOption.children, depth, branch);
      }
    });
  };

  const handler1 = (children) => {
    return children.map((subOption, index) => {
      if (!subOption.children) {
        console.log(subOption.name, state[subOption.name]);
      } else {
        console.log(subOption.name, state[subOption.name]);
        handler1(subOption.children);
      }
    });
  };

  const handler = (children) => {
    return children.map((subOption, index) => {
      console.log("Padding.........", subOption.name, index);
      if (!subOption.children) {
        return (
          <Box pl={subOption.level - 1}>
            <ListItem button>
              {subOption.level === 1 && (
                <Avatar
                  alt={subOption.alt}
                  src={`/category/icon/${subOption._id}`}
                  className={classes.small}
                />
              )}
              {/* <ListItemText 
                className={selectedItemName===subOption.name? classes.selectedItem:classes.unselectedItem}
                primary={subOption.name}
              /> */}
              <Link to={{pathname: `/category/products`, _id: subOption._id }}>
                {subOption.name}
              </Link>
            </ListItem>
          </Box>
        );
      }

      return (
        <div key={subOption.name}>
          {
            <Box pl={subOption.level - 1}>
              <ListItem button onClick={handleOnClick(subOption.name)}>
                {subOption.level === 1 && (
                  <Avatar
                    alt={subOption.alt}
                    src={`/category/icon/${subOption._id}`}
                    className={classes.small}
                  />
                )}
                {/* <ListItemText
                  className={
                    selectedItemName === subOption.name
                      ? classes.selectedItem
                      : classes.unselectedItem
                  }
                  primary={subOption.name}
                /> */}
                <Link to={{ pathname: `/category/children`, _id: subOption._id }}>
                  {subOption.name}
                </Link>

                {state[subOption.name] ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={state[subOption.name]} timeout="auto" unmountOnExit>
                {handler(subOption.children)}
              </Collapse>
            </Box>
          }
        </div>
      );
    });
  };
  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Nested List Items
        </ListSubheader>
      }
      className={classes.root}
    >
      {handler(tree)}
    </List>
  );
}
