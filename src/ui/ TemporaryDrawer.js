import React, { useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import PrimarySearchAppBar from "./AppBar";
import NestedList from './NestedList';
import Typography from '@material-ui/core/Typography';
import Routes from "../Routes";
import BottomAppBar from "./BottomAppBar";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export default function SwipeableTemporaryDrawer({tree}) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
    tree:tree
  });
   


  console.log("tree....",tree)
  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
    //   onClick={toggleDrawer(anchor, false)}
    //   onKeyDown={toggleDrawer(anchor, false)}
    >
        <NestedList onClick={toggleDrawer(anchor, false)} onKeyDown={toggleDrawer(anchor, false)} tree = {tree}></NestedList>
        {/* <NestedListV2></NestedListV2> */}
      {/* <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List> */}
    </div>
  );

  return (
    <div>
      {<React.Fragment key="left" style={{margin:"50px"}}>
          <PrimarySearchAppBar drawerOpen={toggleDrawer("left", true)} ></PrimarySearchAppBar>
          <BottomAppBar ></BottomAppBar>

          {/* <Button onClick={toggleDrawer("left", true)}>"Left</Button> */}
          <SwipeableDrawer
            anchor="left"
            open={state["left"]}
            onClose={toggleDrawer("left", false)}
            onOpen={toggleDrawer("left", true)}
          >
            {list("left")}
          
          </SwipeableDrawer>
        
         <Routes ></Routes>
         <div style={{height:"70px"}}>
           {/* do not remove this div, this give a margin boot to all routes */}
           </div>
        </React.Fragment>}
    </div>
  );
}
