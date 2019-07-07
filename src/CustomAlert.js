import React from 'react';
import './App.css';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

class CustomAlert extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleDismiss = this.handleDismiss.bind(this);
    this.handleShow = this.handleShow.bind(this);

    this.state = {
      show: true
    };
  }

  handleDismiss() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  render() {
    if (this.state.show) {
      return (
      <Alert variant="danger" transition={false} onClose={this.handleDismiss} dismissible>
          <Alert.Heading>Hey, nice to see you</Alert.Heading>
          <p>
            Change this and that and try again. Duis mollis, est non commodo
            luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
            Cras mattis consectetur purus sit amet fermentum.
          </p>
          <p>
            <Button>Take this action</Button>
            <span> or </span>
            <Button onClick={this.handleDismiss}>Hide Alert</Button>
          </p>
        </Alert>
      );
    } 

    return <Button onClick={this.handleShow}>Show Alert</Button>;
  }
}

export default CustomAlert;
