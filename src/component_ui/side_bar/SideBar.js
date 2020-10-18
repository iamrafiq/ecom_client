import React from "react";
import Sidebar from "./core/sidebar";
import SidebarContent from "./core/sidebar_content";
import { getTree } from "../../admin/apiAdmin";
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
    zIndex: 5, // same z index for sidebar
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
      tree: [],
    };

    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
    this.toggleOpen = this.toggleOpen.bind(this);
    this.onSetOpen = this.onSetOpen.bind(this);
    props.onClickMenu(this.toggleOpen)
  }

  downloadCategories = () => {
    this.setState({
      loading: true,
    });
    getTree().then((data) => {
      console.log("data..", data)
      if (data ===undefined || data.error) {
      } else {
        this.setState({
          tree: [...this.state.tree, ...data],
          loading: false,
        });
      }
    });
  };

  componentWillMount() {
    this.downloadCategories();
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
    this.setState({ open: !this.state.open });
    if (ev) {
      ev.preventDefault();
    }
  }

  render() {

    const { loading, tree } = this.state;
    const sidebar = <SidebarContent tree={tree} />;
    // const contentHeader = (
    //   <span>
    //     {!this.state.docked && (
    //       <a
    //         onClick={this.toggleOpen}
    //         href="#"
    //         style={styles.contentHeaderMenuLink}
    //       >
    //         =
    //       </a>
    //     )}
    //     <span> Responsive React Sidebar</span>
    //   </span>
    // );

    const sidebarProps = {
      sidebar,
      docked: this.state.docked,
      open: this.state.open,
      onSetOpen: this.onSetOpen,
    };

    return (
      <div>
        {console.log(this.state.open)}
        <Sidebar {...sidebarProps}>
        </Sidebar>
      </div>
    );
  }
}

export default App;
