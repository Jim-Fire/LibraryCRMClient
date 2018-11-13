import React, {Component} from 'react'
import { Container, Row, Col } from 'reactstrap';
import NavBar from '../containers/NavBar';

class MainTemplate extends Component {
  render() {
    return (
        <React.Fragment>
        <NavBar 
            showBooksCatalog={this.props.showBooksCatalog}
            showOrders={this.props.showOrders}
        />
        <Container className='app-container main-container' >
            <Row className="justify-content-center align-items-center h-100 mt-2 pt-5">
                <Col xs={10}>
                    {this.props.children}
                </Col>
            </Row>
        </Container>
        </React.Fragment>
        
    )
  }
}

export default MainTemplate

