import React from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle
} from "reactstrap";
import img from "../images/book.jpeg";
import config from "../config";
import ModalComponent from "./ModalComponent";

const CardComponent = props => {
  return (
    <Card className="card-container">
      <CardImg src={img} alt="Card image cap" />
      <CardBody>
        <CardTitle>{props.name}</CardTitle>
        <CardSubtitle>Author: {props.author}</CardSubtitle>
        <CardSubtitle>Price: {props.price}</CardSubtitle>
        <CardSubtitle>Category: {props.category}</CardSubtitle>
        <CardSubtitle>Availability: {props.count}</CardSubtitle>
        <CardText>{props.description}</CardText>
        <div className="btn-group-custom">
          {props.role === config.ROLE_USER ? (
            <ModalComponent
              buttonLabel="Buy"
              title="Should put this book into order?"
              resolve={fields => {
                let { count } = fields;
                count = parseInt(count);
                if (count <= props.count) {
                  props.addBook({ count, bookId: props._id });
                } else {
                  props.showWarning(
                    `Books count must be less than ${props.count + 1}`
                  );
                }
              }}
              btnColor="success"
              fields={[
                { title: "Count", name: "count", type: "number", value: 1 }
              ]}
            />
          ) : (
            <>
              <ModalComponent
                buttonLabel="Delete book"
                title="Should delete this book?"
                resolve={() => {
                  props.handleDeleteBook(props._id);
                }}
                btnColor="danger"
              />
              <ModalComponent
                buttonLabel="Update"
                title="Update book"
                resolve={fields => {
                  const {
                    name,
                    author,
                    countPagesNumber,
                    countCategory,
                    description,
                    countPrice,
                    count
                  } = fields;
                  const bookId = props._id;
                  props.handleUpdateBook({
                    bookId,
                    name,
                    author,
                    countPagesNumber,
                    countCategory,
                    description,
                    countPrice,
                    count
                  });
                }}
                btnColor="primary"
                fields={[
                  {
                    title: "Name",
                    name: "name",
                    type: "text",
                    value: props.name
                  },
                  {
                    title: "Author",
                    name: "author",
                    type: "text",
                    value: props.author
                  },
                  {
                    title: "Pages",
                    name: "countPagesNumber",
                    type: "number",
                    value: props.pagesNumber
                  },
                  {
                    title: "Category",
                    name: "countCategory",
                    type: "number",
                    value: props.category
                  },
                  {
                    title: "Description",
                    name: "description",
                    type: "text",
                    value: props.description
                  },
                  {
                    title: "Price",
                    name: "countPrice",
                    type: "number",
                    value: props.price
                  },
                  {
                    title: "Count",
                    name: "count",
                    type: "number",
                    value: props.count
                  }
                ]}
              />
            </>
          )}
        </div>
      </CardBody>
    </Card>
  );
};

export default CardComponent;
