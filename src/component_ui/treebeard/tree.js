import React from "react";
import { Link } from "react-router-dom";

import { Treebeard, animations, decorators, theme } from "./index";
import { includes } from "lodash";
import { API } from "../../config";
import * as filters from "./filter";
const CustomHeader = ({ node, style, prefix }) => (
  <Link
    className="nav-link"
    to={node.slug}

    // {{
    //   pathname: `${
    //     node.children ? "/category/children/": "/category/products/"
    //   }`,
    //   _id: node._id,
    // }}
  >
    <div style={style.base}>
      <div style={{ ...style.title, display: "flex", margin: "auto" }}>
        <span>
          {node.icon ? (
            <img
              style={{ width: "20px", height: "20px", marginRight: "5px" }}
              src={`${API}/category/icon/${node._id}`}
            ></img>
          ) : (
            ""
          )}
        </span>{" "}
        {`${node.name.toUpperCase()}`}
      </div>
    </div>
  </Link>
);

// class CutomContainer extends decorators.Container {
//   render() {
//     const { style, decorators, terminal, onClick, node } = this.props;
//     return (
//       <div
//         onClick={onClick}
//         ref={(ref) => (this.clickableRef = ref)}
//         // style={style.container[0]}
//       >
//         <decorators.Header node={node} style={style.header} />
//         <span style={{ float: "right" }}>
//           {!terminal ? this.renderToggle() : null}
//         </span>
//       </div>
//     );
//   }
// }

class TreeExample extends React.Component {
  constructor(props) {
    super(props);
    console.log("type of ", typeof props.tree);
    this.state = {
      data: Array.from(props.tree),
      tree: Array.from(props.tree),
      slug: undefined,
      selected: undefined,
    };
    this.slug = undefined;
    this.setBar = props.setBar;
    this.onToggle = this.onToggle.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onViewToBar = this.onViewToBar.bind(this);
    this.crateRootedTree = this.crateRootedTree.bind(this);
    this.checkSlug = this.checkSlug.bind(this);
    // this.viewToBar = props.viewToBar;
    props.setViewToBarChange(this.onViewToBar);
  }
  onToggle(node, toggled) {
    const { cursor } = this.state;
    if (cursor) {
      cursor.active = false;
      if (!includes(cursor.children, node)) {
        //cursor.toggled = false;
      }
    }

    node.active = true;
    if (node.children) {
      node.toggled = !node.toggled;
    }

    this.setState(() => ({ cursor: node }));

    this.setBar(node.slug);
    this.setState({ cursor: node });

    //this.onFilterMouseUp({slug:"Home-and-Cleaning"})
  }
  onSelect(node) {
    const { cursor, data } = this.state;

    if (cursor) {
      this.setState(() => ({ cursor, active: false }));
      if (!includes(cursor.children, node)) {
        cursor.toggled = false;
        cursor.selected = false;
      }
    }

    node.selected = true;

    this.setState(() => ({ cursor: node, data: Object.assign({}, data) }));
  }

  crateRootedTree(tree) {
    return {
      name: "react-treebeard",
      id: 1,
      toggled: true,
      children: Array.from(tree),
    };
  }
  checkSlug = (slug, parent) => {
    for (let i = 0; i < parent.length; i++) {
      if (parent[i].children && parent[i].slug !== slug) {
        const value = this.checkSlug(slug, parent[i].children);
        if (value) {
          return value;
        }
      } else {
        if (parent[i].slug === slug) {
          return parent[i];
        }
      }
    }
  };
  onViewToBar({ slug }) {
    console.log("ditpatched onViewBar", slug)
    this.setState({ slug: slug });
    const { cursor, data } = this.state;

    let node = this.checkSlug(slug, data);
    if (cursor) {
      cursor.active = false;
      if (!includes(cursor.children, node)) {
        //cursor.toggled = false;
      }
    }

    node.active = true;
    if (node.children) {
      node.toggled =  !node.toggled;
    }

    this.setBar(node.slug);
    this.setState({ cursor: node });
  }
  render() {
    const { data, slug, cursor } = this.state;
    decorators.Header = CustomHeader;
    //  decorators.Container = CutomContainer;

    theme.tree.base = {
      ...theme.tree.base,
      color: "white",
      backgroundColor: "#1D1D1D",
    };
    return (
      <React.Fragment>
        <div>
          <Treebeard
            data={data}
            decorators={decorators}
            onToggle={this.onToggle}
            onSelect={this.onSelect}
            animations={animations}
            style={{
              tree: {
                base: { backgroundColor: "transparent" },
                node: {
                  activeLink: { color: "white", background: "#00ff0022" },
                },
              },
            }}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default TreeExample;
