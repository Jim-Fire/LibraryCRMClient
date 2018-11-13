import React from 'react';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';
import img from '../images/book.jpeg' 
import config from '../config'; 
import ModalComponent from './ModalComponent';

const CardComponent = (props) => {
  return (
      <Card className='card-container'>
        <CardImg src={img} alt="Card image cap" />
        <CardBody>
          <CardTitle>{props.name}</CardTitle>
          <CardSubtitle>Author: {props.author}</CardSubtitle>
          <CardSubtitle>Price: {props.price}</CardSubtitle>
          <CardSubtitle>Category: {props.category}</CardSubtitle>
          <CardSubtitle>Availability: {props.count}</CardSubtitle>
          <CardText>{props.description}</CardText>
          <div className='btn-group-custom'>
            {props.role===config.ROLE_USER?
              (<ModalComponent 
                    buttonLabel='Buy'
                    title='Should put this book into order?'
                    resolve={({count})=>{

                    }}
                    btnColor='success'
                    fields={['count']}
                />):
              (<>
                <ModalComponent 
                    buttonLabel='Delete book'
                    title='Should delete this book?'
                    resolve={()=>{
                      props.handleDeleteBook(props._id);
                    }}
                    btnColor='danger'
                />
                <ModalComponent 
                    buttonLabel='Update'
                    title='Update book'
                    resolve={({  name, author, countPagesNumber, countCategory, description, countPrice, count })=>{
                      const bookId = props._id;
                      props.handleUpdateBook({ bookId, name, author, countPagesNumber, countCategory, description, countPrice, count });
                    }}
                    btnColor='primary'
                    fields={['name','author','countPagesNumber','countCategory','description','countPrice','count']}
                />
              </>)
            }
          </div>
        </CardBody>
      </Card>
  );
};

export default CardComponent;