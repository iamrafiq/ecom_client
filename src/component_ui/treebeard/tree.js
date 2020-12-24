import React from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { Treebeard, animations, decorators, theme } from "./index";
import { includes } from "lodash";
import { API } from "../../config";
import { imageUrlConverter } from "../../util/ImageUrlConverter";
import { useEffect, useState } from "react";

import {
  selectResolutionSelection,
  selectLanguageSelection,
 
} from "../../redux/settingsSlice";
import {
  selectSideBar,
  setSideBar,
} from "../../redux/globalSlice";
const TreeExample = ({ tree }) => {
  const dispatch = useDispatch();
  const sideBar = useSelector(selectSideBar);

  const [data, setData] = useState(tree);
  const [cursor, setCursor] = useState(false);
  const resulationSelector = useSelector(selectResolutionSelection);
  const language = useSelector(selectLanguageSelection);
  const history = useHistory();
  const CustomHeader = ({ node, style, prefix }) => {
    console.log("node slug...", node.slug);
    return (
      <div
        className=""
        onClick={(e) => {
          history.push(`/products/${node.slug}`);
          dispatch(setSideBar({ sideBar: { open: !sideBar.open } }));
        }}
      >
        {/* <Link to={node.slug} > */}
        <div style={style.base}>
          <div style={{ ...style.title, display: "flex", margin: "auto" }}>
            <span>
              {node.iconMenu && (
                <img
                  style={{
                    width: "20px",
                    height: "20px",
                    marginRight: "5px",
                  }}
                  src={`${imageUrlConverter(
                   `${ node.iconMenu}&res=${resulationSelector}`
                  )}`}
                ></img>
              )}
            </span>
            {language === "en" ? (
              <span style={{ marginTop: "5px" }}>{`${node.name}`}</span>
            ) : (
              <span style={{ marginTop: "5px" }}>{`${node.bengaliName}`}</span>
            )}
          </div>
        </div>
        {/* </Link> */}
      </div>
    );
  };
  decorators.Header = CustomHeader;
  const onToggle = (node, toggled) => {
    if (cursor) {
      cursor.active = false;
    }
    node.active = true;
    if (node.children) {
      node.toggled = toggled;
    }
    setCursor(node);
    // setData(Object.assign({}, data));
  };

  theme.tree.base = {
    ...theme.tree.base,
    color: "white",
    backgroundColor: "#1D1D1D",
  };
  return (
    <Treebeard
      data={data}
      onToggle={onToggle}
      // decorators={decorators}
      // animations={animations}
      style={{
        tree: {
          base: { backgroundColor: "transparent" },
          // node: {
          //   activeLink: { color: "white", background: "#00ff0022" },
          // },
        },
      }}
    />
  );
};

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

// class TreeExample extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       data: props.tree,
//       selected: undefined,
//     };
//     this.slug = undefined;
//     this.setBar = props.setBar;
//     this.onToggle = this.onToggle.bind(this);
//     // this.onSelect = this.onSelect.bind(this);
//     // this.onViewToBar = this.onViewToBar.bind(this);
//     // this.checkSlug = this.checkSlug.bind(this);
//     this.CustomHeader = this.CustomHeader.bind(this);
//     this.resolutionSelector = props.resolutionSelector;
//     this.language = props.language;
//     // this.viewToBar = props.viewToBar;
//     //props.setViewToBarChange(this.onViewToBar);
//   }
//   CustomHeader = ({ node, style, prefix }) => {
//     const { settings } = this.state;
//     console.log("node slug...", node.slug);
//     return (
//       <div
//         className=""
//         onClick={(e) => {
//           this.history.push(`/${node.slug}`);
//         }}
//       >
//         {/* <Link to={node.slug} > */}
//         <div style={style.base}>
//           <div style={{ ...style.title, display: "flex", margin: "auto" }}>
//             <span>
//               {node.iconMenu && (
//                 <img
//                   style={{
//                     width: "20px",
//                     height: "20px",
//                     marginRight: "5px",
//                   }}
//                   src={`${imageUrlConverter(node.iconMenu)}&res=${
//                     this.resolutionSelector
//                   }`}
//                 ></img>
//               )}
//             </span>
//             {this.language === "en" ? (
//               <span style={{ marginTop: "5px" }}>{`${node.name}`}</span>
//             ) : (
//               <span style={{ marginTop: "5px" }}>{`${node.bengaliName}`}</span>
//             )}
//           </div>
//         </div>
//         {/* </Link> */}
//       </div>
//     );
//   };
//   onToggle(node, toggled) {
//     const { cursor } = this.state;
//     if (cursor) {
//       cursor.active = false;
//       if (!includes(cursor.children, node)) {
//       }
//     }

//     node.active = true;
//     if (node.children) {
//       node.toggled = !node.toggled;
//     }

//     this.setState(() => ({ cursor: node }));

//     // this.setBar(node.slug);
//     this.setState({ cursor: node });
//   }
//   // onSelect(node) {
//   //   const { cursor, data } = this.state;

//   //   if (cursor) {
//   //     this.setState(() => ({ cursor, active: false }));
//   //     if (!includes(cursor.children, node)) {
//   //       cursor.toggled = false;
//   //       cursor.selected = false;
//   //     }
//   //   }

//   //   node.selected = true;

//   //   this.setState(() => ({ cursor: node, data: Object.assign({}, data) }));
//   // }

//   // checkSlug = (slug, parent) => {
//   //   for (let i = 0; i < parent.length; i++) {
//   //     if (parent[i].children && parent[i].slug !== slug) {
//   //       const value = this.checkSlug(slug, parent[i].children);
//   //       if (value) {
//   //         return value;
//   //       }
//   //     } else {
//   //       if (parent[i].slug === slug) {
//   //         return parent[i];
//   //       }
//   //     }
//   //   }
//   // };
//   //onViewToBar({ slug }) {
//   // this.setState({ slug: slug });
//   // const { cursor, data } = this.state;

//   // let node = this.checkSlug(slug, data);
//   // if (cursor) {
//   //   cursor.active = false;
//   //   if (!includes(cursor.children, node)) {
//   //     cursor.toggled = false;
//   //   }
//   // }

//   // node.active = true;
//   // if (node.children) {
//   //   node.toggled = !node.toggled;
//   // }

//   // //this.setBar(node.slug);
//   // this.setState({ cursor: node });
//   //}
//   render() {
//     const { data, slug, cursor } = this.state;
//     decorators.Header = this.CustomHeader;
//     //  decorators.Container = CutomContainer;

//     theme.tree.base = {
//       ...theme.tree.base,
//       color: "white",
//       backgroundColor: "#1D1D1D",
//     };
//     return (
//       <React.Fragment>
//         <div>
//           <Treebeard
//             data={data}
//             decorators={decorators}
//             onToggle={this.onToggle}
//             onSelect={this.onSelect}
//             animations={animations}
//             style={{
//               tree: {
//                 base: { backgroundColor: "transparent" },
//                 // node: {
//                 //   activeLink: { color: "white", background: "#00ff0022" },
//                 // },
//               },
//             }}
//           />
//         </div>
//       </React.Fragment>
//     );
//   }
// }

export default TreeExample;
