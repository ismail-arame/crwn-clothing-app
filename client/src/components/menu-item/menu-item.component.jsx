import React from "react";
import { withRouter } from "react-router-dom";
import "./menu-item.styles.scss";

const MenuItem = ({ title, imageUrl, linkUrl, size, history, match }) => {
  // console.log(`${match.url}${linkUrl}`); // /hats
  //size: "large" is the className to be applied if size is true
  return (
    <div
      className={`${size ? size : ""} menu-item`}
      onClick={() => history.push(`${match.url}${linkUrl}`)}
    >
      <div
        className="background-image"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      />
      <div className="content">
        <span className="title">{title.toUpperCase()}</span>
        <span className="subtitle">SHOP NOW</span>
      </div>
    </div>
  );
};

export default withRouter(MenuItem);

// const MenuItem = (props) => {
//   return (
//     <div className="menu-item">
//       <div className="content">
//         <h1 className="title">props.title</h1>
//         <span className="subtitle">props.subtitle</span>
//       </div>
//     </div>
//   );
// };
