import React from "react";
import { API } from "../config";

const ShowImage = ({ item, url }) => (
  <div className="product-img">
    <img
      src={`${API}/${url}/photo/${item._id}`}
      alt={item.name}
      className="card-img-top"
      style={{ maxHeight: "100%", maxWidth: "100%", paddingBottom: '5px'}}
    />
  </div>
);

export default ShowImage;
