import Form from "react-bootstrap/Form"
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ApplicationForm = (props) => {
  // initialize state below this line

  // keeps track of which checkboxes are clicked
  const [roles, setRoles] = useState(
    {
    TestDev: false,
    TestDes: false,
    Dev: false,
    Des: false,
    ProdMan: false
    }
  );
  

  // create any event handler functions below this line

  let handleCheckbox = (label) => {

    /* takes in which checkbox called this function and flips
     the boolean in roles*/
    switch(label) {
      case "TEST Developer":
        setRoles({...roles, TestDev: !roles.TestDev});
        break;
      case "TEST Designer":
        setRoles({...roles, TestDes: !roles.TestDes});
        break;
      case "Designer":
        setRoles({...roles, Des: !roles.Des});
        break;
      case "Developer":
        setRoles({...roles, Dev: !roles.Dev});
        break;
      case "Product Manager":
        setRoles({...roles, ProdMan: !roles.ProdMan});
        break;
      default:
        console.log("ERROR");
    }
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
              onClick={(e) => {handleCheckbox("Developer")}}
              name="Roles"
              label="Developer" 
              inline
              // if any TEST box is checked, disable this checkbox
              disabled={roles.TestDev || roles.TestDes}
              />
            </Col>
            <Col md lg="2">
              <Form.Check 
              onClick={(e) => {handleCheckbox("Product Manager")}}
              name="Roles" 
              label="Product Manager" 
              inline
              disabled={roles.TestDev || roles.TestDes}
              />
            </Col>
            <Col md lg="2">
              <Form.Check 
                onClick={(e) => {handleCheckbox("TEST Designer")}} 
                name="Roles" 
                label="TEST Designer" 
                inline
                // if any nonTEST box is checked, disable the checkbox
                disabled={roles.Des || roles.Dev || roles.ProdMan}
                />
            </Col>
          </Row>
      
          <Row >
            <Col md lg={{ span: 2, offset: 3 }}>
              <Form.Check 
              onClick={(e) => {handleCheckbox("Designer")}}
              name="Roles" 
              label="Designer"
              disabled={roles.TestDev || roles.TestDes}
              />
            </Col>
            <Col md lg={{ span: 2, offset: 0 }}>
              <Form.Check 
              onClick={(e) => {handleCheckbox("TEST Developer")}}
              name="Roles" 
              label="TEST Developer"
              disabled={roles.Des || roles.Dev || roles.ProdMan}
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