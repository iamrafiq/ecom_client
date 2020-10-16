import React from "react";
import ReactDOM from "react-dom";
import Sidebar from "./sidebar/sidebar";
import MaterialTitlePanel from "./sidebar/material_title_panel";
import SidebarContent from "./sidebar/sidebar_content";
import Routes from "./RoutesBrowser";
import { getTree } from "./admin/apiAdmin";

import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

import PrimarySearchAppBar from "./component_ui/AppBar";
import PersistentDrawerLeft from "./component_ui/AppDrawer";
import TemporaryDrawer from "./component_ui/ TemporaryDrawer";
import "./App.css";
const styles = {
  contentHeaderMenuLink: {
    textDecoration: "none",
    color: "black",
    padding: 8,
  },
  content: {
    padding: "160px",
  },
  header: {
    position: "fixed",
    zIndex: 5, // same z index for sidebar
    width: "100%",
  },
};

// for muliple screen https://stackoverflow.com/questions/49989723/how-can-i-force-a-matching-window-matchmedia-to-execute-on-page-load
const mql = window.matchMedia(`(min-width: 800px)`);
const mqlSmall = window.matchMedia("(max-width: 600px)");
const mqlMeduim = window.matchMedia(
  "(min-width: 601px) and (max-width: 900px)"
);
const mqlLarge = window.matchMedia(
  "(min-width: 901px) and (max-width: 1200px)"
);
const mqlFull = window.matchMedia("(min-width: 1201px)");
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      docked: mql.matches,
      smallScreen: mqlSmall.matches,
      mediumScreen: mqlMeduim.matches,
      largeScreen: mqlLarge.matches,
      fullScreen: mqlFull.matches,
      open: false,
      loading: false,
      language: localStorage.getItem("language") || "0",
      tree: [],
    };

    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
    this.toggleOpen = this.toggleOpen.bind(this);
    this.onSetOpen = this.onSetOpen.bind(this);
    this.handleLanguageChange = this.handleLanguageChange.bind(this);
  }
  // getCategories().then((data) => {

  //   if (data && data.error) {
  //     setValues({ ...values, error: data.error });
  //   } else {
  //     setValues({
  //       ...values,
  //       name: "",
  //       order: "",
  //       icon: "",
  //       thumbnail: "",
  //       trash: false,
  //       loading: false,
  //       parents: data,
  //       formData: new FormData(),
  //     });
  //   }
  // });
  downloadCategories = () => {
    this.setState({
      loading: true,
    });
    getTree().then((data) => {
      if (data && data.error) {
        console.log(data.error);
      } else {
        this.setState({
          tree: [...this.state.tree, ...data.children],
          loading: false,
        });
      }
    });
  };

  componentWillMount() {
    console.log("language previously selected", this.state.language);
    // this.setState((prevState)=>{
    //   return{
    //      language: localStorage.getItem("language") || 0
    //   }
    // })
    this.downloadCategories();
    mql.addListener(this.mediaQueryChanged);
    mqlSmall.addListener(this.mediaQueryChanged);
    mqlMeduim.addListener(this.mediaQueryChanged);
    mqlLarge.addListener(this.mediaQueryChanged);
    mqlFull.addListener(this.mediaQueryChanged);
  }

  componentWillUnmount() {
    mql.removeListener(this.mediaQueryChanged);

    mqlSmall.removeListener(this.mediaQueryChanged);
    mqlMeduim.removeListener(this.mediaQueryChanged);
    mqlLarge.removeListener(this.mediaQueryChanged);
    mqlFull.removeListener(this.mediaQueryChanged);
  }

  onSetOpen(open) {
    this.setState({ open });
  }

  mediaQueryChanged() {
    this.setState({
      docked: mql.matches,
      smallScreen: mqlSmall.matches,
      mediumScreen: mqlMeduim.matches,
      largeScreen: mqlLarge.matches,
      fullScreen: mqlFull.matches,
      open: false,
    });
  }

  toggleOpen(ev) {
    this.setState({ open: !this.state.open });

    if (ev) {
      ev.preventDefault();
    }
  }
  handleLanguageChange(event, currentLang) {
    this.setState(
      (prevState) => {
        return {
          language: currentLang,
        };
      },
      () => {
        localStorage.setItem("language", currentLang);
      }
    );
  }


  render() {
    const { loading, tree } = this.state;
    let contentHeader = null;
    if (this.state.smallScreen) {
    } else if (this.state.mediumScreen) {
      console.log("CALLBACK (max-width: 600px)");
    } else if (this.state.largeScreen) {
      console.log("CALLBACK (max-width: 800px)");
    } else if (this.state.fullScreen) {
      // console.log("CALLBACK (min-width: 801px)");
      // contentHeader = this.renderFullScreen();
    }

 
    
    // console.log("window.innerWidth: " + window.innerWidth);
    //  const sidebar = <SidebarContent tree={tree} />;

    // const sidebarProps = {
    //   sidebar,
    //   docked: this.state.docked,
    //   open: this.state.open,
    //   onSetOpen: this.onSetOpen,
    // };

    return this.state.smallScreen || this.state.mediumScreen ? (
      <TemporaryDrawer tree={this.state.tree} >
        
      </TemporaryDrawer>
    ) : (
      <PersistentDrawerLeft tree={this.state.tree}></PersistentDrawerLeft>
    );

    // return (<Sidebar {...sidebarProps}>
    //   <MaterialTitlePanel style={styles.header} title={contentHeader}>
    //   </MaterialTitlePanel>
    //   <Routes></Routes>
    // </Sidebar>)

    // <Grid container spacing={0}>
    //   <Grid container item xs={12} spacing={0}>
    //     <MaterialTitlePanel
    //       renderTitle={true}
    //       style={styles.header}
    //       title={contentHeader}
    //     />
    //   </Grid>
    //   <Grid container item xs={12} spacing={0}>
    //     <Sidebar {...sidebarProps}>
    //       <Routes></Routes>
    //     </Sidebar>
    //   </Grid>
    // </Grid>
  }
}

export default App;
//ReactDOM.render(<App />, document.getElementById("example"));
