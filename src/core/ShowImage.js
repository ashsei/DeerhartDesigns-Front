import React from "react";
import { API } from "../config";

const ShowImage = ({ item, url }) => (
  <div className="product-img" style={{ opacity: "1"}}>
    <img
      src={`${API}/${url}/photo/${item._id}`}
      alt={item.name}
      className="card-img rounded-5"
      style={{ maxHeight: "", maxWidth: "100%", paddingBottom: '5px' }}
    />
  </div>
);

export default ShowImage;
