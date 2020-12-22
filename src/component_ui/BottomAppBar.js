import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";

import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
const useStyles = makeStyles((theme) => ({
  text: {
    padding: theme.spacing(2, 2, 0),
  },
  paper: {
    paddingBottom: 50,
  },
  list: {
    marginBottom: theme.spacing(2),
  },
  subheader: {
    backgroundColor: theme.palette.background.paper,
  },
  appBar: {
    top: "auto",
    bottom: 0,
  },
  grow: {
    flexGrow: 1,
  },
  fabButton: {
    position: "absolute",
    zIndex: 1500,
    top: -30,
    left: 200,
    right: 0,
    margin: "0 auto",
  },
}));

export default function BottomAppBar() {
  const classes = useStyles();

  return (
    <React.Fragment>
      {/* <Paper square className={classes.paper}>
        <Typography className={classes.text} variant="h5" gutterBottom>
          Inbox
        </Typography>
        <List className={classes.list}>
          {messages.map(({ id, primary, secondary, person }) => (
            <React.Fragment key={id}>
              {id === 1 && <ListSubheader className={classes.subheader}>Today</ListSubheader>}
              {id === 3 && <ListSubheader className={classes.subheader}>Yesterday</ListSubheader>}
              <ListItem button>
                <ListItemAvatar>
                  <Avatar alt="Profile Picture" src={person} />
                </ListItemAvatar>
                <ListItemText primary={primary} secondary={secondary} />
              </ListItem>
            </React.Fragment>
          ))}
        </List>
      </Paper> */}

      <AppBar
        position="fixed"
        className={classes.appBar}
        style={{background:"transparent"}}
      >
       <ButtonGroup
            style={{ minHeight: "55px", width: "100%", background:"transparent" }}
          >
            <Button style={{ height: "55px", width: "20%", marginLeft: "0px", background:"white", color:"black"}}>
              <QuestionAnswerIcon></QuestionAnswerIcon>
            </Button>
            <Button style={{ height: "55px", width: "60%", background:"#022775", color:"white"}}>Place Order</Button>
            <Button style={{ height: "55px", width: "20%",marginRight: "0px", background:"#006400", color:"white"}}><ShoppingCartIcon></ShoppingCartIcon></Button>
          </ButtonGroup>
      </AppBar>
    </React.Fragment>
  );
}
