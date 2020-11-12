import React from "react";
import Sidebar from "./core/sidebar";
import SidebarContent from "./core/sidebar_content";
import { MOBIEL_DEVICE_RESOLUTION } from "../../config";




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
    // position:"fixed",
    width: "100%",
    zIndex: 9999, // same z index for sidebar
  },
};

const mql = window.matchMedia(`(min-width: ${MOBIEL_DEVICE_RESOLUTION}px)`);

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      docked: mql.matches,
      open:false,
      loading: false,
      tree: JSON.parse(JSON.stringify(props.tree)),
    };

    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
    this.toggleOpen = this.toggleOpen.bind(this);
    this.onSetOpen = this.onSetOpen.bind(this);
    props.onClickMenu(this.toggleOpen)

   
  }

 

  componentWillMount() {
   // this.downloadCategories();


    mql.addListener(this.mediaQueryChanged);
  }

  componentWillUnmount() {
    mql.removeListener(this.mediaQueryChanged);
  }

  onSetOpen(open) {
    this.setState({ open });
  }

  mediaQueryChanged() {
    this.setState({
      docked: mql.matches,
      open: false,
    });
  }

  toggleOpen(ev) {
    if (ev) {
      ev.preventDefault();
    }
    this.setState({ open: !this.state.open });    
  }

  render() {

 
    const { loading, tree } = this.state;
    const sidebar = <SidebarContent toggleSideBar={this.toggleOpen} tree={tree} />;

    const sidebarProps = {
      sidebar,
      docked: this.state.docked,
      open: this.state.open,
      onSetOpen: this.onSetOpen,
    };

    return (
      <div>
        <Sidebar {...sidebarProps}>
        <div /> 
        </Sidebar>
      </div>
    );
  }
}

export default App;
