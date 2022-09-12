import { Button, Col, Container, Form, Row } from "react-bootstrap";
import React, { useState } from "react";

const ApplicationForm = (props) => {
  // initialize state below this line
  const [personalInfo, setPersonalInfo] = useState({});

  // keeps track of which checkboxes are clicked
  const [roles, setRoles] = useState({
    test_developer: false,
    test_designer: false,
    developer: false,
    designer: false,
    product_manager: false,
  });

  // create any event handler functions below this line

  const changePersonalInfo = (fieldName, value) => {
    setPersonalInfo({ ...personalInfo, [fieldName]: value });
  };

  const toggleCheckbox = (e) => {
    const bool = roles[e.target.id];
    setRoles({ ...roles, [e.target.id]: !bool });
  };

  // all html related material below here
  return (
    <Form>
      {/* Personal Information Section below this line*/}
      <Row>
        <Col xs={12} md={6}>
          <Form.Group>
            <Form.Label>Name (First, Last)</Form.Label>
            <Form.Control
              required
              type="text"
              onChange={(e) => {
                changePersonalInfo("name", e.target.value);
              }}
            ></Form.Control>
          </Form.Group>
        </Col>
        <Col xs={12} md={6}>
          <Form.Group>
            <Form.Label>UCSD Email Address</Form.Label>
            <Form.Control
              required
              type="email"
              placeholder="example@ucsd.edu"
              pattern=".+@ucsd\.edu"
              onChange={(e) => {
                changePersonalInfo("email", e.target.value);
              }}
            ></Form.Control>
          </Form.Group>
        </Col>
        <Col xs={6} md={3}>
          <Form.Group>
            <Form.Label>Start Quarter</Form.Label>
            <Form.Select
              required
              onChange={(e) => {
                changePersonalInfo("startQuarter", e.target.value);
              }}
            >
              <option>select...</option>
              <option value="0">Winter</option>
              <option value="1">Spring</option>
              <option value="2">Summer</option>
              <option value="3">Fall</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col xs={6} md={3}>
          <Form.Group>
            <Form.Label>Start Year</Form.Label>
            <Form.Control
              required
              type="number"
              min="2000"
              max="2099"
              onChange={(e) => {
                changePersonalInfo("startYear", e.target.value);
              }}
            ></Form.Control>
          </Form.Group>
        </Col>
        <Col xs={6} md={3}>
          <Form.Group>
            <Form.Label>Graduation Quarter</Form.Label>
            <Form.Select
              required
              onChange={(e) => {
                changePersonalInfo("gradQuarter", e.target.value);
              }}
            >
              <option>select...</option>
              <option value="0">Winter</option>
              <option value="1">Spring</option>
              <option value="2">Summer</option>
              <option value="3">Fall</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col xs={6} md={3}>
          <Form.Group>
            <Form.Label>Graduation Year</Form.Label>
            <Form.Control
              required
              type="number"
              min="2000"
              max="2099"
              onChange={(e) => {
                changePersonalInfo("gradYear", e.target.value);
              }}
            ></Form.Control>
          </Form.Group>
        </Col>
        <Col xs={12}>
          <Form.Group>
            <Form.Label>Resume (please paste google drive link)</Form.Label>
            <Form.Control
              required
              type="url"
              onChange={(e) => {
                changePersonalInfo("resumeLink", e.target.value);
              }}
            ></Form.Control>
          </Form.Group>
        </Col>
      </Row>

      {/* Checkboxes Section below this line*/}
      <Form.Group>
        <Container>
          <Row className="justify-content-md-center">
            <Form.Label class="text-center fw-bold fs-4">
              Which roles at TSE are you interested in applying to?
            </Form.Label>
          </Row>
          <br />
          <Row className="justify-content-md-center">
            <Col md lg="2">
              <Form.Check
                onClick={toggleCheckbox}
                name="Roles"
                label="Developer"
                id="developer"
                // if any TEST box is checked, disable the checkbox
                disabled={roles.test_developer || roles.test_designer}
              />
            </Col>
            <Col md lg="2">
              <Form.Check
                onClick={toggleCheckbox}
                name="Roles"
                label="Product Manager"
                id="product_manager"
                disabled={roles.test_developer || roles.test_designer}
              />
            </Col>
            <Col md lg="2">
              <Form.Check
                onClick={toggleCheckbox}
                name="Roles"
                label="TEST Designer"
                id="test_designer"
                // if any non-TEST box is checked, disable the checkbox
                disabled={
                  roles.designer || roles.developer || roles.product_manager
                }
              />
            </Col>
          </Row>
          <Row>
            <Col md lg={{ span: 2, offset: 3 }}>
              <Form.Check
                onClick={toggleCheckbox}
                name="Roles"
                label="Designer"
                id="designer"
                disabled={roles.test_developer || roles.test_designer}
              />
            </Col>
            <Col md lg={{ span: 2, offset: 0 }}>
              <Form.Check
                onClick={toggleCheckbox}
                name="Roles"
                label="TEST Developer"
                id="test_developer"
                disabled={
                  roles.designer || roles.developer || roles.product_manager
                }
              />
            </Col>
          </Row>
        </Container>
      </Form.Group>
      {/* Free Response Section below this line*/}
      <Row>
        <Form.Group>
          <Form.Label>Tell us about yourself</Form.Label>
          <Form.Control required as="textarea" rows={7}></Form.Control>
        </Form.Group>
      </Row>
      <Row>
        <Form.Group>
          <Form.Label>Why TSE?</Form.Label>
          <Form.Control required as="textarea" rows={7}></Form.Control>
        </Form.Group>
      </Row>
      <Row>
        <Form.Group>
          <Form.Label>Why are you interested in the developer role?</Form.Label>
          <Form.Control required as="textarea" rows={7}></Form.Control>
        </Form.Group>
      </Row>
      <Row>
        <Form.Group>
          <Form.Label>Why are you interested in the designer role?</Form.Label>
          <Form.Control required as="textarea" rows={7}></Form.Control>
        </Form.Group>
      </Row>
      <Row>
        <Form.Group>
          <Form.Label>
            Why are you interested in the TEST developer role?
          </Form.Label>
          <Form.Control required as="textarea" rows={7}></Form.Control>
        </Form.Group>
      </Row>
      <Row>
        <Form.Group>
          <Form.Label>
            Why are you interested in the TEST designer role?
          </Form.Label>
          <Form.Control required as="textarea" rows={7}></Form.Control>
        </Form.Group>
      </Row>
      <Row>
        <Form.Group>
          <Form.Label>
            Why are you interested in the product manager role?
          </Form.Label>
          <Form.Control required as="textarea" rows={7}></Form.Control>
        </Form.Group>
      </Row>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default ApplicationForm;
