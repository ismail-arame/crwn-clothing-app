import React from "react";
import "./directory.styles.scss";
import MenuItem from "../menu-item/menu-item.component";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectDirectorySections } from "../../redux/directory/directory.selectors";

//we will use a class component because we need to store the state of those menu-items that we wanna pass and create our menu-items with

//we do not need a constructor because we moved our state to directoryReducer
// const { sections } = this.props;
const Directory = ({ sections }) => (
  <div className="directory-menu">
    {sections.map(({ id, ...otherSectionProps }) => {
      return <MenuItem key={id} {...otherSectionProps}></MenuItem>;
    })}
  </div>
);

const mapStateToProps = createStructuredSelector({
  sections: selectDirectorySections,
});

export default connect(mapStateToProps)(Directory);

//we used an ES6 trick (...spreading)

// render() {
//   return (
//     <div className="directory-menu">
//       {this.state.sections.map(({ id, title, imageUrl, linkUrl, size }) => {
//         return (
//           <MenuItem
//             key={id}
//             title={title}
//             imageUrl={imageUrl}
//             linkUrl={linkUrl}
//             size={size}
//           ></MenuItem>
//         );
//       })}
//     </div>
//   );
// }
