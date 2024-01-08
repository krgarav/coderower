import { useRef } from "react";
import { Form, Button, Container } from "react-bootstrap";
import Header from "../Component/Header/Header";
import { useState } from "react";
import axios from "axios";
import classes from "./UpdateForm.module.css";
const UpdateForm = () => {
  const PORT = import.meta.env.VITE_REACT_PORT;
  const inputRef = useRef();
  const textRef = useRef();
  const [responseValue, setResponseValue] = useState("");
  const [inputValue, setInputValue] = useState("");
  const submitHandler = (event) => {
    event.preventDefault();

    const postData = async () => {
      try {
        const Id = inputRef.current.value;
        const textArea = textRef.current.value;
        const response = await axios.put(`${PORT}/api/configuration/${Id}`, {
          remark: textArea,
        });
        console.log(response);
        if (response.status === 200) {
          setResponseValue("success");
        }
        setInputValue(Id)
      } catch (err) {
        console.log(err);
        setResponseValue("Failed");
      }
      
      
    };
    postData();
  };
  const handleChange = () => {
    setResponseValue("");
  };
  return (
    <>
      <Header />
      <br />
      <Container className={classes.updateContainer}>
        <h1>Update Remark</h1>
        <br />
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Config to load (configId) : </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter configId"
              ref={inputRef}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="textarea">
            <Form.Label>Remark : </Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Leave a remark here"
              ref={textRef}
              onChange={handleChange}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <br />
        {responseValue && (
          <div className={classes.responseBox}>
            <h2>
              PUT : {PORT}/api/configurations/{inputValue}
            </h2>
            <p>{responseValue}</p>
          </div>
        )}
      </Container>
    </>
  );
};

export default UpdateForm;
