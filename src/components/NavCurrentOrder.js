import React from "react";
import { Badge } from "reactstrap";

export default function NavCurrentOrder(props) {
  return (
    <div onClick={props.handleClick}>
      CurrentOrder
      <Badge color="primary" style={{ marginLeft: "5px" }}>
        {+props.booksNumber}
      </Badge>
    </div>
  );
}
