import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from 'reactstrap';

class ModalComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
    this.toggle = this.toggle.bind(this);
    
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    console.log('ModalComponent props',this.state)
    return (
      <div>
        <Button color={this.props.btnColor} onClick={this.toggle}>{this.props.buttonLabel}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>{this.props.title}</ModalHeader>
          <ModalBody>
            {(this.props.fields && this.props.fields.length>0)?(
                this.props.fields.map((field)=>{   
                const _type = field.match(/count/g)?'number':'text'  
                return (<FormGroup key={field}>
                    <Label>{field}</Label>
                    <Input 
                        type={_type} 
                        onChange={(e)=>{
                            this.setState({[field]: e.target.value});
                        }}
                        value={this.state[field]}
                    />
                </FormGroup>)}
                )
            ):('')}
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={()=>{
                this.toggle();
                const args = {};
                if(this.props.fields){
                  this.props.fields.map((field)=>{
                    args[field] = this.state[field]
                  });
                }
                this.props.resolve({...args});
            }}>Ok</Button>{' '}
            <Button color="danger" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ModalComponent;