import React from "react";
import ReactDOM from "react-dom";
import { Treebeard, animations, decorators, theme } from "./index";
import { includes } from "lodash";

const data = [
  {
    id: "sdf33sd",
    name: "parent",
    children: [
      { id: "sd232fsd", name: "child1" },
      { id: "sdf55sd", name: "child2" },
    ],
  },
  {
    id: "sdf4343sd",
    name: "loading parent",
    loading: true,
    children: [],
  },
  {
    id: "sdf322sdasd4343sd",
    name: "parent",
    children: [
      {
        id: "sdf3eesd",
        name: "nested parent",
        children: [
          { id: "sdfff43sd", name: "nested child 1" },
          { id: "sd4344fsd", name: "nested child 2" },
        ],
      },
    ],
  },
];

const CustomHeader = ({ node, style, prefix }) => (
  <div style={style.base}>
    <div style={{ ...style.title, display: "flex" }}>
      {`<3 ${node.name.toUpperCase()}`}
    </div>
  </div>
);

class CutomContainer extends decorators.Container {
  render() {
    const { style, decorators, terminal, onClick, node } = this.props;
    return (
      <div
        onClick={onClick}
        ref={(ref) => (this.clickableRef = ref)}
        // style={style.container[0]}
      >
        <decorators.Header node={node} style={style.header} />
        <span style={{ float: "right" }}>
          {!terminal ? this.renderToggle() : null}
        </span>
      </div>
    );
  }
}

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
            data={data}
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
