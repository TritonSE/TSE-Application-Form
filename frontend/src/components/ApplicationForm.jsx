import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { useState } from "react";
import { Col, Row} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const ApplicationForm = (props) => {
  // initialize state below this line
  const [formPersonalInfo, setPersonalInfo] = useState({});
  const [errors, setErrors] = useState({});
  const [valid, setValid] = useState(true);

  // create any event handler functions below this line

  const changePersonalInfo = (fieldName, value) => {
    setPersonalInfo({...formPersonalInfo, [fieldName]: value}); 
  }

  const handleErrors = () => {
    const name = formPersonalInfo.name;
    console.log(name)

    // name 
    if (/\d/.test(name) != false){
      setErrors({...errors, [name]: "Username cannot contain numbers"})
      setValid(...false);
    }
    console.log(errors)
    console.log(valid)
    // email

    // start quarter and graudation quarter

    // start year and graduation year

    // resume

  }

  const handleSubmit = (e) => {
    e.preventDefault();
    handleErrors();
    console.log(formPersonalInfo)
  }

  // all html related material below here
  return (
    <Form onSubmit={handleSubmit}>
      <p>this is the form</p>
      {/* Personal Information Section below this line*/}
      <Row>
        <Col>
          <Form.Group>
            <Form.Label>Name (First, Last)</Form.Label>
            <Form.Control 
              required 
              type ="text"
              onChange={(e) => {
                changePersonalInfo("name", e.target.value)
              }}
              isInvalid={valid}>
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              {errors.name}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control 
              required 
              type ="email"
              placeholder="name@example.com"
              onChange={(e) => {
                changePersonalInfo("email", e.target.value)
              }}>
            </Form.Control>
          </Form.Group>  
        </Col>
      </Row>
      
      <Row>
        <Col>
          <Form.Group>
            <Form.Label>Start Quarter</Form.Label>
            <Form.Control 
              required 
              type ="text"
              onChange={(e) => {
                changePersonalInfo("startQuarter", e.target.value)
                }}>
            </Form.Control>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>Start Year</Form.Label>
            <Form.Control 
              required 
              type ="text"
              onChange={(e) => {
                changePersonalInfo("startYear", e.target.value)
              }}>
            </Form.Control>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>Graduation Quarter</Form.Label>
            <Form.Control 
              required 
              type ="text"
              onChange={(e) => {
                changePersonalInfo("graduationQuarter", e.target.value)
              }}>
            </Form.Control>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>Graduation Year</Form.Label>
            <Form.Control 
              required 
              type ="text"
              onChange={(e) => {
                changePersonalInfo("graduationYear", e.target.value)
              }}>
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col xs={4}>
          <Form.Group>
          <Form.Label>Resume (please paste google drive link)</Form.Label>
          <Form.Control 
            required 
            type ="text"
            onChange={(e) => {
              changePersonalInfo("resume", e.target.value)
            }}>
          </Form.Control>
          </Form.Group>
        </Col>
      </Row>      
      
      <Button type="submit">Submit</Button>

      {/* Checkboxes Section below this line*/}

      {/* Free Response Section below this line*/}
    </Form>
  );
}

export default ApplicationForm;