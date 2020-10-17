import React from "react";
import PropTypes from "prop-types";
import MaterialTitlePanel from "./material_title_panel";
import Collapsible from "./collapsible/Collapsible";
import "./collapsible/collapsible.css";
import { Link, withRouter } from "react-router-dom";
import {SIDE_BAR_WIDTH} from "../../../config"
import triggerStyle  from"./sidebar_content.css";
import TreeExample from "../../treebeard/tree";
const styles = {
  sidebar: {
    width: `${SIDE_BAR_WIDTH}rem`,
    height: "100%",
    overflow: "hidden" /* Hide scrollbars */,
  },
  sidebarLink: {
    display: "block",
    padding: "16px 0px",
    color: "#757575",
    textDecoration: "none",
  },
  divider: {
    margin: "8px 0",
    height: 1,
    backgroundColor: "#757575",
  },
  content: {
    padding: "16px",
    height: "100%",
    backgroundColor: "white",
  },
};
const style = {
  Collapsible: {
    backgroundColor: "black",
  },
};

const SidebarContent = (props) => {
  const style = props.style
    ? { ...styles.sidebar, ...props.style }
    : styles.sidebar;

  const links = [];
  console.log("Tree....................", props.tree);
  for (let ind = 0; ind < 5; ind++) {
    links.push(
      <a key={ind} href="#" style={styles.sidebarLink}>
        Mock menu item {ind}
      </a>
    );
  }

  const createTopElement = (subOption, title, url, alt) => {
    return (
      <div className="">
        {/* {url && (
          <img
            class="pull-left"
            src={url}
            alt={alt}
            style={{ marginRight: "8px", width: "20px", height: "20px" }}
          />
        )} */}
         <Link  to={{ pathname: `/category/children`, _id: subOption._id }}>
                  {subOption.name}
                </Link>
      </div>
    );
  };

  const handler = (children) => {
    return children.map((subOption) => {
      if (!subOption.children) {
        return (
          // <div key={ subOption.name }>
          //   <ListItem
          //     button
          //     key={ subOption.name }>
          //     <Link
          //       to={ subOption.url }
          //       className={ classes.links }>
          //       <ListItemText
          //         inset
          //         primary={ subOption.name }
          //       />
          //     </Link>
          //   </ListItem>
          // </div>
          <Collapsible
            transitionTime={400}
            trigger="Iteam 1"
            // iconUrl="https://alupiaj.com/images/flower-24px.png"
            iconAlt="Icon alt"
            item={createTopElement(subOption,
              subOption.name,
              "https://alupiaj.com/images/flower-24px.png",
              "Alt"
            )}
          >
            {/* {this.handler(subOption.children)} */}
          </Collapsible>
        );
      }
      return (
        <div key={subOption.name}>
          {/* <ListItem 
            button 
            onClick={ () => this.handleClick( subOption.name ) }>
            <ListItemText 
              inset 
              primary={ subOption.name } />
            { state[ subOption.name ] ? 
              <ExpandLess /> :
              <ExpandMore />
            }
          </ListItem>
          <Collapse 
            in={ state[ subOption.name ] } 
            timeout="auto" 
            unmountOnExit
          >
            { this.handler( subOption.children ) }
          </Collapse> */}

          <Collapsible
            transitionTime={400}
            trigger="Iteam 1"
            iconUrl="https://alupiaj.com/images/flower-24px.png"
            iconAlt="Icon alt"
            item={createTopElement(
              subOption,
              subOption.name,
              "https://alupiaj.com/images/flower-24px.png",
              "Alt"
            )}
          >
            {handler(subOption.children)}
          </Collapsible>
        </div>
      );
    });
  };
  return (
    // <MaterialTitlePanel renderTitle={false} title="" style={style}>
    //   <div style={styles.content}>
    //     <a href="index.html" style={styles.sidebarLink}>
    //       Offer
    //     </a>
    //     <div style={styles.divider} />
    //     {
    //       <div>
          
    //         {handler(props.tree)}

    //       </div>
    //     }
    //   </div>
    // </MaterialTitlePanel>
    <TreeExample></TreeExample>
  );
};

SidebarContent.propTypes = {
  style: PropTypes.object,
};

export default SidebarContent;
