import React from "react";
import ReactDOM from "react-dom";
import { Treebeard, animations } from "./index";
import { includes } from "lodash";

const data = [
  {
    id:"sdf33sd",
    name: "parent",
    children: [{ id:"sd232fsd", name: "child1" }, { id:"sdf55sd", name: "child2" }]
  },
  {
    id:"sdf4343sd",
    name: "loading parent",
    loading: true,
    children: []
  },
  {
    id:"sdf322sdasd4343sd",
    name: "parent",
    children: [
      {
        id:"sdf3eesd",
        name: "nested parent",
        children: [{ id:"sdfff43sd", name: "nested child 1" }, {id:"sd4344fsd", name: "nested child 2" }]
      }
    ]
  }
];

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
                  activeLink: { color: "brown", background: "yellow" }
                }
              }
            }}
          />
        </div>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </React.Fragment>
    );
  }
}

export default TreeExample