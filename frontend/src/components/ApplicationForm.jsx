import Form from "react-bootstrap/Form"
import { useState } from "react";
import { Col, Row} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

const ApplicationForm = (props) => {
  // initialize state below this line
  const [formPersonalInfo, setPersonalInfo] = useState({});

  // create any event handler functions below this line

  const changePersonalInfo = (fieldName, value) => {
    setPersonalInfo({...formPersonalInfo, [fieldName]: value}); 
  }

  // all html related material below here
  return (
    <Form>
      <p>this is the form</p>
      {/* Personal Information Section below this line*/}
      <Row>
        <Col>
          <Form.Group>
            <Form.Label>Name (First, Last)</Form.Label>
            <Form.Control required type ="text"
            onChange={(e) => {changePersonalInfo("name", e.target.value)}}>
            </Form.Control>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control required type ="email"
            placeholder="name@example.com"
            onChange={(e) => {changePersonalInfo("email", e.target.value)}}>
            </Form.Control>
          </Form.Group>  
        </Col>
      </Row>
      
      <Row>
        <Col>
          <Form.Group>
            <Form.Label>Start Quarter</Form.Label>
            <Form.Control required type ="text"
            onChange={(e) => {changePersonalInfo("start quarter", e.target.value)}}>
            </Form.Control>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>Start Year</Form.Label>
            <Form.Control required type ="text"
            onChange={(e) => {changePersonalInfo("start year", e.target.value)}}>
            </Form.Control>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>Graduation Quarter</Form.Label>
            <Form.Control required type ="text"
            onChange={(e) => {changePersonalInfo("graduation quarter", e.target.value)}}>
            </Form.Control>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>Graduation Year</Form.Label>
            <Form.Control required type ="text"
            onChange={(e) => {changePersonalInfo("graduation year", e.target.value)}}>
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col xs={4}>
          <Form.Group>
          <Form.Label>Resume (please paste google drive link)</Form.Label>
          <Form.Control required type ="text"
          onChange={(e) => {changePersonalInfo("resume", e.target.value)}}>
          </Form.Control>
          </Form.Group>
        </Col>
      </Row>      

      {/* Checkboxes Section below this line*/}

      {/* Free Response Section below this line*/}
    </Form>
  );
}

export default ApplicationForm;