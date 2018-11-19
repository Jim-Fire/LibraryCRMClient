import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input
} from "reactstrap";

class ModalComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      fields: {}
    };
    //field {
    //  name title type value
    //}
    this.toggle = this.toggle.bind(this);
  }
  componentDidMount() {
    if (this.props.fields && this.props.fields.length) {
      const fields = {};
      this.props.fields.forEach(field => {
        fields[field.name] = field;
      });
      this.setState({
        fields
      });
    }
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    const bodyEntry = [];
    if (Object.keys(this.state.fields).length) {
      for (let _field in this.state.fields) {
        const field = this.state.fields[_field];
        bodyEntry.push(
          <FormGroup key={field.name}>
            <Label>{field.title}</Label>
            <Input
              type={field.type}
              onChange={e => {
                //console.log('Field in handler',field);
                this.setState({
                  fields: {
                    ...this.state.fields,
                    [field.name]: {
                      ...this.state.fields[field.name],
                      value: e.target.value
                    }
                  }
                });
              }}
              value={this.state.fields[field.name].value}
            />
          </FormGroup>
        );
      }
    }
    return (
      <div>
        <Button color={this.props.btnColor} onClick={this.toggle}>
          {this.props.buttonLabel}
        </Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>{this.props.title}</ModalHeader>
          <ModalBody>{bodyEntry}</ModalBody>
          <ModalFooter>
            <Button
              color="success"
              onClick={() => {
                this.toggle();
                const fields = {};
                for (const key in this.state.fields) {
                  if (this.state.fields[key].value) {
                    fields[key] = this.state.fields[key].value;
                  }
                }
                this.props.resolve(fields);
              }}
            >
              Ok
            </Button>{" "}
            <Button color="danger" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ModalComponent;
