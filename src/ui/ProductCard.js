import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Box from "@material-ui/core/Box";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import TextField from "@material-ui/core/TextField";
import "./ui.css";
import Button from "@material-ui/core/Button";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
const useStyles = makeStyles((theme) => ({
  root: {
    width: 170,
    height: 335,
    padding: 5,
    marginBottom: 5,
  },
  rootHeader: {
    maxWidth: 200,
    maxHeight: 100,
    margin: 6,
    margin: "auto",
  },
  headerIcon: {
    fontSize: "1rem",
    marginRight: "2px",
  },
  headerTypoGraphy: {
    marginTop: "4px",
    marginRight: "2px",
  },
  media: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
    maxWidth: 200,
    height: 150,
    display: "flex",
    justifyContent: "center",
    // background:"green"
  },

  quantityCard: {
    width: 100,
    height: 40,
    background: "white",
    display: "flex",
  },
  quantity: {
    maxWidth: 80,
    minHeight: 30,
    fontSize: "0.3rem",
  },
  quantityInput: {
    width: 60,
    height: 30,
    background: "white",
  },
  button: {
    height: 50,
    width: 100,
  },
  cardAction: {
    background: "green",
  },

  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
  header: {},
  headerBox: {
    maxHeight: 30,
    backgroundColor: "blue",
    textAlign: "right",
    margin: "auto",
  },
  margin: {
    height: 30,
    width: 70,
  },
}));

export default function RecipeReviewCard() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <Card className={classes.rootHeader} variant="outlined">
        <Box display="flex" alignItems="center" flexDirection="row-reverse">
        <Brightness7Icon color="secondary" className={classes.headerIcon} />
          <Typography
            color="secondary"
            variant="caption"
            className={classes.headerTypoGraphy}
          >
            Get 8% OFF
          </Typography>
          <FiberManualRecordIcon  className={classes.headerIcon} style={{marginRight:"auto", color:"green"}} />

        </Box>
      </Card>
      {/* <CardMedia
        className={classes.media}
        image="http://alupiaj.com/images/mp4.png"
        title="Paella dish"
      /> */}
      <Box className={classes.media}>
        <img
          className="productCardImage"
          src="http://alupiaj.com/images/mp2.png"
        ></img>
      </Box>
      <Box>
        <Typography variant="caption" display="block" color="textSecondary">
          Phillips
        </Typography>
        <Box display="flex" justifyContent="center">
          <Typography variant="body1" color="textPrimary" display="block">
            Phillips Light 130W With Energy saving
          </Typography>
        </Box>
        <Typography variant="subtitle2" color="textSecondary">
          500 gram
        </Typography>
        <Typography variant="subtitle2" color="textPrimary">
          &#2547; <del>120</del> <span>60</span>
        </Typography>
      </Box>
      <Box display="flex" justifyContent="center">
        <TextField
          id="standard-basic"
          type="number"
          placeholder="Qty"
          style={{ maxWidth: "80px", maxHeight: "30px", marginRight: "3px" }}
        />
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          endIcon={<LocalMallIcon></LocalMallIcon>}
          style={{ maxWidth: "80", maxHeight: "32px", marginLeft: "3px" }}
        >
          ADD
        </Button>
      </Box>
    </Card>
  );
}
