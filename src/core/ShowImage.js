import React from "react";
import { API } from "../config";

const ShowImage = ({ item, url }) => (
  <div className="product-img" style={{ bottomBorderRadius: "5px"}}>
    <img
      src={`${API}/${url}/photo/${item._id}`}
      alt={item.name}
      className="card-img-top"
      style={{ maxHeight: "", maxWidth: "100%", paddingBottom: '5px', borderRadiusBottom: '5px'}}
    />
  </div>
);

export default ShowImage;
