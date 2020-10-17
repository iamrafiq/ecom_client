import React from "react";
import ReactDOM from "react-dom";
import { Treebeard, animations } from "../treebeard1/index";
import { includes } from "lodash";

const data = [
  {
    id: "7449",
    name: "parent",
    children: [{ name: "child1" }, { name: "child2" }],
  },
  {
    id: "74449",
    name: "loading parent",
    loading: true,
    children: [],
  },
  {
    id: "7449",
    name: "parent",
    children: [
      {
        id: "63838",
        name: "nested parent",
        children: [{  id: "638sds38", name: "nested child 1" }, { id: "63dsfsh838", name: "nested child 2" }],
      },
    ],
  },
];

class TreeView extends React.Component {
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
    return (
      <React.Fragment>
        <div>
          <Treebeard
            data={data}
            onToggle={this.onToggle}
            animations={animations}
            style={{
              tree: {
                base: { backgroundColor: "white" },
                node: {
                  activeLink: { color: "brown", background: "yellow" },
                },
              },
            }}
          />
        </div>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </React.Fragment>
    );
  }
}
export default TreeView;
