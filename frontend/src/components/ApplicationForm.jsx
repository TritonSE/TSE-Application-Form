import Form from "react-bootstrap/Form"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const ApplicationForm = (props) => {
  // initialize state below this line

  // keeps track of which checkboxes are clicked
  const [roles, setRoles] = useState({
    testDev: false,
    testDes: false,
    dev: false,
    des: false,
    prodMan: false});
  const toggleCheckbox = (e) => {
    const bool = roles[e.target.id]
    setRoles({...roles, [e.target.id]:!bool})
  }
  // all html related material below here
  return (
    <Form>
      <p>this is the form</p>
      {/* Personal Information Section below this line*/}

      {/* Checkboxes Section below this line*/}
      <Form.Group>
        <Container>
        <Row className="justify-content-md-center">
          <Form.Label class="text-center fw-bold fs-4">Which roles at TSE are you interested in applying to?</Form.Label>
        </Row>
        <br/>
          <Row className="justify-content-md-center">
            <Col md lg="2">
              <Form.Check 
              onClick={toggleCheckbox}
              name="Roles"
              label="Developer" 
              id = "dev"
              // if any TEST box is checked, disable this checkbox
              disabled = {roles.testDev || roles.testDes}
              />
            </Col>
            <Col md lg="2">
              <Form.Check 
              onClick={toggleCheckbox}
              name="Roles" 
              label="Product Manager" 
              id = "prodMan"
              disabled = {roles.testDev || roles.testDes}
              />
            </Col>
            <Col md lg="2">
              <Form.Check 
                onClick={toggleCheckbox} 
                name="Roles" 
                label="TEST Designer" 
                id = "testDes"
                // if any nonTEST box is checked, disable the checkbox
                disabled = {roles.des || roles.dev || roles.prodMan}
              />
            </Col>
          </Row>
          <Row>
            <Col md lg={{ span: 2, offset: 3 }}>
              <Form.Check 
              onClick={toggleCheckbox}
              name="Roles" 
              label="Designer"
              id = "des"
              disabled = {roles.testDev || roles.testDes}
              />
            </Col>
            <Col md lg={{ span: 2, offset: 0 }}>
              <Form.Check 
              onClick={toggleCheckbox}
              name="Roles" 
              label="TEST Developer"
              id = "testDev"
              disabled = {roles.des || roles.dev || roles.prodMan}
              />
            </Col>
          </Row>
        </Container>
      </Form.Group>
      {/* Free Response Section below this line*/}
    </Form>
  );
}

export default ApplicationForm;