import React from "react";
import ReactDOM from "react-dom";
import { Treebeard, animations, decorators, theme } from "./index";
import { includes } from "lodash";
import { API } from "../../config";
const CustomHeader = ({ node, style, prefix }) => (
  <div style={style.base}>
    <div style={{ ...style.title, display: "flex" }}>
      <span>{node.icon?(<img style={{width:"30px", height:"30px", padding:"5px"}} src={`${API}/category/icon/${node._id}`}></img>):""}</span>{" "}
      {`${node.name.toUpperCase()}`}
    </div>
  </div>
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
    this.state = {};
    this.onToggle = this.onToggle.bind(this);
  }
  onToggle(node, toggled) {
    const { cursor } = this.state;
    if (cursor) {
      cursor.active = false;
      if (!includes(cursor.children, node)) {
        cursor.toggled = false;
      }
    }

    node.active = true;
    if (node.children) {
      node.toggled = toggled;
      console.log("children")

    }else{
      console.log("product")
    }

    this.setState({ cursor: node });
  }
  render() {
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
            data={this.props.tree}
            decorators={decorators}
            onToggle={this.onToggle}
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
        {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      </React.Fragment>
    );
  }
}

export default TreeExample;
