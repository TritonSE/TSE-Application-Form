import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import React, { useState } from "react";

const SUBMIT_URL = "https://tse-fulcrum-hwx4s.ondigitalocean.app/api/application";

const ApplicationForm = (props) => {
  // initialize state below this line
  const [personalInfo, setPersonalInfo] = useState({});

  // keeps track of which checkboxes are clicked
  const [roles, setRoles] = useState({
    test_developer: false,
    test_designer: false,
    developer: false,
    designer: false,
  });

  const [prompts, setPrompts] = useState({});

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // create any event handler functions below this line

  const updatePersonalInfo = (fieldName, value) => {
    setPersonalInfo({ ...personalInfo, [fieldName]: value });
  };

  const updateCheckbox = (e) => {
    setRoles({ ...roles, [e.target.id]: e.target.checked });
  };

  const updatePrompt = (e) => {
    setPrompts({
      ...prompts,
      [e.target.id.replace("prompt_", "")]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const selectedRoles = Object.entries(roles).filter(([role, selected]) => selected).map(([role, selected]) => role);
    if (selectedRoles.length === 0) {
      setError("You must select at least one role to apply to.");
      return;
    }

    const startQuarter = parseInt(personalInfo.startQuarter) + 4 * parseInt(personalInfo.startYear);
    const gradQuarter = parseInt(personalInfo.gradQuarter) + 4 * parseInt(personalInfo.gradYear);

    const application = {
      name: personalInfo.name,
      pronouns: personalInfo.pronouns,
      email: personalInfo.email,
      phone: personalInfo.phone,
      startQuarter,
      gradQuarter,
      major: personalInfo.major,
      majorDept: personalInfo.majorDept,
      prevTest: personalInfo.prevTest,
      resumeUrl: personalInfo.resumeUrl,
      aboutPrompt: prompts.about,
      interestPrompt: prompts.interest,
      rolePrompts: Object.fromEntries(selectedRoles.map((role) => [role, prompts[role]])),
    }

    console.log(application);

    setSuccess("Submitting your application...");

    const errorPrefix = "Could not submit your application. Please contact tse@ucsd.edu for support."

    fetch(SUBMIT_URL, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(application)
    }).then((response) => {
      setError("");
      setSuccess("");
      if (response.ok) {
        setSuccess(
          "Thank you for applying to Triton Software Engineering! You will receive a confirmation email shortly. Please monitor your UCSD email for updates on your application status. We promise to get back to you!"
        );
      } else {
        const message = `${errorPrefix} HTTP ${response.status} (${response.statusText})`;
        setError(message);
        response.text().then((text) => setError(message + ": " + text)).catch(console.error);
      }
    }).catch((e) => {
      setSuccess("");
      setError(`${errorPrefix} Details: ${e}`);
    });

  };

  // all html related material below here
  return (
    <Form className="ApplicationForm" onSubmit={onSubmit}>
      <Row>
        <Col xs={12} md={6}>
          <Form.Group>
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              required
              type="text"
              onChange={(e) => {
                updatePersonalInfo("name", e.target.value);
              }}
            ></Form.Control>
            <Form.Text>Feel free to use your preferred name.</Form.Text>
          </Form.Group>
        </Col>
        <Col xs={12} md={6}>
          <Form.Group>
            <Form.Label>Pronouns (e.g. she/her)</Form.Label>
            <Form.Control
              required
              type="text"
              onChange={(e) => {
                updatePersonalInfo("pronouns", e.target.value);
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
                updatePersonalInfo("email", e.target.value);
              }}
            ></Form.Control>
          </Form.Group>
        </Col>
        <Col xs={12} md={6}>
          <Form.Group>
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              required
              type="tel"
              onChange={(e) => {
                updatePersonalInfo("phone", e.target.value);
              }}
            ></Form.Control>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col xs={6} md={3}>
          <Form.Group>
            <Form.Label>Start Quarter</Form.Label>
            <Form.Select
              required
              onChange={(e) => {
                updatePersonalInfo("startQuarter", e.target.value);
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
                updatePersonalInfo("startYear", e.target.value);
              }}
            ></Form.Control>
          </Form.Group>
        </Col>
        <Form.Text>
          Your first quarter as an undergraduate student at UC San Diego,
          excluding any previous post-secondary institutions.
        </Form.Text>
      </Row>
      <Row>
        <Col xs={6} md={3}>
          <Form.Group>
            <Form.Label>Graduation Quarter</Form.Label>
            <Form.Select
              required
              onChange={(e) => {
                updatePersonalInfo("gradQuarter", e.target.value);
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
                updatePersonalInfo("gradYear", e.target.value);
              }}
            ></Form.Control>
          </Form.Group>
        </Col>
        <Form.Text>
          If you are unsure about your graduation date, give us your best
          estimate.
        </Form.Text>
      </Row>
      <Row>
        <Col xs={12} md={6}>
          <Form.Group>
            <Form.Label>Major Department</Form.Label>
            <Form.Control
              required
              type="text"
              onChange={(e) => {
                updatePersonalInfo("majorDept", e.target.value);
              }}
            ></Form.Control>
            <Form.Text>e.g. Cognitive Science, Computer Science and Engineering, Mathematics</Form.Text>
          </Form.Group>
        </Col>
        <Col xs={12} md={6}>
          <Form.Group>
            <Form.Label>Major</Form.Label>
            <Form.Control
              required
              type="text"
              onChange={(e) => {
                updatePersonalInfo("major", e.target.value);
              }}
            ></Form.Control>
            <Form.Text>e.g. Cognitive Science with Specialization in Design and Interaction, Computer Engineering</Form.Text>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group>
            <Form.Label>
              Resume, as a Google Drive link to a PDF, shared so that anyone can
              view:
            </Form.Label>
            <Form.Control
              required
              type="url"
              onChange={(e) => {
                updatePersonalInfo("resumeUrl", e.target.value);
              }}
            ></Form.Control>
            {personalInfo.resumeUrl && (
              <Form.Text>
                Open{" "}
                <a
                  href={personalInfo.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  this link
                </a>{" "}
                in an incognito browser window to double check your sharing
                permissions.
              </Form.Text>
            )}
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group>
            <Form.Label>Were you previously a part of TSE's TEST program? If so, were you a TEST Designer or a TEST Developer?</Form.Label>
            <Form.Select
              required
              onChange={(e) => {
                updatePersonalInfo("prevTest", e.target.value);
              }}
            >
              <option>select...</option>
              <option value="none">I was not a part of the TEST program</option>
              <option value="test_designer">TEST Designer</option>
              <option value="test_developer">TEST Developer</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group>
            <Form.Label>Role(s) you are applying for:</Form.Label>
            <Form.Check
              onClick={updateCheckbox}
              name="Roles"
              label="Designer"
              id="designer"
              // if any TEST box is checked, disable the checkbox
              disabled={roles.test_developer || roles.test_designer}
            />
            <Form.Check
              onClick={updateCheckbox}
              name="Roles"
              label="Developer"
              id="developer"
              disabled={roles.test_developer || roles.test_designer}
            />
            <Form.Check
              onClick={updateCheckbox}
              name="Roles"
              label="TEST Designer"
              id="test_designer"
              // if any non-TEST box is checked, disable the checkbox
              disabled={
                roles.designer || roles.developer
              }
            />
            <Form.Check
              onClick={updateCheckbox}
              name="Roles"
              label="TEST Developer"
              id="test_developer"
              disabled={
                roles.designer || roles.developer
              }
            />
          </Form.Group>
        </Col>
        <Form.Text>
          <p>
            Each role you select will have a corresponding free-response question.
          </p>
          <p>
            The TSE Early Start Training (TEST) program provides students from <strong>underprivileged backgrounds</strong> who have little to no technical development/design experience with a first step into exploring software engineering and UI/UX design. TEST developers and designers will learn the fundamentals of their domain while working on beginner-level internal projects for TSE. TEST is a one year program that TSE provides. After the completion of the program, if TEST developers and designers want to join TSE, they would have to apply during the next recruitment cycle.
          </p>
          <p>
            You may either apply to TSE or the TEST program, not both. Please apply to the TEST program if you believe that it would be a good fit for you. Once you apply to the TEST program, we will not be able to consider you for TSE and vice versa. If you are unsure about which is right for you, please email adave@ucsd.edu.
          </p>
        </Form.Text>
      </Row>
      <Row>
        <Form.Group>
          <Form.Label>Tell us about yourself.</Form.Label>
          <Form.Control
            id="prompt_about"
            onChange={updatePrompt}
            required
            as="textarea"
            rows={7}
          ></Form.Control>
        </Form.Group>
      </Row>
      <Row>
        <Form.Group>
          <Form.Label>Why are you interested in being part of TSE?</Form.Label>
          <Form.Control
            id="prompt_interest"
            onChange={updatePrompt}
            required
            as="textarea"
            rows={7}
          ></Form.Control>
        </Form.Group>
      </Row>
      {roles.designer && (
        <Row>
          <Form.Group>
            <Form.Label>
              Why are you interested in the Designer role specifically?
            </Form.Label>
            <Form.Control id="prompt_designer" onChange={updatePrompt} required as="textarea" rows={7}></Form.Control>
          </Form.Group>
        </Row>
      )}
      {roles.developer && (
        <Row>
          <Form.Group>
            <Form.Label>
              Why are you interested in the Developer role specifically?
            </Form.Label>
            <Form.Control id="prompt_developer" onChange={updatePrompt} required as="textarea" rows={7}></Form.Control>
          </Form.Group>
        </Row>
      )}
      {roles.test_designer && (
        <Row>
          <Form.Group>
            <Form.Label>
              Why do you believe you are a good fit for the TEST program, and what do you hope to gain from the program? Additionally, why are you interested in the TEST Designer role specifically?
            </Form.Label>
            <Form.Control id="prompt_test_designer" onChange={updatePrompt} required as="textarea" rows={7}></Form.Control>
          </Form.Group>
        </Row>
      )}
      {roles.test_developer && (
        <Row>
          <Form.Group>
            <Form.Label>
              Why do you believe you are a good fit for the TEST program, and what do you hope to gain from the program? Additionally, why are you interested in the TEST Developer role specifically?
            </Form.Label>
            <Form.Control id="prompt_test_developer" onChange={updatePrompt} required as="textarea" rows={7}></Form.Control>
          </Form.Group>
        </Row>
      )}
      {error && (
        <Row>
          <Col>
            <Alert variant="danger">{error}</Alert>
          </Col>
        </Row>
      )}
      {success && (
        <Row>
          <Col>
            <Alert variant="success">{success}</Alert>
          </Col>
        </Row>
      )}
      <Button variant="primary" type="submit" className="mt-3">
        Submit
      </Button>
    </Form>
  );
};

export default ApplicationForm;
