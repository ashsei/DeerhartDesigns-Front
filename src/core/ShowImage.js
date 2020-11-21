import React from "react";
import { API } from "../config";

const ShowImage = ({ item, url }) => (
    <img
      src={`${API}/${url}/photo/${item._id}`}
      alt={item.name}
      className="card-img"
      style={{ maxHeight: "50vh" }}
    />
);

export default ShowImage;
