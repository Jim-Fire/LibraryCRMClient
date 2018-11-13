import React, { Component } from 'react'
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Badge, FormGroup, Label, Input } from 'reactstrap';
import img from '../images/book.jpeg' 
import config from '../config'; 
import ModalComponent from './ModalComponent';


export class OrderComponent extends Component {
  render() {
    const orderedBooks = this.props.orderedBooks.map((book)=>
    <li key={book.bookDetails._id} className='ordered-books'>
        <div className='book-info-wrapper'>
            <span>Name: {book.bookDetails.name}</span>
            <span>Author: {book.bookDetails.Author}</span>
            <span>Count: {book.count}</span>
            <span>Price: {book.bookDetails.price}</span>
        </div>
    </li>
  );
  let status;
    switch(this.props.status){
        case config.ORDER_STATUS_INPROCESS: status = (<Badge disabled color='warning'>In progress</Badge>);break;
        case config.ORDER_STATUS_NEW:       status = (<Badge disabled color='primary'>New order</Badge>);break;
        case config.ORDER_STATUS_SUCCESS:   status = (<Badge disabled color='success'>Already complited</Badge>);break;
        case config.ORDER_STATUS_REJECTED:  status = (<Badge disabled color='danger' >Already rejected</Badge>);break;
        default: status = 'No status found'
    }
  return (
      <Card className='card-container'>
        <CardBody>
          <CardTitle>Order Number: {this.props.orderNumber}</CardTitle>
          <CardText><b>Summary:</b> {this.props.summary}</CardText>
          <CardText><b>Status:</b> {status}</CardText>
          <CardText><b>Description:</b> {this.props.description}</CardText>
          {this.props.statusDescription?(<CardText><b>Status Description:</b> {this.props.statusDescription}</CardText>):(<></>)}
          {orderedBooks.length?(<ul><b>Ordered Books:</b> {orderedBooks}</ul>):(<b>No books here! <br/></b>)}
          <div className='btn-group-custom'>
            <ModalComponent 
                buttonLabel='Delete'
                title='Delete order?'
                resolve={()=>{
                    this.props.deleteOrderById(this.props._id)
                }}
                btnColor='danger'
            />
            {this.props.role===config.ROLE_ADMIN?
              (<>
                <ModalComponent 
                    buttonLabel='Confirm'
                    title='Confirm order?'
                    resolve={({statusDescription})=>{
                        if(statusDescription){
                            this.props.resolveRejectOrder(this.props._id,true,statusDescription)
                        }else{
                            this.props.resolveRejectOrder(this.props._id,true)
                        }
                    }}
                    btnColor='success'
                    fields={['statusDescription']}
                />
                <ModalComponent 
                    buttonLabel='Reject'
                    title='Reject order?'
                    resolve={()=>{
                        this.props.resolveRejectOrder(this.props._id,false)
                    }}
                />
              </>):
              (<></>)
            }
          </div>
        </CardBody>
      </Card>
  );
  }
}

export default OrderComponent