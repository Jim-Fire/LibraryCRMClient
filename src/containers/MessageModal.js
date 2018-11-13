import React, { Component } from 'react'
import { connect } from 'react-redux';
import Modal from '../components/Modal'

export class MessageModal extends Component {
  constructor(props){
      super(props);
      this.state = {
          messages:[], // arr of objs
          currentID:0  
      };
      this.deleteById = this.deleteById.bind(this);
  }
  deleteById(id){
    const messages = this.state.messages.filter((messageObj)=>{return messageObj.id!==id});
    this.setState({messages});
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.messageObj){
        console.log('Setting new message... ', nextProps.messageObj);
        this.setState({messages: [...this.state.messages, {
            message: nextProps.messageObj.text,
            type: nextProps.messageObj.type,
            titleResolve:nextProps.messageObj.titleResolve,
            titleReject:nextProps.messageObj.titleReject,
            rsolve:nextProps.messageObj.resolve,
            reject:nextProps.messageObj.reject,
            id:this.state.currentID
        }]})
        this.setState({currentID: this.state.currentID+1});
    }
  }  
  render() {
    const modals = this.state.messages.map((messageObj) =>(
        <Modal
            key={messageObj.id} 
            message={messageObj.message}
            type={messageObj.type}
            titleResolve={messageObj.titleResolve}
            titleReject={messageObj.titleReject}
            resolve={()=>{
                this.deleteById(messageObj.id);
            }}
            reject={()=>{
                this.deleteById(messageObj.id);
            }}
            forceUnmount={()=>{
                this.deleteById(messageObj.id);
            }}
        />
    ));  
    return (
        <div className='modal-wrapper'>
            {modals}
        </div>
    )
  }
}

const mapStateToProps = state => ({
    messageObj: state.message.message,
});

export default connect(mapStateToProps, { })(MessageModal)
